<template>
  <section class="grid text-gray-600 body-font">
    <button
    class="
        bg-blue-500
        hover:bg-blue-600
        mt-3
        mr-3
        justify-content-end
        text-white
        font-bold
        py-2
        px-4
        rounded
        inline-flex
        items-center
        justify-self-end
      "
      :class="{'opacity-50': _loadingNews}"
      :disabled="_loadingNews"
      @click="fetchNews"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="25"
        fill="currentColor"
        class="font-bold flex mr-3 "
        :class="{'animate-spin':_loadingNews}"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
        />
        <path
          fill-rule="evenodd"
          d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
        />
      </svg>
      <span> Recarregar</span>
    </button>
    <small v-if="_newNews.length > 0" class="font-thin justify-self-end px-5">Há {{_newNews.length}} novas noticia(s), atualize para ve-las!</small>
    <div v-if="!_loadingNews" class="container px-5 py-5 mx-auto">
      <div class="flex flex-wrap -m-4">
        <div v-for="news of _news" :key="news.hash" class="p-4 md:w-1/3">
          <NewsCards
            :logo="news.urlToImage"
            :link="news.url"
            :published-at="news.publishedAt"
            :title="news.title"
            :description="news.description"
          />
        </div>
      </div>
    </div>

    <div v-if="_loadingNews" class="flex items-center mt-8 justify-center">
      <div
        class="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"
      ></div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  computed: {
    _news() {
      return this.$store.getters['news/_news']
    },
    _loadingNews() {
      return this.$store.getters['news/_loadingNews']
    },
    _newNews() {
      return this.$store.getters['news/_newNews']
    },
  },
  created() {
    this.fetchNews()
    this.socket = this.$nuxtSocket({
      name: 'main',
      vuex: {
        actions: [
          {
            newNews: 'news/setNewNews',
          },
        ],
      },
    })
    this.socket.emit('join', 'room-news')
  },
  methods: {
    ...mapActions({
      fetchNews: 'news/fetchNews',
    }),
  },
}
</script>

<style></style>
