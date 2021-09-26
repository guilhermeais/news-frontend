import moment from 'moment'
export const state = () => ({
  news: [],
  loadingNews: false,
})

export const mutations = {
  SET_NEWS(state, news) {
    state.news = news
  },
  SET_LOADING(state, payload) {
    state.loadingNews = payload
  },
}

export const actions = {
  async fetchNews({ commit }) {
    commit('SET_LOADING', true)
    const news = await this.$strapi.$newspapper.find()
    commit('SET_NEWS', news)
    commit('SET_LOADING', false)
  },
}

export const getters = {
  _news(state) {
    return state.news.map((n) => {
      return {
        ...n,
        publishedAt: moment(n.publishedAt).format('DD/MM/YYYY HH:mm'),
      }
    })
  },
  _loadingNews(state) {
    return state.loadingNews
  },
}
