import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

const Artifact = () => {
    const params = useParams();
    const [artifact, setArtifact] = useState({});
    const fetchUrl = "/api/artifact/" + params.id

    useEffect(() => {
        fetch(fetchUrl)
            .then(r => r.json())
            .then(artifact => setArtifact(artifact))
    }, [])





    return(
        <>
            <h1>{artifact.name}</h1>
            <img className="artifact-img" src={artifact.imageURL}/>
            <p>
                <span>Storage Temperature: <strong>{artifact.temperature}°C</strong></span>
                <span> | </span>
                <span>Storage Location: <strong>{artifact.temperature}°C</strong></span>
            </p>
            <span>Category: <strong>{artifact.category}</strong></span>
            <span> | </span>
            <span>Description: <strong>{artifact.description}</strong></span>
            <h2>History</h2>
            <>{artifact.history}</>
        </>
    )
}

export default Artifact;