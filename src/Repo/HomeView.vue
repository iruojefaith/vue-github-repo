
<template>
  <div class="home container mx-auto p-4 ">
    <div class="grid md:grid-cols-2 gap-6 my-3 ">
      <div class="card-one grid md:grid-cols-2 gap-3 bg-white rounded ">
        <img class=" rounded-full inline justify-self-center md:-ml-[2rem]  border-4 border-white/50 " :src="userData.avatar_url" alt="User Avatar" />
          <div class="font-bold mt-3">
            <h3 class="text-[1.5rem] capitalize text-gray-600 text-center md:text-start "> Iruoje Faith Oluwafunmileyi </h3>
              <p class="text-[1rem] font-semibold  text-green-400 text-center md:text-start mt-2 " ><span class="text-gray-600 ">username:</span>@{{ userData.login }}</p>
                <div class="mt-[11rem] grid grid-cols-2 ">
                  <p class=" text-gray-400 font-medium m-0 text-base p-3 "> Lagos, Nigeria</p>
                  <a class="rounded bg-green-400 p-2 mt-3 text-white text-xs text-center inline-block  " :href="userData.html_url" target="_blank">Visit GitHub Profile</a>
                </div>
          </div>
      </div>

      <div class="card-two bg-white rounded capitalize text-gray-500 font-bold mx-3 my-3 ">
        <h3 class="text-[1.2rem] capitalize text-gray-600 text-center md:text-start ">Statistics</h3>
        <p class=" mt-2  ">Public commits: {{ commitCount }}</p>
        <p class=" mt-2  ">Followers: {{ userData.followers }}</p>
        <p class=" mt-2  ">Following: {{ userData.following }}</p>
        <p class=" mt-2  ">Email: faithiruoje@gmail.com</p>
    </div>
  </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
export default {
   name: 'HomeView',
  data() {
    return {
      userData: {},
      commitCount: 0,
      username: 'iruojefaith', // Replace with your GitHub username
    };
  },
  mounted() {
    this.getUserData();
    this.getCommitCount();
  },
  methods: {
    async getUserData() {
      try {
        const response = await fetch(`https://api.github.com/users/${this.username}`);
        this.userData = await response.json();
      } catch (error) {
        console.log(error);
      }
    },
    async getCommitCount() {
      try {
        const response = await fetch(`https://api.github.com/users/${this.username}/events/public`);
        const events = await response.json();
        const commitEvents = events.filter((event) => event.type === 'PushEvent');
        this.commitCount = commitEvents.reduce((total, event) => total + event.payload.commits.length, 0);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
.home {
    position: relative;
    font-family: "poppins";
    height: 100%;
    transition: 120ms ease;
    cursor: pointer;
 }
 .card-one, .card-two {
  padding: 10px;
   box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
 }
 img {
  border: 4px solid white;
  border-radius: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  height: 100px;
  width: 100px;
  margin-top: -15%;
}
</style>

