import React from 'react';
import {Link} from "react-router-dom";

class Navbar extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="navbar">
            <Link to="/">
                <span className="nav-item nav-title">Artifacts System</span>
            </Link>
            <div className="nav-item search-box">
                <input className="search-input" type="text" placeholder="Search Artifacts.."/>
                <button className="search-button">Search</button>
            </div>
            <Link to="/add-new">
                <button className="nav-item">Add New Artifact</button>
            </Link>
        </div>
        )
    }
}

export default Navbar