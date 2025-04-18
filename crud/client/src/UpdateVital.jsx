import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatDate } from './utils/dateUtils';

function UpdateVital() {
  const { id } = useParams();
  const [date, setDate] = useState('');
  const [bloodPressure, setbloodPressure] = useState('');
  const [heartRate, setheartRate] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get('http://localhost:3001/vitals/vital/' + id)
      .then((result) => {
        console.log('result', result);
        setDate(result.data.date || formatDate(new Date()));
        setbloodPressure(result.data.bloodPressure || '');
        setheartRate(result.data.heartRate || '');
      })
      .catch((err) => console.log(err));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put('http://localhost:3001/updateVital/' + id, {
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
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Update}>
          <h2>Update Vitals</h2>
          <div className='mb-2'>
            <label htmlFor=''>Date</label>
            <input
              type='text'
              placeholder='Enter Date'
              className='form-control'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Blood Pressure</label>
            <input
              type='text'
              placeholder='Enter Blood Pressure'
              className='form-control'
              value={bloodPressure}
              onChange={(e) => setbloodPressure(e.target.value)}
            ></input>
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Heart Rate</label>
            <input
              type='text'
              placeholder='Enter Heart Rate'
              className='form-control'
              value={heartRate}
              onChange={(e) => setheartRate(e.target.value)}
            ></input>
          </div>
          <button className='btn btn-success'>Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateVital;
