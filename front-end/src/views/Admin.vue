<template>
  <div class="admin">
    <h1>Admin page</h1>

    <div id="add-county">
      <h2>Add a County</h2>
      <input v-model="countyName" placeholder="County name"/>
      <button @click="addCounty()">Add County</button>
    </div>

    <div id="delete-county">
      <h2>Delete a County</h2>
      <select @change="changeCounty($event)">
        <option value="" selected disabled>Choose</option>
        <option v-for="county in this.list" :key="county.id" :value="county.id">{{county.name}}</option>
      </select>
      <button @click="deleteCounty()">Delete County</button>
    </div>

    <div id="add-location">
      <h2>Add Vaccine Location</h2>
      <input placeholder="Place"/>
      <input placeholder="Street Address"/>
      <input placeholder="City"/>
      <input placeholder="Zipcode"/>
      <input placeholder="County"/>
      <button>Add Location</button>
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
    }
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

#delete-county {
  text-align: left;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}

#delete-county button {
  margin-left: 5px;
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



/* Desktop Styles */
@media only screen and (min-width: 961px) {
  h1 {
    font-size: 60px;
  }

  #add-location input{
    width: 50%;
  }

  #add-location button{
    width: 50%;
  }
}
</style>
