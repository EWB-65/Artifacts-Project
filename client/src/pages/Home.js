import React from 'react';
import ArtifactTable from "../components/ArtifactTable";
import TestBackend from "../TestBackend";
import ArtifactsView from "../components/ArtifactsView";

class Home extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ArtifactsView categorySort={"Latest"}/>
                <ArtifactsView categorySort={"art"}/>
                <ArtifactsView categorySort={"weapons"}/>
            </div>
        )
    }
}

export default Home