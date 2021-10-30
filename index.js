const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());

// dbUser
// tJRyuWBhr3i5FGL1


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dyvua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//console.log(uri);

async function run(){
    try{
        await client.connect();
        console.log('Conected to database');
        const database = client.db("tourism");
        const servicesCollection = database.collection("services");

        // SERVICE POST API 
        app.post('/services', async(req, res) => {
            console.log('Post Hitting succesfully');    
            const service = req.body;
            const result = await servicesCollection.insertOne(service);
            console.log(service);
            res.json(result);
        }); 


        // SINGLE SERVICE POST API
        app.get("/services/:id", async(req, res) => {
            const id = req.params.id;
           // console.log('getting sinlge id', id);
            const query = {_id: ObjectId(id)};
            const service = await servicesCollection.findOne(query);
            res.json(service);

        })


        // SERVICE GET API 
        app.get('/services', async(req, res) => {
            console.log('Hitting the get post api');    
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);           
        });


        // GET API
        app.get('/', (req, res)=> {
            res.send('database connected by api');
        });

    } //  try end here 
    finally{
       // await client.close();
    }
}
run().catch(console.dir);

// ROOT API 
app.get('/', (req, res)=> {
    res.send('Yes, Tourism Server is running.');
});

// TEST API 
app.get('/test', (req, res)=> {
    res.send('Yes, Testing successfully.');
});

app.listen(port, () => {
    console.log('Yes, Tourism Server is running.', port);
});