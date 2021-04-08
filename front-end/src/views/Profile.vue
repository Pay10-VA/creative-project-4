<template>
  <div class="Profile">
    <h1 id="page-title">User Profile</h1>
    <i class="fas fa-id-card fa-7x"></i>

    <div class="userInfo">
      <h1 class="headingMain"><strong>Personal Information: </strong></h1>
      <h3 class='margin-bottom-space'>Name: {{this.$root.$data.user.firstName}} {{this.$root.$data.user.lastName}}</h3>
      <h3 class='margin-bottom-space' >Email: {{this.$root.$data.user.email}} </h3>
      <h3 class='margin-bottom-space' >Username: {{this.$root.$data.user.username}}</h3>
      <h3 v-if="vaccineRecordList.length == 0">Status: Not Vaccinated</h3>
      <h3 v-if="vaccineRecordList.length == 1">Status: Recieved One Dose <i class="fas fa-syringe"></i></h3>
      <h3 v-if="vaccineRecordList.length == 2">Status: Fully Vaccinated <i class="fas fa-syringe"></i> <i class="fas fa-syringe"></i></h3>
    </div>

    <div class="vaccineRecord">
      <h1 class="headingMain"><strong>Vaccination Record</strong></h1>
      <h3 v-if="vaccineRecordList.length == 0">There is nothing on record yet...</h3>
      <div v-if="vaccineRecordList.length != 0">
        <div class="single" v-for="record in vaccineRecordList" :key="record._id">
          <h1 class="heading-border">Appointment: </h1>
          <h3>{{record.placeName}}</h3>
          <h3><i class="fas fa-map-marker-alt blue"></i> {{record.placeAddress}}, {{record.placeCity}}, {{record.placeZipcode}}</h3>
          <h5><i class="far fa-calendar-alt"></i> {{record.appointmentDate}}</h5>
          <h5><i class="far fa-clock"></i> {{record.appointmentTime}}</h5>
        </div>
      </div>
    </div>



    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary deleteAccount" data-toggle="modal" data-target="#exampleModalCenter">
      Delete Account
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" id="thisModalDiv">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Do you really want to do this?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="mainModal">
            Deleting this account will wipe out all information
          </div>
          <div class="modal-footer" id="theModalFooter">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeButton" >Close</button>
            <button type="button" id="redButton" class="btn btn-primary" data-dismiss="modal" @click="deleteAccount()">Delete Account</button>
          </div>
        </div>
      </div>
    </div>






  </div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'Profile',
  data() {
    return {
      vaccineRecordList: [],
    }
  },
  async created() {
    this.getCompletedAppointments();
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  methods: {
    async getCompletedAppointments() {
      let userID = await axios.get('/api/users');
      userID = userID.data.user._id;
      let list = await axios.get('/api/appointment/' + userID);
      list = list.data;
      this.vaccineRecordList = list.filter(x => x.completed == true); //Filters completed appointments
    },
    async deleteAccount() {
      //Goes to the modified logout endpoint with id, delete first account first, then clear the session via req.sesesion = null

      try {
        let userID = await axios.get('/api/users');
        userID = userID.data.user._id;
        console.log(userID);
        await axios.delete("/api/appointment/random/" + userID); //Delete all appointments that have the current user as their user
        await axios.delete("/api/users/" + userID); //logs out user
        this.$root.$data.user = null;
        this.$router.push("About");
        this.show = false;
      } catch (error) {
        this.$root.$data.user = null;
      }

    },
  },
}
</script>


<style scoped>

* {
  padding: 0;
  margin: 0;
}

.Profile {
  min-height: calc(100vh - 80px - 100px);
  font-family: 'Quicksand', sans-serif;
  text-align: center;
}

#page-title {
  margin-top: 30px;
}

.userInfo {
  margin-top: 50px;
  border: outset thin;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 10px;
}

.margin-bottom-space {
  margin-bottom: 5px;
}

.headingMain {
  border: solid;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  margin-bottom: 15px;
}

.deleteAccount {
  background-color: #CF2E17;
  color: #FFFFFF;
  width: 80%;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 45px;
}

.vaccineRecord {
  margin-top: 50px;
  border: outset thin;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 10px;
}

.blue {
  color: #3771D8;
}

.heading-border {

}

.single {
  border: solid;
  border-left: 0px;
  border-right: 0px;
  border-top: 0px;
  margin-top: 20px;
}

#redButton {
  background-color: #CF2E17;
  color: #FFFFFF;
  margin-right: 10px !important;
}


/* Desktop Styles */
@media only screen and (min-width: 961px) {

.userInfo {
  width: 60%;
}

.vaccineRecord {
  width: 60%;
  margin-top: 20px;
}

.deleteAccount {
  width: 60%;
  margin-top: 20px;
  margin-botto: 10px;
  height: 40px;
}

/*Centers the modal horizontally on the screen*/
.modal {
  width: 450px;
  margin: 0 auto;
  font-size: 15px;
}

.modal-header h5 {
  font-size: 25px;
  padding-top: 10px;
  padding-left: 45px;
  padding-bottom: 10px;
}

#theModalFooter {
  padding-top: 10px;
  padding-bottom: 10px;
}

#mainModal {
  padding-top: 10px;
  padding-bottom: 10px;
}

#theModalFooter button {
  border-radius: 0 0 0 0;
}

#redButton {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  padding-right: 5px;
}

#closeButton {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  padding-right: 5px;
}

}
</style>
