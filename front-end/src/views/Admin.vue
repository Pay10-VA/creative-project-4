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
      <input placeholder="Place"/>
      <input placeholder="Street Address"/>
      <input placeholder="City"/>
      <input placeholder="Zipcode"/>
      <select @change="changeCounty($event)" id="second-select">
        <option value="" selected disabled>Choose County</option>
        <option v-for="county in this.list" :key="county.id" :value="county.id">{{county.name}}</option>
      </select>
      <button>Add Location</button>
    </div>

    <div id="edit-delete-location">
      <h2>Edit/Delete Vaccine Location</h2>
      <select @change="changeCounty($event)" id="second-select">
        <option value="" selected disabled>Choose County</option>
        <option v-for="county in this.list" :key="county.id" :value="county.id">{{county.name}}</option>
      </select>
      <button>Find Vaccine Location</button>
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
  }

  #edit-div input {
    width: 50%;
  }

  #edit-div h2 {
    margin-top: 30px;
  }

}
</style>
