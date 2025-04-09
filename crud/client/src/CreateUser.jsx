import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { formatDate } from './utils/dateUtils';
function CreateUser() {
  const [date, setDate] = useState(formatDate(new Date()));
  const [bloodPressure, setbloodPressure] = useState();
  const [heartRate, setheartRate] = useState();
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    console.log('blood pressure', bloodPressure);
    axios
      .post('http://localhost:3001/createUser', {
        date,
        bloodPressure,
        heartRate,
      })
      .then((result) => {
        console.log(result);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Submit}>
          <h2>Add Vitals</h2>
          <div className='mb-2'>
            <label htmlFor=''>Date</label>
            <input
              type='text'
              placeholder='Enter Date'
              className='form-control'
              value={date} // Set the input's value to the 'date' state
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Blood Pressure</label>
            <input
              type='text'
              placeholder='Enter Blood Pressure'
              className='form-control'
              onChange={(e) => setbloodPressure(e.target.value)}
            ></input>
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Heart Rate</label>
            <input
              type='text'
              placeholder='Enter Heart Rate'
              className='form-control'
              onChange={(e) => setheartRate(e.target.value)}
            ></input>
          </div>
          <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
