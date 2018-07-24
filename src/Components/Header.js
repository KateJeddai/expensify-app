import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <header>
      <h1>Expensify</h1>
      <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
      <p></p>
      <NavLink to="/create" activeClassName="is-active">Create Page</NavLink>
      <p></p>
      <NavLink to="/edit" activeClassName="is-active">Edit Page</NavLink>
    </header>
);


export default Header;