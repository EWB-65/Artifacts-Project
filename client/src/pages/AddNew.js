import React, {Fragment} from 'react';
import axios from "axios";

class AddNew extends React.Component{
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
        e.preventDefault();
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
            <form onSubmit={this.handleUpload} className="form">
                <label>Name</label>
                <input required={true} id="artifactName" type="text"/>
                <label>Description</label>
                <input required={true} id="artifactDescription" type="text"/>
                <label>Temperature</label>
                <input required={true} id="artifactTemperature" type="number"/>
                <label>Category</label>
                <input required={true} id="artifactCategory" type="text"/>
                <label>Image</label>
                <input required={true} id="artifactImage" type="file" accept="image/*" onChange={this.selectImage}/>

                <input type="submit" className="form-submit" value="Add new artifact"/>
            </form>
        )
    }
}

export default AddNew