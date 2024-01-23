import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink, NavDropdown } from 'react-bootstrap';

const NavBar = () => {
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>
      <div className='container-fluid'>
        <Link to={"/"}>
          <span className='hotel-color'>Wander Waltz</span>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle="collapse"
          data-target="#navbarScroll"
          aria-controls='navbarScroll'
          aria-expanded="false"
          aria-label='Toggle Navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarScroll'>
          <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
            <li className='nav-item'>
              <NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
                Browse All Rooms
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                Admin
              </NavLink>
            </li>
          </ul>
          <ul className='d-flex navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to={"/find-booking"}>
                Find My Booking
              </NavLink>
            </li>

            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
