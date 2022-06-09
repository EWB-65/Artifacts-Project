const express = require('express')
const server = express()
const port = 5000
const test = require('./routes/test');
const cors = require("cors");
const shortid = require('shortid');

const artifacts = [{id:"jdsf8ue",name:"Artifact Name",description:"This is a description",temperature:"21"}];

server.use(cors())

server.use(express.json())

server.use("/test", test)

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

server.get("/api/artifacts", async (req, res) => {
    res.header("Content-Type",'application/json');
    res.send(artifacts);
});

server.post("/api/artifact", async (req, res) => {
    const newArtifact = req.body;
    newArtifact.id = shortid.generate();
    artifacts.push(newArtifact);
    res.json(artifacts);
})

class Artifact{
    constructor(artifactID, name, description, temp){
        this.artifactID = artifactID;
        this.name = name;
        this.description = description;
        this.temp = temp;
    }

    getArtifactID(){
        return artifactID;
    }

    getName(){
        return name;
    }

    getDescription(){
        return description;
    }

    getTemp(){
        return temp
    }

    setName(name){
        this.name = name;
    }

    setDescription(description){
        this.description = description;
    }

    setTemp(temp){
        this.temp = temp;
    }
}

class artifactCollection{
    constructor(){
        const collection = new set();
    }

    addArtifact(artifact){
        collection.add(artifact)
    }

    getArtifact(artifactID){
        const iterator = collection.values();
        for (const x of iterator){
            if(x.getArtifactID() === artifactID){
                return x;
            }

        }
        return null;
    }

    removeArtifact(artifactID){
        collection.delete(getArtifact(artifactID))
    }

    containsArtifact(artifactID){
        for (const x of iterator){
            if(x.getArtifactID() == artifactID){
                return true;
            }

        }
        return false;
    }
}