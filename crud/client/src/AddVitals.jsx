import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { formatDate } from './utils/dateUtils';

// In the CreateUser component, Axios is used to send a POST request to
//  a local server running at http://localhost:3001/createUser.
function AddVitals() {
  const [date, setDate] = useState(formatDate(new Date()));
  const [bloodPressure, setbloodPressure] = useState('');
  const [heartRate, setheartRate] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  console.log('userId', userId);
  const Submit = (e) => {
    e.preventDefault();
    console.log('blood pressure', bloodPressure);

    axios
      .post('http://localhost:3001/AddVitals', {
        date,
        bloodPressure,
        heartRate,
        userId: localStorage.getItem('userId'),
      })
      .then((result) => {
        console.log(result);
        navigate('/vitals');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{ backgroundColor: '#f8f8f8' }}
      className='d-flex vh-100 justify-content-center align-items-center'
    >
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Submit}>
          <h2>Add Vitals</h2>

          <div className='mb-2'>
            <label htmlFor='date'>Date</label>
            <input
              id='date'
              type='text'
              placeholder='Enter Date'
              className='form-control'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className='mb-2'>
            <label htmlFor='bloodPressure'>Blood Pressure</label>
            <input
              id='bloodPressure'
              type='text'
              placeholder='Enter Blood Pressure'
              className='form-control'
              value={bloodPressure}
              onChange={(e) => setbloodPressure(e.target.value)}
            />
          </div>

          <div className='mb-2'>
            <label htmlFor='heartRate'>Heart Rate</label>
            <input
              id='heartRate'
              type='text'
              placeholder='Enter Heart Rate'
              className='form-control'
              value={heartRate}
              onChange={(e) => setheartRate(e.target.value)}
            />
          </div>

          <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddVitals;
