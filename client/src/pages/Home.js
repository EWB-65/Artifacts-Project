import React from 'react';
import ArtifactTable from "../components/ArtifactTable";
import TestBackend from "../TestBackend";

class Home extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>Homepage</p>
                <TestBackend/>
                <ArtifactTable/>
            </div>
        )
    }
}

export default Home