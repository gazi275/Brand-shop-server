
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
    const addCartCollection = client.db("productDB").collection("addCart");

    app.post("/product", async (req, res) => {
        const product = req.body;
        console.log(product);
        const result = await productCollection.insertOne(product);
        
        res.send(result);
      });

    app.post("/details", async (req, res) => {
        const product = req.body;
        console.log(product);
        const result = await addCartCollection.insertOne(product);
        console.log(result);
        res.send(result);
      });

      app.put("/updatedproduct/:id", async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        console.log("id", id, data);
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedProduct = {
          $set: {
            name: data.name,
             price: data.price,
             brand:data.brand,
             image:data.image,
             description:data.description,
             rating:data.rating,
             category:data.category
          },
          
        };
        console.log(updatedProduct);
        const result = await productCollection.updateOne(
          filter,
          updatedProduct,
          options
        );
        res.send(result);
      });

      app.get('/product/:brand', async (req, res) => {
        const brand = req.params.brand
        const result = await productCollection.find({brand}).toArray();
        
        res.send(result);
      });

      app.get("/products/:id", async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = {
          _id: new ObjectId(id),
        };
        const result = await productCollection.findOne(query);
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
  
    
