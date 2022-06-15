import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const ArtifactItem = (props) => {
    const [artifact, setArtifact] = useState({});
    const fetchURL = "/api/artifact/" + props.id;

    useEffect(() => {
        fetch(fetchURL)
            .then(r => r.json())
            .then(artifact => setArtifact(artifact))
    }, [])

    const editArtifact = () =>{
        document.getElementById("edit-"+artifact.id).classList.add("hide");
        document.getElementById("save-"+artifact.id).classList.remove("hide");
        document.getElementById("delete-"+artifact.id).classList.remove("hide");
    }

    const deleteArtifact = () => {
        fetch(fetchURL,{
            method:'DELETE'
        })
            .then(r => r.json())
            .then(artifact => setArtifact(artifact))
    }

    const exitEdit = () => {
        document.getElementById("edit-"+artifact.id).classList.remove("hide");
        document.getElementById("save-"+artifact.id).classList.add("hide");
        document.getElementById("delete-"+artifact.id).classList.add("hide");

    }

    const saveArtifact = () => {
        exitEdit()
    }

    return(
        <tr>
            <td>{artifact.id}</td>
            <td><img src={artifact.imageURL} alt={artifact.description}/></td>
            <td>{artifact.name}</td>
            <td>{artifact.description}</td>
            <td>{artifact.temperature}</td>
            <td>{artifact.category}</td>
            <td>
                <Link id={"edit-"+artifact.id} onClick={editArtifact} to="#">Edit</Link>
                <Link id={"save-"+artifact.id} className="hide" onClick={saveArtifact} to="#">Save</Link>
                <Link id={"delete-"+artifact.id} className="hide" onClick={deleteArtifact} to="#">Delete</Link>
            </td>
        </tr>
    )
}

const ArtifactUpdate = () =>{
    const [artifacts, setArtifacts] = useState([]);

    useEffect(() => {
        fetch("/api/artifacts")
            .then(r => r.json())
            .then(artifacts => setArtifacts(artifacts))
    })

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Temperature</th>
                    <th>Category</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {artifacts.map((artifact) =>(<ArtifactItem key={artifact.id} id={artifact.id}/>))}
                </tbody>
            </table>
        </>
    )

}


export default ArtifactUpdate