import React from 'react';
import {Link} from "react-router-dom";

class Navbar extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="navbar">
            <Link className="nav-item no-link-style" to="/">
                <h2 className="nav-title">Artifacts System</h2>
            </Link>
            <div className="nav-item search-box">
                <input className="search-input" type="text" placeholder="Search Artifacts.."/>
                <button className="search-button">Search</button>
            </div>
            <ul className="main-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add-new">Add New Artifact</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>

        </div>
        )
    }
}

export default Navbar