const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// dbUser
// tJRyuWBhr3i5FGL1

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dyvua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//console.log(uri);

async function run() {
  try {
    await client.connect();
    console.log("Conected to database");
    const database = client.db("tourism");
    const servicesCollection = database.collection("services");
    const ordersCollection = database.collection("orders");

    // SERVICE POST API
    app.post("/services", async (req, res) => {
      console.log("Post Hitting succesfully");
      const service = req.body;
      const result = await servicesCollection.insertOne(service);
      console.log(service);
      res.json(result);
    });

    // SINGLE SERVICE POST API
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      // console.log('getting sinlge id', id);
      const query = { _id: ObjectId(id) };
      const service = await servicesCollection.findOne(query);
      res.json(service);
    });

    // SERVICE GET API
    app.get("/services", async (req, res) => {
      console.log("Hitting the get post api");
      const cursor = servicesCollection.find({});
      const services = await cursor.toArray();
      res.send(services);
    });

    // ORDER POST API
    app.post("/orders", async (req, res) => {
      console.log("Orders Post Hitting succesfully");
      const order = req.body;
      const result = await ordersCollection.insertOne(order);
      //console.log(order);
      res.json(result);
    });

    // ORDERS GET API
    app.get("/orders", async (req, res) => {
      //console.log('Hitting the get post api');
      const cursor = ordersCollection.find({});
      const orders = await cursor.toArray();
      res.send(orders);
    });


    // ORDERS GET API
    app.get("/orders/:email", async (req, res) => {
      const email = req.params.email;
      console.log('Hitting the get post api', email);
      const cursor = ordersCollection.find({email:email});
      const orders = await cursor.toArray();
      res.send(orders);
    });

    
    // ORDER DELETE API
    app.delete("/orders/:id", async (req, res) => {
      const id = req.params.id;
      //console.log('Order delete api hit');
      const query = { _id: ObjectId(id) };
      const order = await ordersCollection.deleteOne(query);
      res.json(order);
    });

  } finally {
    //  try end here
    // await client.close();
  }
}
run().catch(console.dir);

// ROOT API
app.get("/", (req, res) => {
  res.send("Yes, Tourism Server is running.");
});

// TEST API
app.get("/test", (req, res) => {
  res.send("Yes, Testing successfully.");
});

app.listen(port, () => {
  console.log("Yes, Tourism Server is running.", port);
});
