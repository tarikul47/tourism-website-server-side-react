// Express import 
const express = require('express');
// Mongdb import 
const { MongoClient } = require('mongodb');
// ObjectId of Mongodb import
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

// middleware 
app.use(cors());
app.use(express.json());

// dbUser
// tJRyuWBhr3i5FGL1


//const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dyvua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//console.log(uri);

/*
async function run(){
    try{
        await client.connect();
        console.log('Conected to database');
        const database = client.db("tourism");
        const servicesCollection = database.collection("services");

        // POST API 
        app.post('/services', async(req, res) => {

            console.log('Hitting the post api', req.body);
            const service =  req.body;
            const result = await servicesCollection.insertOne(service);
            //console.log(result);
            res.json(result);
            
        });

    }
    finally{
        await client.close();
    }
}
run().catch(console.dir);
*/

// ROOT API
app.get('/', (req, res)=> {
    res.send('Yes, Server is Running');
});

// LISTEN API
app.listen(port, () => {
    console.log('Yes, Server is Running', port);
});

