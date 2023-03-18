<template>
  <div class="p-4 bg-white rounded container mx-auto leading-loose ">
    <h2 class="text-[2rem] capitalize text-gray-600 font-bold">{{ repository.name }}</h2>
    <p>{{ repository.description }}</p>
    <p>Last updated: {{ repository.updated_at }}</p>
    <p>Number of commits: {{ numberOfCommits }}</p>
      <a class="text-white bg-green-400 p-2  rounded hover:underline" :href="repository.html_url">View on GitHub</a>
  </div>
</template>

<script>
export default {
  name: 'RepoDetails',
  data() {
    return {
      repository: {},
      numberOfCommits: 0
    };
  },
  mounted() {
    this.fetchRepositoryDetails();
    this.fetchNumberOfCommits();
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
    },
    fetchNumberOfCommits() {
      const repositoryName = this.$route.params.name;
      const url = `https://api.github.com/repos/iruojefaith/${repositoryName}/commits`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.numberOfCommits = data.length;
        })
        .catch(error => console.error(error));
    }
  }
};
</script>
