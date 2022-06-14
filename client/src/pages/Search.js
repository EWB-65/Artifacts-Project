import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

const SearchItem = (props) => {
    return(
        <>
            <h2>{props.name}</h2>
        </>
    )
}


const Search = () => {
    const params = useParams();
    const [artifacts, setArtifacts] = useState([]);
    const [visibleArtifacts, setVisibleArtifacts] = useState(5)
    const fetchUrl = "/api/artifacts/"

    useEffect(() => {
        fetch(fetchUrl)
            .then(r => r.json())
            .then(artifacts => setArtifacts(artifacts))
    }, [])

    const loadMoreArtifacts = () => {
        setVisibleArtifacts(visibleArtifacts+5)
        if (visibleArtifacts >= (artifacts.length - 4)) {
            document.getElementById("loadMore").classList.add("hide");
        }
    }

    return(
        <>
            <h1>Search results for "{params.query}"</h1>
            {artifacts.filter((artifact)=>{
                if (params.query == ""){
                    return artifact
                } else if (artifact.name.toLowerCase().includes(params.query.toLowerCase())){
                    return artifact
                }
            }).slice(0,visibleArtifacts).map((artifact) => (
                <SearchItem key={artifact.id} name={artifact.name}/>
            ))}

            <div id="loadMore">
                <button onClick={loadMoreArtifacts} to="#">Load more</button>
            </div>
        </>
    )
}

export default Search;