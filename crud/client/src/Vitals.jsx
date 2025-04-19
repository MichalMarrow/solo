import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from './utils/dateUtils';

function Vitals() {
  const [vitals, setVitals] = useState([]);
  const userId = localStorage.getItem('userId'); // Get userId from localStorage

  useEffect(() => {
    // Check if userId exists before making the API call
    if (userId) {
      axios
        .get(`http://localhost:3001/vitals/${userId}`) // Use the user-specific endpoint
        .then((result) => setVitals(result.data))
        .catch((err) => console.log(err));
    } else {
      // Handle the case where userId is not available (e.g., user not logged in)
      console.warn('User ID not found. Unable to fetch vitals.');
      // Optionally, redirect the user to the login page:
      // navigate('/login');
    }
  }, [userId]); // Re-run the effect if userId changes (e.g., after login)

  const checkBP = (bp) => {
    //first grab sytolic  and dyastolic
    let bpArray = bp.split('/');
    let systolic = Number(bpArray[0]);
    let diastolic = Number(bpArray[1]);

    if (
      systolic >= 180 ||
      systolic <= 70 ||
      diastolic >= 100 ||
      diastolic <= 50
    ) {
      return 'red';
    }
    if (systolic >= 150 || systolic < 80 || diastolic >= 90 || diastolic < 60) {
      return 'yellow';
    } else {
      return 'green';
    }
  };

  const checkHR = (hr) => {
    //heart rate check
    if (hr < 40 || hr > 130) {
      return 'red';
    }
    if (hr < 60 || hr > 100) {
      return 'yellow';
    } else {
      return 'green';
    }
  };
  const handleDelete = (id) => {
    console.log('hitting handleDelete');
    axios
      .delete('http://localhost:3001/deleteVital/' + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((errr) => console.log(errr));
  };

  return (
    <div
      style={{ backgroundColor: '#f8f8f8' }}
      className='d-flex vh-100  justify-content-center align-items-center'
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, yellow, green, red)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Your Vitals
        </h1>{' '}
        <div className='w-50 bg-white rounded p-3'>
          <Link to='/create' className='btn btn-success'>
            Add +
          </Link>
          <table className='table'>
            <thead>
              <tr>
                <th style={{ width: '600px' }}>date</th>
                <th style={{ width: '600px' }}>Blood Pressure</th>
                <th style={{ width: '600px' }}>Heart Rate</th>
                <th style={{ width: '600px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {vitals.map((vital) => {
                return (
                  <tr key={vital._id}>
                    <td>{formatDate(vital.date)}</td>
                    <td
                      style={{ backgroundColor: checkBP(vital.bloodPressure) }}
                    >
                      {vital.bloodPressure}
                    </td>
                    <td style={{ backgroundColor: checkHR(vital.heartRate) }}>
                      {vital.heartRate}
                    </td>
                    <td>
                      <Link
                        to={`/update/${vital._id}`}
                        className='btn btn-success'
                      >
                        Update
                      </Link>
                      <button
                        className='btn btn-danger'
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
    </div>
  );
}

export default Vitals;
