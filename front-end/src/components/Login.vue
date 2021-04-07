<template>
  <div class="Login">
    <div class="initial-screen" v-if="this.view == 0">
      <h1>Login to Make and Manage Appointments</h1>
      <button @click="changeView(1)">Login</button>
      <button @click="changeView(2)">Create Account</button>
    </div>

    <div class="login-form" v-if="this.view == 1">
      <h1>Login</h1>
      <input placeholder="Username" />
      <input placeholder="Password"/>
      <button>Login</button>
    </div>

    <div class="create-account-form" v-if="this.view == 2">
      <h1>Hello, new user!</h1>
      <p>Fill in the following fields below to get started with your new account</p>
      <input placeholder="First Name" />
      <input placeholder="Second Name" />
      <input placeholder="Email" />
      <input placeholder="Username" />
      <input placeholder="Password" />
      <button>Create Account</button>
    </div>
  </div>
</template>

<script>
//import axios from 'axios';
export default {
  name: 'HomePage',
  data() {
    return {
      view: "0",
    }
  },
  methods: {
    changeView(newView) {
      this.view = newView;
    }
  },
}
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
}

.initial-screen {
  border: black outset thin;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.initial-screen button {
  width: 70%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.login-form {
  border: outset black thin;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.login-form input {
  width: 70%;
  margin-top: 10px;
  margin-bottom: 10px;

}

.login-form button {
  width: 70%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.create-account-form {
  display: block;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  border: outset black thin;
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
}

.create-account-form input {
  width: 70%;
  margin-top: 10px;
  margin-bottom: 5px;
}

.create-account-form button {
  width: 70%;
  margin-top: 10px;
  margin-bottom: 10px;
}

/* Desktop Styles */
@media only screen and (min-width: 961px) {

.initial-screen {
  width: 45%;
}

.login-form {
  width: 45%;
}

.create-account-form {
  width: 45%;
}

}

</style>
