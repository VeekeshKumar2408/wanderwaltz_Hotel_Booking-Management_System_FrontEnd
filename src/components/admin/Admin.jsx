import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <section className='container mt-5'>
      <h2>Welcome To Admin Panel</h2>
      <hr />
      <div className="admin-buttons">
        <Link to={"/existing-rooms"} className="admin-button">
          Manage Rooms
        </Link>
        <Link to={"/existing-bookings"} className="admin-button">
          Manage Bookings
        </Link>
      </div>
    </section>
  );
};

export default Admin;
