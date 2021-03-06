const express = require('express');
const server = express();
const port = 5000;
const cors = require("cors");
const shortid = require('shortid');
const fileUpload = require('express-fileupload');
const path = require('path');

const fs = require('fs');

const artifactFile = './artifacts.json';


let rawData = fs.readFileSync(artifactFile);
let artifacts = JSON.parse(rawData);

server.use(express.json())


server.use(fileUpload())

server.use(cors())


server.use("/api", express.json())


server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

//Retrieve all artifacts
//searchTerm query filters list to appropriate searchTerm
//limit filters list to the specified number of artifacts
server.get("/api/artifacts", async (req, res) => {
    res.header("Content-Type",'application/json');

    let searchTerm = req.query.search;
    let limit = req.query.limit;
    let categoryFilter = req.query.category;
    let artifactsFilter = [];

    //If there is a search query, return any artifacts that include query in name or description
    if (searchTerm) {
        for (let a in artifacts){

            if ((artifacts[a].name.toLowerCase().includes(searchTerm.toLowerCase()))||(artifacts[a].description.toLowerCase().includes(searchTerm.toLowerCase()))){
                artifactsFilter.push(artifacts[a])
            }
        }
    } else{
        artifactsFilter = artifacts;
    }

    if (categoryFilter) {
        for (let a in artifacts){
            if(artifacts[a].category === categoryFilter){
                artifactsFilter.push(artifacts[a])
            }
        }
    }

    if (limit) {
        artifactsFilter = artifactsFilter.slice(0,parseInt(limit))
    }

    const sortByDate = (a,b) => {
        return new Date(b.dateAdded).getTime() - new Date (a.dateAdded).getTime();
    }

    artifactsFilter = artifactsFilter.sort(sortByDate)

    res.send(artifactsFilter);
});

//Retrieve an artifact by id
server.get("/api/artifact/:id", async (req, res) => {
    res.header("Content-Type",'application/json');

    const i = artifacts.findIndex((artifact) => artifact.id === req.params.id);

    res.send(artifacts[i]);
});

//Delete artifact
server.delete("/api/artifact/:id",(req, res) => {
    const i = artifacts.findIndex((artifact) => artifact.id === req.params.id);

    artifacts.splice(i,1);

    //write to artifacts file
    fs.writeFileSync(artifactFile, JSON.stringify(artifacts));
})

//Add new artifact
server.post("/api/artifact", async (req, res) => {
    const newArtifact = req.body;

    //Create random id for artifact when added
    newArtifact.id = shortid.generate();

    //Add current date as date added for added
    newArtifact.dateAdded = new Date().toJSON();

    artifacts.push(newArtifact);
    res.json(artifacts);

    //write to artifacts file
    fs.writeFileSync(artifactFile, JSON.stringify(artifacts));
})

//Upload artifact image before adding artifact
server.post('/api/upload-image', async (req,res) =>{
    if(req.files === null){
        return res.status(400).json({msg:"No file uploaded"})
    }

    const file = req.files.file;

    const fileExt = path.extname(file.name)

    //Create file name based on id (Prevents duplicates)
    const randomFileName = shortid.generate() + fileExt;

    const fileMovePath = path.join(__dirname, `../client/public/uploads/${randomFileName}`)

    await file.mv(fileMovePath, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({fileName: randomFileName, filePath: `/uploads/${randomFileName}`});
    });

});

//Update artifact
server.delete("/api/artifact/:id",(req, res) => {
    const i = artifacts.findIndex((artifact) => artifact.id === req.params.id);

    artifacts[i] = req.body;

    //write to artifacts file
    fs.writeFileSync(artifactFile, JSON.stringify(artifacts));
})