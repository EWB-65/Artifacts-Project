import React, {Fragment} from 'react';
import axios from "axios";

class UploadImage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            file:"",
            filename:"",
            uploadedFile:{}
        }
    }

    selectImage = e => {
        this.state.file = e.target.files[0];
        this.state.fileName = e.target.files[0].name;
    }

    addArtifact = imageURL => {
        const newArtifact = JSON.stringify({name:document.getElementById("artifactName").value,description:document.getElementById("artifactDescription").value,temperature:document.getElementById("artifactTemperature").value,category:document.getElementById("artifactCategory").value, imageURL:imageURL})
        console.log(newArtifact)
        fetch('http://localhost:5000/api/artifact/', {
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            body:newArtifact
        })
            .then(r => r.json())
        alert("Artifact added");
    }

    handleUpload = async e => {
        const formData = new FormData();
        formData.append('file', this.state.file);
        try {
            const res = await axios.post('/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const {fileName, filePath} = res.data;
            this.state.uploadedFile = {fileName, filePath}
            this.addArtifact(filePath);
        } catch (err) {
            if(err.response.status === 500) {
                console.log('Server problem')
            } else {
                console.log("error error")
            }
        }

    }

    render() {
        return (
            <>
                <label>Name</label>
                <input id="artifactName" type="text"/>
                <label>Description</label>
                <input id="artifactDescription" type="text"/>
                <label>Temperature</label>
                <input id="artifactTemperature" type="text"/>
                <label>Category</label>
                <input id="artifactCategory" type="text"/>
                <label>Image</label>
                <input id="artifactImage" type="file" onChange={this.selectImage}/>
                <button onClick={this.handleUpload}>Add</button>

                { this.state.uploadedFile ? (
                    <>
                        <p>{this.state.uploadedFile.fileName}</p>
                        <img src={this.state.uploadedFile.filePath}/>
                    </>
                ) : null}


            </>
        )
    }
}

export default UploadImage