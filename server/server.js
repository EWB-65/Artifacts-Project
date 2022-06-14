const express = require('express')
const server = express()
const port = 5000
const test = require('./routes/test');
const cors = require("cors");
const shortid = require('shortid');
const fileUpload = require('express-fileupload');
const path = require('path');

const artifacts = [
    {
        "id": "1432FGHU",
        "name": "the black vase",
        "description": "A medium sized vase decorated with black paint",
        "temperature": "27",
        "category": "art",
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/9/91/Portland_Vase_V%26A.jpg"
    },
    {
        "id": "8865UUiU",
        "name": "iron wood club",
        "description": "a club made of iron wood used for warfare",
        "temperature": "27",
        "category": "weapons",
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Arrernte_Keulen_EthnM.jpg/800px-Arrernte_Keulen_EthnM.jpg"
    },
    {
        "id": "9765HGSQ",
        "name": "spear",
        "description": "A fishing spear made of bamboo",
        "temperature": "20",
        "category": "weapons",
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Two_men_with_wooden_hair_ornaments%2C_spears_and_shields%2C_photograph_by_H._Basedow.jpg"
    },
    {
        "id": "6511SSFU",
        "name": "Didgeridoo",
        "description": "A Didgeridoo of aproximatly 150cm in length",
        "temperature": "27",
        "category": "art",
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Australiandidgeridoos.jpg"
    },
    {
        "id": "7624GHYU",
        "name": "boomerang",
        "description": "a returning boomerang made of wood",
        "temperature": "21",
        "category": "weapons",
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Australia_Cairns_Boomerang.jpg/1280px-Australia_Cairns_Boomerang.jpg"
    },
    {
        "id": "4356ABCD",
        "name": "shield",
        "description": "a shield with intricate patterns on its surface",
        "temperature": "25",
        "category": "weapons",
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Aboriginal_shields_NGV.jpg/1280px-Aboriginal_shields_NGV.jpg"
    },
    {
        "id": "5565GYUI",
        "name": "Bark canoes",
        "description": "a canoe made of bark",
        "temperature": "24",
        "category": "watercraft",
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Canoe_making.jpg/1280px-Canoe_making.jpg"
    },
    {
        "id": "6674HUOI",
        "name": "teeth necklace",
        "description": "a necklace made of the incisors of a kangaroo",
        "temperature": "26",
        "category": "art",
        "imageURL": "https://images.squarespace-cdn.com/content/v1/577e2cd9579fb37464190690/1550636888756-2YFOTMJLAUK5L1XDQBO1/Kangaroo-teeth-necklace.jpg"
    },
    {
        "id": "5583FGYU",
        "name": "bone pendant",
        "description": "a pendant made from the phalanges of a dingo",
        "temperature": "27",
        "category": "art",
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/a/af/Aboriginal_bone_necklace_-_Royal_Ontario_Museum_%2840308626972%29.jpg"
    },
    {
        "id": "4545FFEE",
        "name": "set of dolls",
        "description": "a set of dolls made from cassia nemophila and clay",
        "temperature": "28",
        "category": "art",
        "imageURL": "https://static2.lot-art.com/public/upl/6/Pair-of-Mojave-Indian-clay-pottery-dolls_1603489086_541.jpeg"
    },
    {
        "id": "7778FGHH",
        "name": "rattle",
        "description": "a rattle made of sea snail shells",
        "temperature": "19",
        "category": "art",
        "imageURL": "https://media.australian.museum/media/dd/images/Some_image.width-1200.a954758.jpg"
    },
    {
        "id": "6778FGHH",
        "name": "toy spear",
        "description": "a blunt wooden spear",
        "temperature": "27",
        "category": "art",
        "imageURL": "https://media.australian.museum/media/dd/images/Some_image.width-1200.4cd3dcf.jpg"
    }
];

server.use(fileUpload())

server.use(cors())


server.use(express.json())

server.use("/test", test)


server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

//Retrieve all artifacts
server.get("/api/artifacts", async (req, res) => {
    res.header("Content-Type",'application/json');
    res.send(artifacts);
});

//Retrieve an artifact by id
server.get("/api/artifact/:id", async (req, res) => {
    res.header("Content-Type",'application/json');

    const i = artifacts.findIndex((artifact) => artifact.id === req.params.id);

    res.send(artifacts[i]);
});

//Add new artifact
server.post("/api/artifact", async (req, res) => {
    const newArtifact = req.body;
    newArtifact.id = shortid.generate();
    artifacts.push(newArtifact);
    res.json(artifacts);
})

server.post('/upload-image', async (req,res) =>{
    if(req.files === null){
        return res.status(400).json({msg:"No file uploaded"})
    }

    const file = req.files.file;

    const fileExt = path.extname(file.name)

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