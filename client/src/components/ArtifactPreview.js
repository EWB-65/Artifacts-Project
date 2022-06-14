import React from "react";
import axios from "axios";

class ArtifactPreview extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            artifact:{}
        }
    }

    componentDidMount() {
        const fetchUrl = "/api/artifact/" + this.props.id

        fetch(fetchUrl)
            .then(r => r.json())
            .then(artifact => this.setState({artifact}))
    }

    render() {
        return(
            <div className="artifact-preview" style={{backgroundImage:`url(${this.state.artifact.imageURL})`}}>
                <div className="details">
                    <div className="title">{this.state.artifact.name}</div>
                    <div className="more-info">{this.state.artifact.description}</div>
                </div>
            </div>
        )
    }
}

export default ArtifactPreview