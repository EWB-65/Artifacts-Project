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
    }



    const saveArtifact = () => {
        const updatedArtifact = JSON.stringify({name:document.getElementById("artifactName"+artifact.id).textContent,description:document.getElementById("artifactDescription"+artifact.id).textContent,temperature:document.getElementById("artifactTemperature"+artifact.id).value,category:document.getElementById("artifactCategory"+artifact.id).textContent,history:artifact.history,location:document.getElementById("artifactLocation"+artifact.id).textContent, imageURL:artifact.imageURL, dateAdded:artifact.dateAdded, id:artifact.id })

        console.log(updatedArtifact)
        fetch(fetchURL,{
            method:'PUT',
            body:updatedArtifact
        })
            .then(r => r.json())
    }

    return(
        <tr>
            <td>{artifact.id}</td>
            <td>{new Date(artifact.dateAdded).toUTCString()}</td>
            <td><img src={artifact.imageURL} alt={artifact.description}/></td>
            <td id={"artifactName"+artifact.id} contentEditable="true">{artifact.name}</td>
            <td id={"artifactDescription"+artifact.id} contentEditable="true">{artifact.description}</td>
            <td id={"artifactTemperature"+artifact.id} contentEditable="true">{artifact.temperature}</td>
            <td id={"artifactCategory"+artifact.id} contentEditable="true">{artifact.category}</td>
            <td id={"artifactLocation"+artifact.id} contentEditable="true">{artifact.location}</td>
            <td>
                <button id={"save-"+artifact.id} onClick={saveArtifact} to="#">Save</button>
                <button id={"delete-"+artifact.id} onClick={deleteArtifact} to="#">Delete</button>
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
                    <th>Date Added</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Temperature (°C)</th>
                    <th>Category</th>
                    <th>Location</th>
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