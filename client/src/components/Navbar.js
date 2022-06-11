import React from 'react';
import {Link} from "react-router-dom";

class Navbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            artifacts:[],
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/api/artifacts')
            .then(r => r.json())
            .then(artifacts => this.setState({artifacts}))
    }

    render() {
        return (
        <div className="navbar">
            <Link className="nav-item no-link-style" to="/">
                <h2 className="nav-title">Artifacts System</h2>
            </Link>
            <div className="nav-item search-box">
                <input list="artifactSearchList" className="search-input" type="text" placeholder="Search Artifacts.."/>
                <datalist id="artifactSearchList">
                    {this.state.artifacts.map((artifact) => (
                        <option key={artifact.id}>{artifact.name}</option>
                    ))}

                </datalist>
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