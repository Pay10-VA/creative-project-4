<template>
  <div class="admin">
    <h1>Admin page</h1>

    <div id="add-county">
      <h2>Add a County</h2>
      <input v-model="countyName" placeholder="County name"/>
      <button @click="addCounty()">Add County</button>
    </div>

    <div id="edit-delete-county">
      <h2>Edit/Delete a County</h2>
      <select @change="changeCounty($event)">
        <option value="" selected disabled>Choose County</option>
        <option v-for="county in this.list" :key="county.id" :value="county.id">{{county.name}}</option>
      </select>
      <button @click="deleteCounty()">Delete County</button>
      <button @click="editCountyFunc()">Edit County Info</button>
      <div v-if="this.editCounty" id="edit-div">
        <h2>Edit</h2>
        <input placeholder="Enter new county name" v-model="newCountyName"/>
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
      <button @click="addVaccLocation()">Add Location</button>
    </div>

    <div id="edit-delete-location">
      <h2>Edit/Delete Vaccine Location</h2>
      <select @change="changeCounty($event)" id="second-select">
        <option value="" selected disabled>Choose County</option>
        <option v-for="county in this.list" :key="county.id" :value="county.id">{{county.name}}</option>
      </select>
      <button @click="getLocationsInThisCounty()">Find Vaccine Location</button>
      <div v-if="this.showList == true">
        <div  v-for="location in this.locationList" :key="location.city" class="single-location">
          <h1>{{location.placeName}}</h1>
          <h3>{{location.streetAddress}}, {{location.city}} {{location.zipcode}}</h3>
          <div class="buttons">
            <button>Edit</button>
            <button @click="deleteVaccLocation(location.county, location.streetAddress)">Delete</button>
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
  },
}
</script>

<style scoped>
.admin {
  font-family: 'Quicksand', sans-serif;
  text-align: center;
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

/* Desktop Styles */
@media only screen and (min-width: 961px) {
  h1 {
    font-size: 60px;
  }

  #add-location input{
    width: 50%;
  }

  #edit-delete-county button{
    width: 50%;
  }

  #edit-delete-county select {
    width: 50%;
  }

  #add-location button{
    width: 50%;
  }

  #second-select {
    width: 50%;
    margin-bottom: 5px;
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
    width: 40%;
  }

  .buttons {
    display: flex;
  }

}
</style>
