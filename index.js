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
console.log(uri);

async function run(){
    try{
        await client.connect();
        console.log('Conected to database');
        const database = client.db("tourism");
        const servicesCollection = database.collection("services");

        // POST API 
        app.get('/addServices', async(req, res) => {

            console.log('Hitting the post api');
            res.send('Post Hitting succesfully');
            
            /*
            const service = {
                "name": "ENGINE DIAGNOSTIC",
                "price": "300",
                "description": "Lorem ipsum dolor sit amet, consectetu radipisi cing elitBeatae autem aperiam nequ quaera molestias voluptatibus harum ametipsa.",
                "img": "https://i.ibb.co/dGDkr4v/1.jpg"
            };
            const result = await servicesCollection.insertOne(service);
            console.log(result);
            */
            
        }); // POST API end


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