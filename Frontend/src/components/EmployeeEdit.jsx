import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import axios from 'axios';

function EmployeeEdit() {
  const { id } = useParams(); 

  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    image: '',
  });

  const [message, setMessage] = useState('');
  

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`https://crud-mern-2-gsct.onrender.com/employees/${id}`);
        setEmployeeData(response.data); 
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setMessage('Failed to fetch employee data.');
      }
    };
    fetchEmployeeData();
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(employeeData).forEach((key) => {
      formData.append(key, employeeData[key]);
    });

    
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`https://crud-mern-2-gsct.onrender.com/employees/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,
        },
      });
      setMessage('Employee updated successfully!');
    } catch (error) {
      console.error('Error updating employee:', error);
      setMessage('Failed to update employee.');
    }
  };

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Navigation/>
      <div className="employee-create-container">
      <h2 style={{fontStyle:'italic'}}>Edit Employee</h2>
      {message && <p>{message}</p>}
      <form className='addEmployeeForm' onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group">
          <input
            type="text"
            name="name"
            className='inpTxt'
            value={employeeData.name}
            onChange={handleInputChange}
            required
            placeholder='Name'
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            className='inpTxt'
            value={employeeData.email}
            onChange={handleInputChange}
            required
            placeholder='Email'
          />
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <input
            type="text"
            name="mobile"
            className='inpTxt'
            value={employeeData.mobile}
            onChange={handleInputChange}
            required
            placeholder='Mobile'
          />
        </div>
        <div className="form-group-desig">
          <select
            name="designation"
            value={employeeData.designation}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="sales">Sales</option>
            <option value="manager">Manager</option>
          </select>
        </div>
      </div>

      <div className="row-radio">
        <div className="form-group-gender">
          <label>Gender:</label>
          <div className='radio-gender'>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={employeeData.gender === "Male"}
                onChange={handleInputChange}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={employeeData.gender === "Female"}
                onChange={handleInputChange}
                required
              />
              Female
            </label>
          </div>
        </div>
        <div className="form-group-course">
          <label>Course:</label>
          <div className='radio-course'>
            <label>
              <input
                type="radio"
                name="course"
                value="MCA"
                checked={employeeData.course === "MCA"}
                onChange={handleInputChange}
              />
              MCA
            </label>
            <label>
              <input
                type="radio"
                name="course"
                value="BCA"
                checked={employeeData.course === "BCA"}
                onChange={handleInputChange}
              />
              BCA
            </label>
            <label>
              <input
                type="radio"
                name="course"
                value="BSC"
                checked={employeeData.course === "BSC"}
                onChange={handleInputChange}
              />
              BSC
            </label>
          </div>
        </div>
      </div>

      <div className="rowProf">
        <div className="form-group">
          <label>Profile Image:</label>
          <input
            className='profileInput'
            type="file"
            name="image"
            onChange={(e) => setEmployeeData((prevData) => ({
              ...prevData,
              image: e.target.files[0],
            }))}
          />
        </div>
        <span className='note'>Note:- Only PNG or JPEG Supported</span>
      </div>

      <button type="submit" className='addBtn'>Update Employee</button>
    </form>
    </div>
    </>
  );
}

export default EmployeeEdit;
