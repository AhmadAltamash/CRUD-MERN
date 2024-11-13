import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!token) {
        console.error('Token is missing');
        return;
      }
      try {
        console.log('Sending search term:', searchTerm);
        const response = await axios.get(`https://crud-mern-2-gsct.onrender.com/employees?searchTerm=${searchTerm}`, {
          headers: { Authorization: `${token}` },
        });
        console.log('Received employees:', response.data);
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [token, searchTerm]); 

  // Handle delete employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`https://crud-mern-2-gsct.onrender.com/employees/${id}`, {
        headers: { Authorization: `${token}` },
      });
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
      setFilteredEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id)
      );
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Handle toggle active/deactive status
  const toggleStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = { status: !currentStatus };
      await axios.put(`https://crud-mern-2-gsct.onrender.com/${id}`, updatedStatus, {
        headers: { Authorization: `${token}` },
      });
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === id ? { ...employee, status: !currentStatus } : employee
        )
      );
      setFilteredEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === id ? { ...employee, status: !currentStatus } : employee
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <>
      <Navigation />
      <div className='table-container'>
        <div className='table-content'>
          <div className='table-heading'>
            <h2>Employee List</h2>
            <input
              className='searchFilter'
              type='text'
              placeholder='search by name/email/mobile'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Created Date</th>
                <th>Edit Or Delete</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td>
                    {employee.image ? (
                      <img src={employee.image} alt={employee.name} width="60" height="60" />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobile}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.course}</td>
                  <td>{new Date(employee.createdDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
                  <td>
                    <Link className='edit' to={`/editemployee/${employee._id}`}>Edit</Link>  /  
                    <button className='del' onClick={() => deleteEmployee(employee._id)}> Delete</button> / 
                    {employee.status ? (
                      <button onClick={() => toggleStatus(employee._id, employee.status)} className='deac'> De-active</button>
                    ) : (
                      <button onClick={() => toggleStatus(employee._id, employee.status)} className='ac'> Active</button>
                    )}
                  </td>
                  <td>{employee.status ? (<p>Active</p>) : (<p>De-active</p>)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default EmployeeList;
