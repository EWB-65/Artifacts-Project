import React, {Component} from "react";
import {Link} from "react-router-dom";


class ArtifactTable extends Component{
    constructor() {
        super();
        this.state = {
            artifacts:[]
        }
    }

    componentDidMount(){
        fetch('/api/artifacts')
            .then(r => r.json())
            .then(artifacts => this.setState({artifacts}))
    }

    render()
    {
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
                    {this.state.artifacts.map((artifact) => (
                        <tr key={artifact.id}>
                            <td>{artifact.id}</td>
                            <td><img width="100%" src={artifact.imageURL} alt={artifact.description}/></td>
                            <td>{artifact.name}</td>
                            <td>{artifact.description}</td>
                            <td>{artifact.temperature}</td>
                            <td>{artifact.category}</td>
                            <td>
                                <Link id={artifact.id + "-edit"} onClick={this.editArtifact()} to="#">Edit</Link>
                                <Link id={artifact.id + "-save"} onClick={this.editArtifact()} to="#">Save</Link>
                                <Link id={artifact.id + "-close"} onClick={this.editArtifact()} to="#">Close</Link>
                            </td>
                        </tr>

                    ))}
                    </tbody>
                </table>
            </>
        )
    }

}

export default ArtifactTable;