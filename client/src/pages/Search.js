import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";

const SearchItem = (props) => {
    return(
        <Link className="search-item no-link-style" to={"/artifact/"+props.id}>
            <img className="search-item-img" src={props.imageURL}/>
            <div className="search-item-info">
                <h2>{props.name}</h2>
                <p>{props.description}</p>
            </div>
        </Link>
    )
}


const Search = () => {
    const params = useParams();
    const [artifacts, setArtifacts] = useState([]);
    const [visibleArtifacts, setVisibleArtifacts] = useState(5)

    const fetchUrl = "/api/artifacts?search=" + params.query


    useEffect(() => {
        fetch(fetchUrl)
            .then(r => r.json())
            .then(artifacts => setArtifacts(artifacts))
    })

    const loadMoreArtifacts = () => {
        setVisibleArtifacts(visibleArtifacts+5)
        if (visibleArtifacts >= (artifacts.length - 4)) {
            document.getElementById("loadMore").classList.add("hide");
        }
    }

    return(
        <>
            <h1>Search results for "{params.query}"</h1>
            {artifacts.slice(0,visibleArtifacts).map((artifact) => (
                <SearchItem key={artifact.id} id={artifact.id} name={artifact.name} description={artifact.description} imageURL={artifact.imageURL}/>
            ))}

            <div id="loadMore">
                <button onClick={loadMoreArtifacts} to="#">Load more</button>
            </div>
        </>
    )
}

export default Search;