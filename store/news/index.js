import moment from 'moment'

export const state = () => ({
  news: [],
  loadingNews: false,
  newNews: [],
})

export const mutations = {
  SET_NEWS(state, news) {
    state.news = news
  },
  SET_LOADING(state, payload) {
    state.loadingNews = payload
  },
  NEW_NEWS(state, payload) {
    state.newNews.push(payload)
  },
  RESET_NEW_NEWS(state) {
    state.newNews = []
  },
}

export const actions = {
  async fetchNews({ commit }) {
    commit('SET_LOADING', true)
    const news = await this.$strapi.$newspapper.find()
    commit('SET_NEWS', news)
    commit('RESET_NEW_NEWS')
    commit('SET_LOADING', false)
  },
  setNewNews(context, payload) {
    context.commit('NEW_NEWS', payload)
    context.dispatch(
      'notification/newNotification',
      {
        title: 'Nova Noticia!',
        content: payload,
      },
      { root: true }
    )
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
  _newNews(state) {
    return state.newNews
  },
}
