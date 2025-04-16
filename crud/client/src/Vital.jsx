import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Vital() {
  const [vital, setVital] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      navigate('/login');
      return;
    }

    axios
      .get(`http://localhost:3001/vitals/${userId}`)
      .then((res) => {
        setVital(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [navigate]);

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-75 bg-white rounded p-3'>
        <h2>Your Vitals</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Blood Pressure</th>
              <th>Heart Rate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vital.map((v, index) => (
              <tr key={index}>
                <td>{v.date}</td>
                <td>{v.bloodPressure}</td>
                <td>{v.heartRate}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vital;
