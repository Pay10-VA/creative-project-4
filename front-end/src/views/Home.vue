<template>
  <div class="home">

  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Warning!</strong> This is not a real site. This is a school project. DO NOT use this site for medical or covid related information
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
    </button>
  </div>

    <div id="container">
      <img id="state" src="../../public/Nevada_big_logo.png"/>
    </div>

    <h1 id="title">Find A Vaccination Center Near You</h1>
    <hr>

    <div id="form-container">
      <h3>Select a County: </h3>
      <form>

        <div>
          <select @change="changeCounty($event)">
            <option value="" selected disabled>Choose County</option>
            <option v-for="county in this.countyList" :key="county.id" :value="county.id">{{county.name}}</option>
          </select>

          <div v-if="this.selected" id="results">
            <h1 id="results-header">Vaccination Sites in {{this.selectedCounty}}:</h1>

            <div v-for="site in siteList" :key="site._id" class="single-site">
              <div class="top-div">
                <div class='left-div'>
                  <h1>{{site.placeName}}</h1>
                  <h3><i class="fas fa-map-marker-alt blue"></i> {{site.streetAddress}}, {{site.city}} {{site.zipcode}}</h3>
                </div>
                <div class='right-div'>
                  <button v-if="bookAppointment == false" @click="bookIt(site.streetAddress)">Book Appt.</button>
                </div>
              </div>

              <div class="book" v-if="isSameAddress(site.streetAddress)">
                <label for="date-input">Complete the following fields: </label>
                <div class="inputs">
                  <input type="date" class="date-input"/>

                  <select class="date-input">
                    <option>8:00 am </option>
                    <option>9:00 am </option>
                    <option>10:00 am </option>
                    <option>11:00 am </option>
                    <option>12:00 pm </option>
                    <option>1:00 pm </option>
                    <option>2:00 pm </option>
                    <option>3:00 pm </option>
                    <option>4:00 pm </option>
                    <option>5:00 pm </option>
                  </select>


                  <div class="personal">
                    <input id="left-input" class="personal-info" placeHolder="Full Name"/>
                    <input id="right-input" class="personal-info" placeHolder="Age">
                  </div>
                  <button id="reserve">Reserve Vaccination Slot</button>
                  <button id="cancel" @click="reloadPage()">Cancel</button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </form>

    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      countyList: [],
      selectedCounty: "",
      selected: false,
      siteList: [],
      bookAppointment: false,
      bookAddress: "",
    }
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let response =  await axios.get("/api/county");
      this.countyList = response.data;
    },
    changeCounty (event) {
      this.selectedCounty = event.target.options[event.target.options.selectedIndex].text
      this.selected = true;
      this.getSitesList();
    },
    getCountyID() {
      for(let i = 0; i < this.countyList.length; i++) {
        if(this.countyList[i].name == this.selectedCounty) {
          return this.countyList[i]._id;
        }
      }
    },
    async getSitesList() {
      let id = this.getCountyID();
      console.log(id);
      let listOfLocations = await axios.get(`/api/county/${id}/site`);
      this.siteList = listOfLocations.data;
    },
    bookIt(address) {
      this.bookAppointment = true;
      this.bookAddress = address;

    },
    isSameAddress(givenAddress) {
      if(givenAddress == this.bookAddress) {
        return true;
      }
      else {
        return false;
      }
    },
    reloadPage() {
      this.bookAddress = "";
      this.bookAppointment = false;
    }
  },
}
</script>

<style scoped>

.home {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-family: 'Quicksand', sans-serif;
  min-height: calc(100vh - 80px - 100px);
}

#state {
  height: 400px;
  margin-left: auto;
  margin-right: auto;
}

#container {
  width: 100%;
  text-align: center;
}

#title {
  font-size: 50px;
}

#form-container {
  margin-top: 50px;
}

#results-header {
  margin-top: 20px;
  border: solid;
  border-left: 0px;
  border-right: 0px;
  border-top: 0px;
}

.single-site {
  text-align: left;
  margin-bottom: 30px;
  border-bottom: solid thin;
}

.right-div button {
  width: 100px;
  height: 30px;
  background-color: #3771D8;
  color: #FFFFFF;
  margin-bottom: 20px;
}

.blue {
  color: #3771D8;
}

hr {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  background-color: black;
}

.book {
  margin-bottom: 20px;
}

.inputs input {
  margin-right: 10px;
  height: 30px;
}

.inputs select {
  height: 30px;
  margin-bottom: 20px;
}

#left-input {
  width: 51%;
}

#right-input {
  width: 25%;
}

#reserve {
  margin-top: 20px;
  width: 30%;
  background-color: #2DAE46;
  color: #FFFFFF;
}

#cancel {
  margin-top: 10px;
  display: block;
  width: 30%;
  background-color: #CF2E17;
  color: #FFFFFF;
}

/* Desktop Styles */
@media only screen and (min-width: 961px) {

.home {
  width: 100%;
  font-family: 'Quicksand', sans-serif;
}

#state {
  height: 500px;
}

#title {
  font-size: 60px;
}

#form-container {
  margin-top: 20px;
}

#results-header {
  width: 50%;
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
}

#results {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

.single-site {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  display: flex;

}

.left-div {
  width: 50%;
}

.right-div {
  width: 50%;
  text-align: right;
}

.right-div button {
  margin-top: 25px;
  margin-right: 20px;
  height: 40px;
  width: 100px;
}

hr {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  background-color: black;
}

.book {
  margin-top: 30px;
  display: block;
}

.single-site {
  display: block;
}

.top-div {
  display: flex;
}

#cancel {
  display: inline;
  margin-left: 10px;
}

}/*closing bracket for media styles*/

</style>
