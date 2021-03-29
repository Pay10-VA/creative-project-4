<template>
  <div class="about">
    <div id="page-title">
      <h1>Appointment Manager</h1>
    </div>

    <div class="listOfAppointments">
      <div v-for="appointment in appointmentList" :key="appointment._id" class="single-appointment">
        <h1 class="element">{{appointment.placeName}}</h1>
        <h3 class="element"> <i class="fas fa-map-marker-alt blue"></i> {{appointment.placeAddress}} {{appointment.placeCity}} {{appointment.placeZipcode}}</h3>
        <h5 class="element"> <i class="far fa-calendar-alt"></i> {{appointment.appointmentDate}}</h5>
        <h5 class="element"> <i class="far fa-clock"></i> {{appointment.appointmentTime}}</h5>
        <h6 class="element"> <i class="far fa-user"></i> {{appointment.userName}}, {{appointment.userAge}}</h6>
        <div class="button-div">
          <button id="edit">Edit</button>
          <button id="cancel">Cancel</button>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'About',
  data() {
    return {
      appointmentList: [],
    }
  },
  created() {
    this.getAppointmentList();
  },
  methods: {
    async getAppointmentList() {
      let list = await axios.get('/api/appointment');
      this.appointmentList = list.data;
    }
  },
}
</script>



<style scoped>
  .about {
    min-height: calc(100vh - 80px - 100px);
    font-family: 'Quicksand', sans-serif;
    text-align: center;
  }

#page-title {
  margin-top: 30px;
}


.listOfAppointments {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
}

.single-appointment {
  text-align: left;
  border: outset;
  padding: 10px 10px 10px 10px;
  margin-bottom: 20px;
}

.blue {
  color: #3771D8;
}

#edit {
  margin-right: 10px;
  height: 35px;
  width: 100px;
  background-color: #3771D8;
  color: #FFFFFF;
}

.button-div {
  margin-top: 30px;
}

#cancel {
  height: 35px;
  width: 100px;
  background-color: #CF2E17;
  color: #FFFFFF;
}

.element {
  margin-bottom: 20px;
}

/* Desktop Styles */
@media only screen and (min-width: 961px) {

.listOfAppointments {
  width: 70%;
}

} /*Closing bracket for media queries*/


</style>
