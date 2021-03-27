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

    <h1 id="title">Find A Vaccination Center</h1>

    <div id="form-container">
      <h3>Select a County: </h3>
      <form>

        <select id=”lunch” name=”lunch”>
          <option value=”carson”>Carson City</option>
          <option value=”churchill”>Chuchill County</option>
          <option value=”clark”>Clark County</option>
          <option value=”douglas”>Douglas County</option>
          <option value=”elko”>Elko County</option>
          <option value=”humboldt”>Humbolt County</option>
          <option value=”mineral”>Mineral County</option>
          <option value=”nye”>Nye County</option>
          <option value=”washoe”>Washoe County</option>
        </select>
      </form>




    </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {

  }
}
</script>

<style scoped>

.home {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-family: 'Quicksand', sans-serif;
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

/* Desktop Styles */
@media only screen and (min-width: 961px) {

.home {
  width: 100%;
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


}

</style>
