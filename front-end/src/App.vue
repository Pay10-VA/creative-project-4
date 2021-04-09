<template>
  <div id="app">
    <div id="header">
      <h1><router-link to="/">Nevada Vaccine Finder <i class="fas fa-star-of-life"></i></router-link></h1>
      <div id="links">
        <router-link to="/">Home</router-link>
        <router-link to="/about" v-if="show == false"> | Appointments</router-link>
        <router-link to="/admin" v-if="show == true"> | Admin</router-link>


        <div class="btn-group">
          <button type="button" id="btn-style" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i id="icon" class="fas fa-user-circle fa-2x"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item" type="button" v-if="this.$root.$data.user != null">Logged in as: {{this.$root.$data.user.firstName}} {{this.$root.$data.user.lastName}}</button>
            <button @click="goToProfile()" class="dropdown-item" type="button" v-if="this.$root.$data.user != null && show == false">View Profile</button>
            <button @click="logout()" class="dropdown-item" type="button" v-if="this.$root.$data.user != null">Logout <i class="fas fa-sign-out-alt"></i></button>
            <button @click="signInFunction()" class="dropdown-item" type="button" v-if="this.$root.$data.user == null">Sign-in <i class="fas fa-sign-in-alt"></i></button>
          </div>
        </div>


      </div>
    </div>
    <router-view/>
    <div id="footer">
      <a id="footer-link" href="https://github.com/Pay10-VA/creative-project-4.git"><i class="fab fa-github"></i> Github Repository</a>
      <p>Number of Hours: 10hrs</p>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'App',
  data() {
    return {
      show: false,
    }
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
      if(response.data.user.role == null) {
        this.show = false;
      }
      else {
        this.show = true;
      }
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
        this.$router.push("About");
        this.show = false;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    signInFunction() {
      this.$router.push("About");
    },
    goToProfile() {
      this.$router.push("Profile");
    },
  },
}
</script>


<style>
* {
  padding: 0;
  margin: 0;
}

#header {
  background-color: #3771D8;
  color: #FFFFFF;
  display: flex;
  justify-content: space-around;
  font-family: 'Quicksand', sans-serif;
}

#header > h1 {
  font-size: 50px;
  width: 50%;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}

#footer-link {
  color: #FFFFFF;
}

#header a {
  color: #FFFFFF;
}

#header a:hover {
  text-decoration: none;
  color: #FFFFFF;
}

#links {
  width: 50%;
  text-align: right;
  margin-right: 20px;
  margin-top: 30px;
}

#links a {
  color: #FFFFFF;
}

#links a.router-link-exact-active {
  color: yellow;
}

#footer {
  background-color: #3771D8;
  color: #FFFFFF;
  font-family: 'Quicksand', sans-serif;
  font-size: 20px;
  height: 70px;
  text-align: center;
  margin-top: 50px;
}

.btn-group {
  margin-left: 10px;
}

#btn-style {
  background-color: #3771D8;
  border-radius: 50%;
  border: #3771D8;
  outline: none;
}

#icon {
  color: white;
}


</style>
