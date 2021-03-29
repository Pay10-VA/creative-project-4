<template>
  <div class="admin">
    <h1>Admin page</h1>

    <div id="add-county">
      <h2>Add a County</h2>
      <input v-model="countyName" placeholder="County name"/>
      <button class="greenButton" @click="addCounty()">Add County <i class="fas fa-plus"></i></button>
    </div>

    <div id="edit-delete-county">
      <h2>Edit/Delete a County</h2>
      <select @change="changeCounty($event)">
        <option value="" selected disabled>Choose County</option>
        <option v-for="county in this.list" :key="county.id" :value="county.id">{{county.name}}</option>
      </select>
      <button class="redButton" @click="deleteCounty()">Delete County <i class="far fa-trash-alt"></i></button>
      <button class="blueButton" @click="editCountyFunc()">Edit County Info <i class="fas fa-edit"></i></button>
      <div v-if="this.editCounty" id="edit-div">
        <h2>Edit</h2>
        <input placeholder="Enter new name" v-model="newCountyName"/>
        <button @click="editCountyName()">Save Changes</button>
      </div>
    </div>

    <div id="add-location">
      <h2>Add Vaccine Location</h2>
      <input placeholder="Place" v-model="placeName"/>
      <input placeholder="Street Address" v-model="streetAddress"/>
      <input placeholder="City" v-model="city"/>
      <input placeholder="Zipcode" v-model="zipcode"/>
      <select @change="changeCounty($event)" id="second-select">
        <option value="" selected disabled>Choose County</option>
        <option v-for="county in this.list" :key="county.id" :value="county.id">{{county.name}}</option>
      </select>
      <button class="greenButton" @click="addVaccLocation()">Add Location <i class="fas fa-plus"></i></button>
    </div>

    <div id="edit-delete-location">
      <h2>Edit/Delete Vaccine Location</h2>
      <select @change="changeCounty($event)" id="second-select">
        <option value="" selected disabled>Choose County</option>
        <option v-for="county in this.list" :key="county.id" :value="county.id">{{county.name}}</option>
      </select>
      <button class="blueButton" @click="getLocationsInThisCounty()">Find Vaccine Location <i class="fas fa-search"></i></button>
      <div v-if="this.showList == true">
        <h1 class="bottom-space"><strong>Results:</strong></h1>

        <div  v-for="location in this.locationList" :key="location.streetAddress" class="single-location">
          <h2>{{location.placeName}}</h2>
          <h3><i class="fas fa-map-marker-alt blue"></i> {{location.streetAddress}}, {{location.city}} {{location.zipcode}}</h3>
          <div class="buttons">
            <button class="blueButton" @click="editLocationFunction(location.streetAddress)" v-if="editLocationDiv == false">Edit <i class="fas fa-edit"></i></button>
            <button class="redButton" @click="deleteVaccLocation(location.county, location.streetAddress)" v-if="editLocationDiv == false">Delete <i class="far fa-trash-alt"></i></button>
          </div>
          <div v-if="showDiv(location.streetAddress)" class="edit-loc-div">
            <div class="first">
              <input placeholder="New name" v-model="newPlaceName"/>
              <input placeholder="New Address"  v-model="newStreetAddress"/>
              <input placeholder="New City" v-model="newCity" />
              <input placeholder="New Zipcode"  v-model="newZipcode" />
            </div>
            <div class="second">
              <button class="submitChanges" @click="editLocationInfo(location.county, location.streetAddress)">Submit</button>
              <button class="back" @click="cancelChanges()">Back</button>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>


