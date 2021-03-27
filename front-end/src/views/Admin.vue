<template>
  <div class="admin">
    <h1>Admin page</h1>

    <div id="add-county">
      <h2>Add a County</h2>
      <input placeholder="County name"/>
      <button>Add County</button>
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
