<template>
  <div id="app">
    <div id="header">
      <h1>Vaccine Finder</h1>
      <div id="links">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/admin">Admin</router-link>
      </div>
    </div>
    <router-view/>
    <div id="footer">
      <a>GitHub Repository</a>
    </div>
  </div>
</template>

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
  height: 50px;
  text-align: center;
  margin-top: 50px;
}

</style>
