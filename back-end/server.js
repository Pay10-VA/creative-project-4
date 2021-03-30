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

app.delete('/api/county/:id', async (req, res) => {
  try {
    await County.deleteOne({_id: req.params.id});
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/county/:id', async (req, res) => {
  try {
     let county = await County.findOne({_id: req.params.id});
     if (!county) {
         res.send(404);
         return;
     }
     county.name = req.body.name;

     await county.save();
     res.send(county);
   } catch (error) {
       console.log(error);
       res.sendStatus(500);
   }
});

// Schema for Vaccine Sites
const siteSchema = new mongoose.Schema({
    county: {
        type: mongoose.Schema.ObjectId,
        ref: 'County'
    },
    city: String,
    streetAddress: String,
    placeName: String,
    zipcode: String,
})

// Model for Vaccine Sites
const Site = mongoose.model('Site',siteSchema);

//Endpoint to add a vaccine site to a county
app.post('/api/county/:countyID/site', async (req, res) => {
    try {
        let county = await County.findOne({_id: req.params.countyID});
        if (!county) {
            res.send(404);
            return;
        }
        let site = new Site({
            county: county,
            city: req.body.city,
            streetAddress: req.body.streetAddress,
            placeName: req.body.placeName,
            zipcode: req.body.zipcode,
        });
        await site.save();
        res.send(site);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//Endpoint to get all vaccine locations from a given county
app.get('/api/county/:countyID/site', async (req, res) => {
    try {
        let county = await County.findOne({_id: req.params.countyID});
        if (!county) {
            res.send(404);
            return;
        }
        let sites = await Site.find({county: county});
        res.send(sites);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/county/:countyID/site', async (req, res) => {
    try {
        let county = await County.findOne({_id: req.params.countyID});
        console.log(county);
        if (!county) {
            res.send(404);
            return;
        }
        await Site.deleteMany({county: county});
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


//Endpoint to delete all vaccine locations in a certain county
app.delete('/api/county/:countyID/site/:siteAddress', async (req, res) => {
    try {
        let site = await Site.findOne({streetAddress:req.params.siteAddress, county: req.params.countyID});
        if (!site) {
            res.send(404);
            return;
        }
        await site.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/county/:countyID/site/:siteAddress', async (req, res) => {
    try {
        let site = await Site.findOne({streetAddress:req.params.siteAddress, county: req.params.countyID});
        if (!site) {
            res.send(404);
            return;
        }
        site.city = req.body.city;
        site.placeName = req.body.placeName;
        site.zipcode = req.body.zipcode;
        site.streetAddress = req.body.streetAddress;
        await site.save();
        res.send(site);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Create a scheme for appointment
const appointmentSchema = new mongoose.Schema({
  userName: String,
  userAge: Number,
  appointmentTime: String,
  appointmentDate: String,
  placeName: String,
  placeAddress: String,
  placeZipcode: String,
  placeCity: String,
});

// Create a model for appointments
const Appointment = mongoose.model('Appointment', appointmentSchema);


// Create an appointment
app.post('/api/appointment', async (req, res) => {
  const appointment = new Appointment({
    userName: req.body.userName,
    userAge: req.body.userAge,
    appointmentTime: req.body.appointmentTime,
    appointmentDate: req.body.appointmentDate,
    placeName: req.body.placeName,
    placeAddress: req.body.placeAddress,
    placeZipcode: req.body.placeZipcode,
    placeCity: req.body.placeCity,
  });
  try {
    await appointment.save();
    res.send(appointment);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


//Endpoint to get all appointments in appointment collection
app.get('/api/appointment', async (req, res) => {
  try {
    let list = await Appointment.find();
    res.send(list);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.delete('/api/appointment/:id', async (req, res) => {
  try {
    await Appointment.deleteOne({_id: req.params.id});
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/appointment/:id', async (req, res) => {
  try {
     let appointment = await Appointment.findOne({_id: req.params.id});
     if (!appointment) {
         res.send(404);
         return;
     }
     //county.name = req.body.name;
     appointment.userName = req.body.userName;
     appointment.userAge = req.body.userAge;
     appointment.appointmentTime = req.body.appointmentTime;
     appointment.appointmentDate = req.body.appointmentDate;
     appointment.placeName = req.body.placeName;
     appointment.placeAddress = req.body.placeAddress;
     appointment.placeZipcode = req.body.placeZipcode;
     appointment.placeCity = req.body.placeCity;

     await appointment.save();
     res.send(appointment);
   } catch (error) {
       console.log(error);
       res.sendStatus(500);
   }
});



app.listen(3001, () => console.log('Server listening on port 3000!'));
