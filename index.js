const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;


// 
app.use(cors());
app.use(express.json());
require('dotenv').config();


const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ogqtm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        console.log('from function')
        await client.connect();
        const database = client.db("audiCars");
        const carsCollection = database.collection("cars");
        


        // GET API
        app.get('/products', async (req, res) => {
            const cursor = carsCollection.find({});
            const products = await cursor.toArray();
            console.log('getting from products')
            res.send(products);
        })


        // for purchase
        // GET API
        app.get('/purchase', async (req, res) => {
            const cursor = bookedTour.find({});
            const booked = await cursor.toArray();
            console.log("showing from booked", booked)
            res.send(booked);
        })


        // GET A SINGEL API
        app.get('/details/:id', async (req, res) => {
            const id = req.params.id;
            console.log('specific id', id)
            const query = { _id: ObjectId(id) };
            const car = await carsCollection.findOne(query);
            console.log('from details',car)
            res.json(car)
        })


        // POST API
        // app.post('/products', async (req, res) => {
        //     const products = req.body;
        //     console.log('hitting', products)

        //     const result = await carsCollection.insertOne(products);
        //     console.log(result)
        //     res.json(result)
        // })


        
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);












app.get('/', (req, res) => {
    res.send('Hello dhoom!')
})

app.listen(port, () => {
    console.log(`Example app listening ${port}`)
})