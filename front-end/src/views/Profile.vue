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
      <h1 class="headingMain"><strong>Vaccination Record/Completed Appointments</strong></h1>
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
    <button class="deleteAccount">Delete Account</button>

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
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
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
  margin-botto: 10px;
  height: 40px;
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

}
</style>
