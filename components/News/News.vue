<template>
  <section class="text-gray-600 body-font">
    <div v-if="!_loadingNews" class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap -m-4">
        <div v-for="news of _news" :key="news.hash" class="p-4 md:w-1/3">
          <NewsCards :logo="news.urlToImage" :link="news.url" :published-at="news.publishedAt" :title="news.title" :description="news.description" />
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
export default {
  computed: {
    _news() {
      return this.$store.getters['news/_news']
    },
    _loadingNews() {
      return this.$store.getters['news/_loadingNews']
    },
  },
  created() {
    this.$store.dispatch('news/fetchNews')
  },
}
</script>

<style></style>
