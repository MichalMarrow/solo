import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3001')
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    console.log('hitting handleDelete');
    axios
      .delete('http://localhost:3001/deleteUser/' + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((errr) => console.log(errr));
  };
  console.log('users', users);

  return (
    <div class='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div class='w-50 bg-white rounded p-3'>
        <Link to='/create' class='btn btn-success'>
          Add +
        </Link>
        <table class='table'>
          <thead>
            <tr>
              <th>date</th>
              <th>Blood Pressure</th>
              <th>Heart Rate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.date}</td>
                  <td>{user.bloodPressure}</td>
                  <td>{user.heartRate}</td>
                  <td>
                    <Link to={`/update/${user._id}`} class='btn btn-success'>
                      Update
                    </Link>
                    <button
                      class='btn btn-danger'
                      onClick={(e) => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
