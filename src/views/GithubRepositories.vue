<template>
    <div class=" container mx-auto mx-8 ">
      <ul class="grid grid-cols-2 md:grid-cols-4 gap-6 ">

        <li v-for="repo in displayedRepositories" :key="repo.id" class="repo list-none p-4 bg-white rounded-3 overflow-hidden">
        <li class="columns-md columns-lg columns-xl p-3 ">
           <router-link class="text-[1.5rem] capitalize text-gray-600 font-bold " :to="{ name: 'repository', params: { name: repo.name } }"><h3>{{ repo.name }}</h3></router-link>
           <h4 class="text-[1rem] font-semibold font-mono text-green-400 ">
          {{ repo.owner.login }}

        </h4>
          <p class=" repo-description text-[#737373] text-sm font-semibold grow pt-3 ">{{ repo.description }}</p>
          <p class="pt-3 fs-4 fw-bold ">{{ repo.language }}</p>
        </li>
      </li>
      </ul>
      <nav class="flex gap-3 items-center justify-center  " v-if="pages.length > 1">
        <ul class="pagination grid grid-cols-5 md:grid-cols-6 p-3 cursor-pointer  ">
          <li class="page-item h-14 w-14 flex items-center justify-center " :class="{ disabled: currentPage === 1 }">
            <a class="page-link " @click.prevent="goToPage(currentPage - 1)">Previous</a>
          </li>
          <li v-for="page in pages" :key="page" class="page-item rounded-full mx-2 bg-green-400 h-14 w-14
                flex items-center justify-center  " :class="{ active: currentPage === page }">
            <a class="page-link" @click.prevent="goToPage(page)">{{ page }}</a>
          </li>
          <li class="page-item h-14 w-14 flex items-center justify-center " :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" @click.prevent="goToPage(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
      <router-view></router-view>
    </div>
  </template>

  <script>
  export default {
    name: 'GithubRepositories',
    data() {
      return {
        repositories: [],
        currentPage: 1,
        itemsPerPage: 10
      };
    },
    computed: {
      displayedRepositories() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.repositories.slice(startIndex, endIndex);
      },
      totalPages() {
        return Math.ceil(this.repositories.length / this.itemsPerPage);
      },
      pages() {
        const pagesArray = [];
        for (let i = 1; i <= this.totalPages; i++) {
          pagesArray.push(i);
        }
        return pagesArray;
      }
    },
    mounted() {
      this.fetchRepositories();
    },
    methods: {
      fetchRepositories() {
        const username = 'iruojefaith';
        const url = `https://api.github.com/users/${username}/repos`;

        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.repositories = data;
          })
          .catch(error => console.error(error));
      },
      goToPage(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= this.totalPages) {
          this.currentPage = pageNumber;
        }
      }
    }
  };
  </script>

  <style>

  .fw-medium {
  font-weight: 500;
}

.fw-semibold {
  font-weight: 600;
}

.font-mono {
  font-family: "Roboto Mono", monospace;
}

.fs-7 {
  font-size: 0.8rem;
}
  body {
    font-family: "poppins", monospace;
}
h6, .h6, h5, .h5, h4, .h4, h3, .h3, h2, .h2, h1, .h1 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
}
 .repo {
    position: relative;
    height: 18rem;
    transition: 120ms ease;
    cursor: pointer;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
 }
    .repo:hover {
      transform: scale(1.02);
    }

    .repo-description {
      position: relative;
      overflow: hidden;
    }
      .repo::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 1.5rem;
        left: 0;
        bottom: 0;
        background: linear-gradient(to bottom, transparent, white);
      }

  </style>