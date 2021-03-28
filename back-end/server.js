const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/vaccine-sites', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a scheme for counties
const countySchema = new mongoose.Schema({
  name: String,
  numVaccLocations: Number
});

// Create a model for counties
const County = mongoose.model('County', countySchema);

// Add a county
app.post('/api/county', async (req, res) => {
  const county = new County({
    name: req.body.name,
    numVaccLocations: req.body.numVaccLocations,
  });
  try {
    await county.save();
    res.send(county);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all counties in the collection
app.get('/api/county', async (req, res) => {
  try {
    let countiesList = await County.find();
    res.send(countiesList);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
