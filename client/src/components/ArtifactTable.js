import React, {Component} from "react";

class ArtifactTable extends Component{
    constructor() {
        super();
        this.state = {
            artifacts:[],
        }
    }
    componentDidMount(){
        fetch('/api/artifacts')
            .then(r => r.json())
            .then(artifacts => this.setState({artifacts}))
    }


    render()
    {
        console.log(this.state.artifacts);
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
                        </tr>

                    ))}
                    </tbody>
                </table>
            </>
        )
    }

}

export default ArtifactTable;