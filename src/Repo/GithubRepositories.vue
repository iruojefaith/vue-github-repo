<template>
    <div class=" container md:mx-auto px-3  mt-5 ">
      <ul class="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6   ">

        <li v-for="repo in displayedRepositories" :key="repo.id" class="repo list-none p-4 bg-white rounded overflow-hidden">
        <li class=" p-3 align-center ">
           <router-link class="text-[1.3rem] capitalize text-gray-600 font-bold " :to="{ name: 'repository', params: { name: repo.name } }"><h3 class="repo-name ">{{ repo.name }}</h3></router-link>
           <h4 class="text-xs font-semibold font-mono text-green-400 ">
          {{ repo.owner.login }}

        </h4>
          <p class="repo-description text-[#737373] text-sm font-semibold grow pt-3">{{ repo.description ? repo.description.slice(0, 50) + '...' : 'No description' }}</p>

           <div class="repository-language" :style="{ color: getLanguageColor(repo.language) }">
            <span class="fs-4 fw-bold me-1">
        <i class="bi" :class="getLanguageIcon(repo.language)"></i>
            </span>
        {{ repo.language }}
      </div>

       <div class="repository-updated mt-9 text-gray-600 ">{{ new Date(repo.updated_at).toLocaleDateString('en-us',) }}</div>
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
  import languages from './languages.js'
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
  const filteredRepositories = this.repositories
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .map(repo => ({
      ...repo,
      name: repo.name.replace(/[-_\s]/g, "")
    }));
  return filteredRepositories.slice(startIndex, endIndex);
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
      // Sort by updated_at in descending order
      this.repositories = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    })
    .catch(error => console.error(error));
      },
      goToPage(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= this.totalPages) {
          this.currentPage = pageNumber;
        }
      },
      getLanguageColor(language) {
      if (!language) return null
      const lang = language
      return languages[lang] ? languages[lang].color : null
    },
    getLanguageIcon(language) {
      if (!language) return null
      const lang = language
      return languages[lang] ? languages[lang].icon : null
    },
    formatDate(dateString) {
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
.repo-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 15ch;
}
 .repo {
    position: relative;
    height: 16rem;
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
      .repository-language {
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  margin-top: 8px;
}

.repository-language i {
  margin-right: 4px;
}
  </style>