<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      countyName: "",
      list: [],
      selectedCounty: "",
      editCounty: false,
      newCountyName: "",
      streetAddress: "",
      city: "",
      zipcode: "",
      placeName: "",
      locationList: [],
      showList: false,
      editLocationDiv: false,
      newPlaceName: "",
      newStreetAddress: "",
      newCity: "",
      newZipcode: "",
      editAddress: "",
    }
  },
  created() {
    this.getCounties();
  },
  methods: {
    async addCounty() {
      try {
        await axios.post('/api/county', {
          name: this.countyName,
          numVaccLocations: 0,
        });
        this.countyName = "";
        this.getCounties();
      } catch(error) {
        console.log(error);
      }
    },
    async getCounties() {
      let response =  await axios.get("/api/county");
      this.list = response.data;
    },
    async deleteCounty() {
      let id = this.getCountyID(this.selectedCounty);
      try {
        await axios.delete("/api/county/" + id);
        this.selectedCounty = null;
        this.getCounties();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    changeCounty (event) {
      this.selectedCounty = event.target.options[event.target.options.selectedIndex].text
    },
    getCountyID(name) {
      for(let i = 0; i < this.list.length; i++) {
          //console.log(this.list[i].name, this.list[i]._id);
          if(this.list[i].name == name) {
            return this.list[i]._id;
          }
      }
    },
    editCountyFunc() {
      this.editCounty = true;
    },
    async editCountyName() {
      let id = this.getCountyID(this.selectedCounty);
      try {
        await axios.put("/api/county/" + id, {
          name: this.newCountyName,
        });
        this.selectedCounty = "";
        //this.getCounties();
        location.reload(); //reloads the entire page
        this.editCounty = false;
        this.newCountyName = "";
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addVaccLocation() {
      let id = this.getCountyID(this.selectedCounty);
      try {
        await axios.post(`/api/county/${id}/site`, {
          city: this.city,
          streetAddress: this.streetAddress,
          placeName: this.placeName,
          zipcode: this.zipcode,
        });
        this.city = "";
        this.placeName = "";
        this.streetAddress = "";
        this.zipcode = "";
        location.reload();
      } catch(error) {
        console.log(error);
      }
    },
    async getLocationsInThisCounty() {
      let id = this.getCountyID(this.selectedCounty);
      let listOfLocations = await axios.get(`/api/county/${id}/site`);
      let temp = listOfLocations.data; //Allows us to read in the JSON data
      this.locationList = temp.filter(object => object.county == id);
      this.showList = true;
    },
    async deleteVaccLocation(locationCounty, locationAddress) {
      try {
        console.log(locationCounty, locationAddress);
        await axios.delete(`/api/county/${locationCounty}/site/${locationAddress}`);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    editLocationFunction(address) {
      this.editLocationDiv = true;
      this.editAddress = address;
    },
    async editLocationInfo(locationCounty, locationAddress) {
      //Call put api endpoint
      console.log(locationCounty, locationAddress);
      try {
        await axios.put(`/api/county/${locationCounty}/site/${locationAddress}`, {
          city: this.newCity,
          streetAddress: this.newStreetAddress,
          placeName: this.newPlaceName,
          zipcode: this.newZipcode,
        });
        location.reload();
        this.newCity = "";
        this.newStreetAddress = "";
        this.newPlaceName = "";
        this.newZipcode = "";
      } catch (error) {
        console.log(error);
      }
    },
    showDiv(address) {
      if(address == this.editAddress) {
        return true;
      }
      else {
        return false;
      }
    },
    cancelChanges() {
      this.editLocationDiv = false;
      this.editAddress = "";
    }
  },
}
</script>

<style scoped>
.admin {
  font-family: 'Quicksand', sans-serif;
  text-align: center;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

input {
margin-right: 5px;
}

#add-county {
  text-align: left;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}

#edit-delete-county {
  text-align: left;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

#edit-delete-county button {
  margin-top: 5px;

}

#add-location {
  text-align: left;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

#add-location input {
  margin-bottom: 5px;
}
h2 {
  font-size: 30px;
}

#second-select {
  margin-bottom: 5px;
}

#edit-delete-location {
  text-align: left;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

#edit-div input {
  width: 60%;
}

#edit-div button {
  width: 38%;
}

.single-location {
  border: solid;
  border-left: 0px;
  border-right: 0px;
  border-top: 0px;
  margin-top: 10px;
}

.single-location button {
  margin-bottom: 10px;
  margin-right: 10px;
  width: 100px;
}

.edit-loc-div input {
  margin-top: 5px;
  margin-bottom: 5px;
}

.edit-loc-div {
  display: block;
}


.blue {
  color: #3771D8;
}

.back {
  background-color: #CF2E17; /*red*/
  color: #FFFFFF;
  margin-top: 0px;
}

.submitChanges {
  background-color: #2DAE46; /*green*/
  color: #FFFFFF;
}

.greenButton {
  background-color: #2DAE46; /*green*/
  color: #FFFFFF;
}

.redButton {
  background-color: #CF2E17; /*red*/
  color: #FFFFFF;
}

.blueButton {
  background-color: #3771D8;
  color: #FFFFFF;
}

/* Desktop Styles */
@media only screen and (min-width: 961px) {
  h1 {
    font-size: 60px;
  }

  #add-county {
    text-align: center;
  }

  #add-county button {
    width: 150px;
  }

  #add-location input{
    width: 50%;
  }

  #edit-delete-county {
    text-align: center;
    align-items: center;
  }

  #edit-delete-county button{
    width: 50%;
  }

  #edit-delete-county select {
    width: 50%;
  }

  #add-location {
    text-align: center;
    align-items: center;
  }

  #add-location button{
    width: 50%;
  }

  #second-select {
    width: 50%;
    margin-bottom: 5px;
  }

  #edit-delete-location {
    text-align: center;
    align-items: center;
  }

  #edit-delete-location button{
    width: 50%;
    margin-bottom: 30px;
  }

  #edit-div input {
    width: 50%;
  }

  #edit-div h2 {
    margin-top: 30px;
  }

  .single-location {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }

  .buttons {
    display: flex;
  }

  .bottom-space {
    margin-bottom: 50px;
  }

  .edit-loc-div {
    display: block;
  }

  .first input {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
  }

.second {
  display: flex-block;
  margin-top: 20px;
}

.second button {
  width: 50%;
}

}
</style>
