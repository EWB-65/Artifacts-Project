import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const SearchBox = () => {
    const [artifacts, setArtifacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const fetchUrl = "/api/artifacts/"

    useEffect(() => {
        fetch(fetchUrl)
            .then(r => r.json())
            .then(artifacts => setArtifacts(artifacts))
    }, [])

    const updateSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    return(
        <>
            <div className="nav-item search-box">
                <input onChange={updateSearch} id="searchQuery" list="artifactSearchList" className="search-input" type="text" placeholder="Search Artifacts.."/>
                <datalist id="artifactSearchList">
                    {artifacts.map((artifact) => (
                        <option key={artifact.id}>{artifact.name}</option>
                    ))}
                </datalist>
                <Link to={"/search/" + searchTerm}>
                <button className="search-button">Search</button>
                </Link>
            </div>
        </>
    )
}

export default SearchBox;