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
        </>
    )
}

export default Artifact;