import React from 'react';
import UploadImage from "../components/UploadImage";

class AddNew extends React.Component{
    constructor(props) {
        super(props);
    }

    // addArtifact = () => {
    //     const newArtifact = JSON.stringify({name:document.getElementById("artifactName").value,description:document.getElementById("artifactDescription").value,temperature:document.getElementById("artifactTemperature").value,category:document.getElementById("artifactCategory").value})
    //     console.log(newArtifact)
    //     fetch('http://localhost:5000/api/artifact/', {
    //         method:'POST',
    //         headers:{ 'Content-Type': 'application/json' },
    //         body:newArtifact
    //     })
    //         .then(r => r.json())
    //     alert("Artifact added");
    // }


    render() {
        return (
            <>
                {/*<form>*/}
                {/*        <label>Name</label>*/}
                {/*        <input id="artifactName" type="text"/>*/}
                {/*        <label>Description</label>*/}
                {/*        <input id="artifactDescription" type="text"/>*/}
                {/*        <label>Temperature</label>*/}
                {/*        <input id="artifactTemperature" type="text"/>*/}
                {/*        <label>Category</label>*/}
                {/*        <input id="artifactCategory" type="text"/>*/}
                {/*        <button onClick={this.addArtifact}>Add</button>*/}
                {/*</form>*/}
                <div>
                    <UploadImage/>
                </div>
            </>
        )
    }
}

export default AddNew