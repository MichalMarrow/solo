import React, { useState } from 'react';

function Vitals() {
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
            {Vitals.map((vital) => {
              <tr>
                <td>{vital.date}</td>
                <td>{vital.bloodPressure}</td>
                <td>{vital.heartRate}</td>
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

export default Vitals;
