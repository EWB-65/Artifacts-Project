import React from 'react';
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

        this.setState({
            file: e.target.files[0],
            fileName: e.target.files[0].name
        })
    }

    addArtifact = imageURL => {
        const newArtifact = JSON.stringify({name:document.getElementById("artifactName").value,description:document.getElementById("artifactDescription").value,temperature:document.getElementById("artifactTemperature").value,category:document.getElementById("artifactCategory").value,history:document.getElementById("artifactHistory").value,location:document.getElementById("artifactLocation").value, imageURL:imageURL})
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
            const res = await axios.post('/api/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const {fileName, filePath} = res.data;

            this.setState({
                uploadedFile: {fileName, filePath}
            })

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
            <p>All fields required</p>
            <form onSubmit={this.handleUpload} className="form">
                <label>Name</label>
                <input required={true} id="artifactName" type="text"/>
                <label>Image</label>
                <input required={true} id="artifactImage" type="file" accept="image/*" onChange={this.selectImage}/>
                <label>History</label>
                <textarea required={true} id="artifactHistory" rows="10" cols="70"></textarea>
                <label>Description</label>
                <input required={true} id="artifactDescription" type="text"/>
                <label>Category</label>
                <input required={true} id="artifactCategory" type="text"/>
                <label>Storage Temperature</label>
                <input required={true} id="artifactTemperature" type="number"/>
                <label>Storage Location</label>
                <input required={true} id="artifactLocation" type="text"/>

                <input type="submit" className="form-submit" value="Add new artifact"/>
            </form>
                </>
        )
    }
}

export default AddNew