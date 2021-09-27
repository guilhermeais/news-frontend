import moment from 'moment'

export const state = () => ({
  notifications: [],
})

export const mutations = {
  NEW_NOTIFICATION(state, payload) {
    state.notifications.push(payload)
  },
  READ_NOTIFICATION({ notifications }, hash) {
    // console.log('hash para visualizar', hash)
    const i = notifications.findIndex((n) => n.content.hash === hash)
    if (i !== -1) {
      notifications[i].readed = true
    }
  },
}

export const actions = {
  newNotification({ commit }, payload) {
    commit('NEW_NOTIFICATION', { ...payload, readed: false })
  },
  readNotification({ commit }, hash) {
    commit('READ_NOTIFICATION', hash)
  },
}

export const getters = {
  _notifications(state) {
    return state.notifications.map((n) => {
      return {
        ...n,
        content: {
          ...n.content,
          publishedAt: moment(n.content.publishedAt).format(
            'DD/MM/YYYY HH:mm:ss'
          ),
        },
      }
    })
  },
}
