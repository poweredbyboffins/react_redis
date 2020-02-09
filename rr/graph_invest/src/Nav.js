import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Nav() {
    return (
    <nav>
        <h3>Logo</h3>
        <ul className="nav-links">
            <Link to="/Graph">
            <li>Graph</li>
            </Link>
            <Link to="/piechart">
            <li>Simulation</li>
            </Link>
            <Link to="/Details">
            <li>Maintain Model</li>
            </Link>
        </ul>
    </nav>
    )
}

export default Nav;