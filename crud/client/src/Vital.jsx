import React, { useState } from 'react';

function Vital() {
  const [vital, setVital] = useState([
    {
      date: '04/08/2025',
      bloodPressure: '120/80',
      heartRate: 60,
    },
  ]);
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>date</th>
              <th>bloodPressure</th>
              <th>heartRate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vital.map((v) => {
              <tr>
                <td>{v.date}</td>
                <td>{v.bloodPressure}</td>
                <td>{v.heartRate}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vital;
