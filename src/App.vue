<template>
  <nav class="navbar">
    <div class="nav-link">
        <router-link to="/">Home</router-link> |
    <router-link to="/repositories">Repos</router-link>
    </div>
  </nav>
  <router-view/>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.navbar {
  padding: 60px;
  position: relative; /* added to make the position of the overlay relative to the nav element */
  background: url('https://images.pexels.com/photos/669506/pexels-photo-669506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2') no-repeat center center fixed; /* added to set the background image */
  background-size: cover; /* added to make sure the background image covers the entire nav element */
}

.navbar::before { /* added a pseudo element to create the overlay */
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* added to set the overlay color and opacity */
    z-index: 0;
}
.nav-link{
  position: absolute;
  z-index: 1;
  color: white;
}
.nav-bar a {
  font-weight: bold;
  color: #ffffff; /* changed the color to white so it appears clearly on the overlay */
  z-index: 1; /* added to ensure the links appear above the overlay */
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
