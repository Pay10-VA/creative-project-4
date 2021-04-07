<template>
  <div class="about">
    <div v-if="this.$root.$data.user != null">
      <div id="page-title" v-if="this.appointmentList.length != 0">
        <h1>Appointment Manager</h1>
      </div>

      <div id="message" v-if="this.appointmentList.length == 0">
        <h1><strong>No Scheduled Appointments...</strong></h1>
        <p>Click to <router-link to="/">here</router-link> to schedule an appointment</p>
      </div>

      <div class="listOfAppointments" v-if="this.appointmentList.length != 0">
        <div v-for="appointment in appointmentList" :key="appointment._id" class="single-appointment">
          <h1 class="element">{{appointment.placeName}}</h1>
          <h3 class="element"> <i class="fas fa-map-marker-alt blue"></i> {{appointment.placeAddress}}, {{appointment.placeCity}} {{appointment.placeZipcode}}</h3>
          <h5 class="element"> <i class="far fa-calendar-alt"></i> {{appointment.appointmentDate}}</h5>
          <h5 class="element"> <i class="far fa-clock"></i> {{appointment.appointmentTime}}</h5>
          <h6 class="element"> <i class="far fa-user"></i> {{appointment.userName}}, {{appointment.userAge}}</h6>
          <div class="button-div">
            <button id="edit" @click="editAppointmentFunction(appointment._id)" v-if="editAppointment == false">Edit</button>
            <button id="cancel" @click="cancelAppt(appointment._id)" v-if="editAppointment == false">Cancel</button>
          </div>
          <div v-if="show(appointment._id)" class="edit-apt-div">
            <label>Enter new changes</label>
            <div class="first-div">
              <input type="date" v-model="newDate" placeHolder="Appt. Date: mm-dd-yyyy"/>
              <select class="date-input" @change="changeAppointmentTimeAgain($event)">
                <option value="" selected disabled>Select New Time</option>
                <option value="8:00 am">8:00 am </option>
                <option value="9:00 am">9:00 am </option>
                <option value="10:00 am">10:00 am </option>
                <option value="11:00 am">11:00 am </option>
                <option value="12:00 pm">12:00 pm </option>
                <option value="1:00 pm">1:00 pm </option>
                <option value="2:00 pm">2:00 pm </option>
                <option value="3:00 pm">3:00 pm </option>
                <option value="4:00 pm">4:00 pm </option>
                <option value="5:00 pm">5:00 pm </option>
              </select>
            </div>
            <div class="second-div">
              <input placeHolder="Enter Name" v-model="newName"/>
              <input placeHolder="Enter Age" v-model="newAge"/>
            </div>
            <button @click="saveAppointmentEdits(appointment._id, appointment.placeName, appointment.placeAddress, appointment.placeCity, appointment.placeZipcode)">Save Changes</button>
            <button id="nevermind" @click="cancelEditAppt()">Delete Changes</button>
          </div>

        </div>
        <div id="helpful">
          <h1>Things To Know </h1>
          <ul>
            <li>Make sure to bring personal identfication documents(Driver's license, passport, work ID)</li>
            <li>Have your appointment confirmation available when checking-in</li>
            <li>Arrive 15 minutes ahead of your scheduled vaccination time</li>

          </ul>
        </div>
      </div>
    </div>
    <Login v-else />
  </div>
</template>


<script>
import axios from 'axios';
import Login from '@/components/Login.vue';
export default {
  name: 'About',
  components: {
    Login,
  },
  data() {
    return {
      appointmentList: [],
      editAppointment: false,
      editAppointmentID: "",
      newName: "",
      newAge: "",
      newTime: "",
      newDate: "",
    }
  },
  created() {
    this.getAppointmentList();
  },
  methods: {
    async getAppointmentList() {
      let list = await axios.get('/api/appointment');
      this.appointmentList = list.data;
    },
    async cancelAppt(id) {
      try {
        await axios.delete("/api/appointment/" + id);
        this.getAppointmentList();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    editAppointmentFunction(id) {
      this.editAppointment = true;
      this.editAppointmentID = id;
    },
    cancelEditAppt() {
      this.editAppointment = false;
      this.editAppointmentID = "";
    },
    show(givenID) {
      if(givenID == this.editAppointmentID) {
        return true;
      }
      else {
        return false;
      }
    },
    changeAppointmentTimeAgain(event) {
      this.newTime = event.target.options[event.target.options.selectedIndex].text
    },
    async saveAppointmentEdits(id, place, address, city, zip) {
      try {
        await axios.put(`/api/appointment/${id}`, {
          userName: this.newName,
          userAge: this.newAge,
          appointmentTime: this.newTime,
          appointmentDate: this.newDate,
          placeName: place,
          placeAddress: address,
          placeZipcode: zip,
          placeCity: city
        });
        location.reload();

        this.newZipcode = "";
      } catch (error) {
        console.log(error);
      }
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

#helpful {
  text-align: left;
  border: outset;
  list-style-position: inside;
  padding-left: 10px;
}

#message {
  margin-top: 40%;
}

.edit-apt-div {
  margin-top: 20px;
}

.first-div input {
  width: 60%;
  height: 30px;
  margin-bottom: 10px;
}

.first-div select {
  height: 30px;
  width: 60%;
  margin-bottom: 10px;
}

.second-div input {
  width: 60%;
  height: 30px;
  margin-bottom: 10px;
}

.edit-apt-div button {
  width: 60%;
  height: 30px;
  background-color: #2DAE46;
  color: #FFFFFF;
}

#nevermind {
  margin-top: 10px;
  background-color: #CF2E17;
  color: #FFFFFF;
}


/* Desktop Styles */
@media only screen and (min-width: 961px) {

.listOfAppointments {
  width: 70%;
}

#message {
  margin-top: 20%;
}



} /*Closing bracket for media queries*/


</style>
