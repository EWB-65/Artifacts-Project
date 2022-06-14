import React from "react";
import ArtifactPreview from "./ArtifactPreview";
import {Link} from "react-router-dom";

class ArtifactsView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            artifacts:[],
            visibleArtifacts:3
        }
        this.loadMoreArtifacts = this.loadMoreArtifacts.bind(this)
    }

    componentDidMount() {
        fetch('/api/artifacts/')
            .then(r => r.json())
            .then(artifacts => this.setState({artifacts}))
    }

    loadMoreArtifacts() {
        this.setState({visibleArtifacts: this.state.visibleArtifacts + 4});
        if (this.state.visibleArtifacts >= (this.state.artifacts.length - 4)) {
            document.getElementById("loadMore-"+this.props.categorySort).classList.add("hide");
        }
    }




    render() {
        return (
            <>
                <h2 className="artifacts-category">{this.props.categorySort}</h2>
                <div className="artifacts-view">
                    {this.state.artifacts.filter((artifact)=>{
                        if(this.props.categorySort === "Latest"){
                            return artifact
                        } else if (this.props.categorySort === artifact.category) {
                            return artifact
                        }
                    }).slice(0,this.state.visibleArtifacts).map((artifact) => (
                        <Link to={"/artifact/"+artifact.id} key={artifact.id}>
                            <ArtifactPreview id={artifact.id}/>
                        </Link>
                    ))
                    }
                    <div id={"loadMore-"+this.props.categorySort} className="load-more">
                        <button to="#" onClick={this.loadMoreArtifacts}>Load more</button>
                    </div>

                </div>

            </>
        )
    }
}

export default ArtifactsView