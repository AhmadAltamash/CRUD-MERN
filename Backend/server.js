const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const Connection = require('./Database/Connection');
const Employee = require('./Database/EmployeeSchema');
const Admin = require('./Database/AdminSchema');
const authenticateToken = require('./Middleware/auth');
const app = express();
const cors = require('cors');
const port = 8000;

Connection();

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'du7xgosqr',
    api_key: '842527912246562',
    api_secret: 'jpb6y6XqlTE0t6ZEC5cF4eublHM',
});

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
}));

app.use(express.json());

// JWT Secret Key
const JWT_SECRET = 'yourSecretKey';

// Set up multer for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Login route to authenticate admin and issue token
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const adminLogin = await Admin.findOne({ username });

        if (!adminLogin) return res.status(400).json({ msg: 'Username not found' });
        if (adminLogin.password !== password) return res.status(400).json({ msg: 'Invalid password' });

        // Generate JWT token
        const token = jwt.sign({ id: adminLogin._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ msg: 'Login successful', token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ msg: 'Login failed', error: error.message });
    }
});

// Logout route
app.post('/logout', (req, res) => {
    res.status(200).json({ msg: 'Logout successful. Please clear your token.' });
});

// Protected route to add employee with image upload
app.post('/employees', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, course } = req.body;

        // Upload image to Cloudinary
        let imageUrl = '';
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'employees' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(req.file.buffer);
            });
            imageUrl = result.secure_url;
        }

        const newEmployee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            image: imageUrl
        });

        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error adding employee' });
    }
});

// Fetch employees with search filters
app.get('/employees', authenticateToken, async (req, res) => {
    const { searchTerm } = req.query;
    try {
        let filter = {};
        if (searchTerm) {
            filter = {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { email: { $regex: searchTerm, $options: 'i' } },
                    { mobile: { $regex: searchTerm, $options: 'i' } }
                ]
            };
        }
        const employees = await Employee.find(filter);
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).send('Server error');
    }
});

// Edit employee details
app.put('/employees/:id', authenticateToken, upload.single('image'), async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;
    const { id } = req.params;

    try {
        let updateData = { name, email, mobile, designation, gender, course };

        // If a new image is uploaded, upload it to Cloudinary and update the image URL
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'employees' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(req.file.buffer);
            });
            updateData.image = result.secure_url;
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }

        res.json(updatedEmployee); // Return updated employee details
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ msg: 'Error updating employee', error });
    }
});
app.get('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id); // MongoDB query
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});



// Delete employee
app.delete('/employees/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }

        res.json({ msg: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ msg: 'Error deleting employee', error });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
