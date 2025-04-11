import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function Vitals() {
  const [vitals, setVitals] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3001')
      .then((result) => setVitals(result.data))
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
  console.log('vitals', vitals);

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
            {vitals.map((vital) => {
              return (
                <tr key={vital._id}>
                  <td>{vital.date}</td>
                  <td>{vital.bloodPressure}</td>
                  <td>{vital.heartRate}</td>
                  <td>
                    <Link to={`/update/${vital._id}`} class='btn btn-success'>
                      Update
                    </Link>
                    <button
                      class='btn btn-danger'
                      onClick={(e) => handleDelete(vital._id)}
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

export default Vitals;
