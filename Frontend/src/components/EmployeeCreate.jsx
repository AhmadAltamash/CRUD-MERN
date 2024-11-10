import React, { useState } from 'react';
import axios from 'axios';
import Navigation from './Navigation';

function EmployeeCreate() {

  const token = localStorage.getItem('token');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setEmployeeData({
      ...employeeData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    Object.keys(employeeData).forEach((key) => {
      formData.append(key, employeeData[key]);
    });
  
    try {
      const response = await axios.post('http://localhost:8000/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,
        },
      });
      setMessage('Employee added successfully!');
      setEmployeeData({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: '',
        image: '',
      });
    } catch (error) {
      console.error('Error adding employee:', error);
      setMessage('Failed to add employee.');
    }
  };
  

  return (
    <>
      <Navigation/>
      <div className="employee-create-container">
        <h2 style={{fontStyle:'italic'}}>Add New Employee</h2>
        {message && <p>{message}</p>}
        <form className='addEmployeeForm' onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group">
            <input
              type="text"
              name="name" 
              className='inpTxt'
              value={employeeData.name}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              required
              placeholder='Mobile'
            />
            </div>
            <div className="form-group-desig">
            <select
              name="designation"
              value={employeeData.designation}
              onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                    onChange={handleChange}
                  />
                  MCA
                </label>
                <label>
                  <input
                    type="radio"
                    name="course"
                    value="BCA"
                    checked={employeeData.course === "BCA"}
                    onChange={handleChange}
                  />
                  BCA
                </label>
                <label>
                  <input
                    type="radio"
                    name="course"
                    value="BSC"
                    checked={employeeData.course === "BSC"}
                    onChange={handleChange}
                  />
                  BSC
                </label>
              </div>
            </div>
          </div>
          
          <div className="rowProf">
            <div className="form-group">
              <label>Profile Image:</label>
              <input className='profileInput'
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </div>
            <span className='note'>Note:- Only PNG or JPEG Supported</span>
          </div>
          <button type="submit" className='addBtn'>Add Employee</button>
        </form>
      </div>
    </>
    
  );
}

export default EmployeeCreate;
