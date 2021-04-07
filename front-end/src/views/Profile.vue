<template>
  <div class="Profile">
    <h1 id="page-title">User Profile</h1>
    <i class="fas fa-id-card fa-7x"></i>

    <div class="userInfo">
      <h1 class="headingMain"><strong>Personal Information: </strong></h1>
      <h3 class='margin-bottom-space'>Name: {{this.$root.$data.user.firstName}} {{this.$root.$data.user.lastName}}</h3>
      <h3 class='margin-bottom-space' >Email: {{this.$root.$data.user.email}} </h3>
      <h3 class='margin-bottom-space' >Username: {{this.$root.$data.user.username}}</h3>
    </div>

    <div class="vaccineRecord">
      <h1 class="headingMain"><strong>Vaccination Record</strong></h1>
      <h3 v-if="vaccineRecordList.length == 0">There is nothing on record yet...</h3>
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
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
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
