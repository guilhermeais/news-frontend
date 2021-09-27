<template>
  <nav
    class="
      font-mono
      text-white-500
      flex flex-col
      text-center
      sm:flex-row sm:text-left sm:justify-between
      py-4
      px-6
      shadow-md
      sm:items-baseline
      w-full
      bg-blue-500
    "
  >
    <div class="mb-2 sm:mb-0">
      <nuxt-link class="text-3xl" to="/">
        <img
          src="https://be-enlighten.com/wp-content/uploads/2021/05/Logo.png"
          alt=""
        />
      </nuxt-link>
    </div>
    <div class="self-center">
      <button
        class="relative z-10 flex rounded-md bg-white p-2 focus:outline-none"
        :class="{ 'animate-bounce': _notificationsFiltered.length > 0 }"
        @click="dropdownOpen = !dropdownOpen"
      >
        <svg
          class="h-5 w-5 text-gray-800"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
          />
        </svg>
        <span
          v-if="_notificationsFiltered.length > 0"
          class="
            inline-flex
            items-center
            justify-center
            px-2
            py-1
            mr-2
            text-xs
            font-bold
            leading-none
            text-red-100
            bg-red-600
            rounded-full
          "
          >{{ _notificationsFiltered.length }}</span
        >
      </button>

      <div
        v-show="dropdownOpen"
        class="fixed inset-0 h-full w-full z-10"
        @click="dropdownOpen = false"
      ></div>

      <div
      
        v-show="dropdownOpen"
      
        class="
          absolute
          right-0
          mt-2
          bg-white
          rounded-md
          shadow-lg
          overflow-hidden
          z-20
        "
        style="width: 20rem"
      >
        <div v-for="notification of _notifications"   :key="notification.content.hash"   class="py-2" >
          <a
            target="_blank"
            :href="notification.content.url"
            class="flex items-center px-4 py-3 hover:bg-gray-100 mx-2"
            @click="read(notification.content.hash)"
          >
            <img
              class="h-8 w-8 rounded-full object-cover mx-1"
              :src="notification.content.urlToImage"
            />
            <p class="text-gray-600 text-sm mx-2">
              <span
                v-if="!notification.readed"
                class="inline-block w-2 h-2 mr-2 bg-red-600 rounded-full"
              ></span>
              <span class="font-bold" href="#">{{ notification.title }}</span>
              <span>{{notification.content.description}}</span>.
              {{ notification.content.publishedAt }}
            </p>
          </a>
        </div>
        <a
          href="#"
          class="block bg-gray-800 text-white text-center font-bold py-2"
          >See all notifications</a
        >
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      dropdownOpen: false,
    }
  },
  methods: {
    ...mapActions({
      read: 'notification/readNotification',
    }),
  },
  computed: {
    _notifications: {
      get() {
        return this.$store.getters['notification/_notifications']
      },
    },
    _notificationsFiltered: {
      get() {
        return this.$store.getters['notification/_notifications'].filter(
          (n) => !n.readed
        )
      },
    },
  },
}
</script>
