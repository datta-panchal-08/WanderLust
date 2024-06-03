const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const path = require("path");
const methodOverride = require("method-override");
const Listing = require("./models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";
const port = 3000;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

app.get('/listings', async (req, res) => {
  try {
    let allListings = await Listing.find({});
    console.log(allListings);
    res.status(200).json(allListings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching listings' });
  }
});

app.post('/listings', async (req, res) => {
  let updateData= req.body;
  try {
    let newListing = new Listing(updateData);
    await newListing.save();
    res.status(201).json(newListing);
    console.log(newListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/listings/:id/edit', async (req, res) => {
  let { id } = req.params;
  try {
    const getListing = await Listing.findById(id);
    if (!getListing) {
      return res.status(404).json({ message: 'Listing Retrived Successfully' });
    }
    res.status(200).json(getListing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while retriving the listing' });
  }
});

app.put('/listings/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // Assuming the update data is sent in the request body
  try {
    const updatedListing = await Listing.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updatedListing); // Sending back the updated listing as the response
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.delete('/listings/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findByIdAndDelete(id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing Deleted Successfully' });
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the listing' });

  }
});

app.get('/listings/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the listing' });
  }
});


app.listen(port, () => {
  console.log(`server is listening to port : ${port}`);
});

app.use(function (req, res, next) {
  console.log("Not found", req.url);
  res.send(404);
});