import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../Actions/auth';

export const Header = ({ startLogout }) => (
    <header>
      <h1>Expensify</h1>
      <NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink>
      <p></p>
      <NavLink to="/create" activeClassName="is-active">Create Page</NavLink>
      <p></p>
      <NavLink to="/edit" activeClassName="is-active">Edit Page</NavLink>
      <button onClick={startLogout}>Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);