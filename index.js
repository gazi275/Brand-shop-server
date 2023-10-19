
const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');

const cors = require("cors");
const app = express();

const port = process.env.PORT || 5001;
// gaziazad270
// f9okSM3YnLM66NUN




const uri = "mongodb+srv://gaziazad270:f9okSM3YnLM66NUN@cluster0.yv7cgkn.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
  
    await client.connect();
    const productCollection = client.db("productDB").collection("product");

    app.post("/product", async (req, res) => {
        const product = req.body;
        console.log(product);
        const result = await productCollection.insertOne(product);
        console.log(result);
        res.send(result);
      });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

   
  }
}
run().catch(console.dir);






app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Crud is running...");
  });
  

  app.listen(port, () => {
    console.log(`Simple Crud is Running on port ${port}`);
  });
  
    
