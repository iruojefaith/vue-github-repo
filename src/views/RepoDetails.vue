<template>
  <div class=" p-4 bg-white rounded container mx-auto mx-8 ">
    <h2 class="text-[2rem] capitalize text-gray-600 font-bold " >{{ repository.name }}</h2>
    <p>{{ repository.description }}</p>
    <p>Language: {{ repository.language }}</p>
    <p>Last updated: {{ repository.updated_at }}</p>
  </div>
</template>

<script>
export default {
  name: 'RepoDetails',
  data() {
    return {
      repository: {}
    };
  },
  mounted() {
    this.fetchRepositoryDetails();
  },
  methods: {
    fetchRepositoryDetails() {
      const repositoryName = this.$route.params.name;
      const url = `https://api.github.com/repos/iruojefaith/${repositoryName}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.repository = data;
        })
        .catch(error => console.error(error));
    }
  }
};
</script>
