import React, {Component} from "react";

class ArtifactTable extends Component{
    constructor() {
        super();
        this.state = {
            artifacts:[],
        }
    }
    componentDidMount(){
        fetch('http://localhost:5000/api/artifacts')
            .then(r => r.json())
            .then(artifacts => this.setState({artifacts}))
    }


    render()
    {
        console.log(this.state.artifacts);
        return (
            <>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Temperature</th>
                    </tr>


                    {this.state.artifacts.map((artifact) => (
                        <tr>
                            <td>{artifact.id}</td>
                            <td>{artifact.name}</td>
                            <td>{artifact.description}</td>
                            <td>{artifact.temperature}</td>
                        </tr>

                    ))}
                </table>
            </>
        )
    }

}

export default ArtifactTable;