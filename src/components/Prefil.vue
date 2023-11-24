<template>
  <div
    id="perfil"
    class="bg-white border-gray-200 border rounded-2xl w-80 mb-4"
  >
    <div class="grid grid-cols-3 px-8 text-center gap-2">
      <p class="text-lg font-semibold mt-2">{{ me.name }}</p>
      <!-- <p class="text-lg font-semibold mt-2 center">Name</p> -->
      <p class="text-l font-semibold text-gray-500">
        {{ me.username }}
      </p>
      <!-- <p class="text-xs font-semibold text-gray-500">username</p> -->
    </div>
    <div id="info" class="flex gap-3 border-gray-200 border-t px-4"></div>
    <div class="grid grid-cols-3 px-8 text-center gap-2">
      <p class="md:text-xs">MURMURS</p>
      <p class="md:text-xs">FOLLOWING</p>
      <p class="md:text-xs">FOLLOWERS</p>
      <p class="md:text-xs font-bold">{{ userMurmurs.length }}</p>
      <p class="md:text-xs font-bold">{{ followee.following }}</p>
      <p class="md:text-xs font-bold">
        {{ follower.follower ? follower.follower : 0 }}
      </p>
    </div>

    <form id="newMurmur" class="w-full max-w-sm p-4">
      <div
        class="flex items-center border-b border-teal-500 focus-within:border-blueTT rounded-sm py-2"
      >
        <ResizableTextarea>
          <textarea
            id="murmurText"
            ref="myTextarea"
            v-model="text"
            name="text"
            type="text"
            autocomplete="off"
            maxlength="150"
            placeholder="Compose new Murmur..."
            class="appearance-none w-full mr-3 py-1 px-2 pt-4 leading-tight focus:outline-none resize-none h-12"
            aria-label="Full name"
            @keyup.enter="create"
          />
        </ResizableTextarea>
        <button
          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 bg-black text-sm text-white py-1 px-4 rounded-3xl"
          type="button"
          @click="create"
        >
          Murmur
        </button>
      </div>
    </form>
  </div>
</template>

<script>
// import { mapActions, mapState } from 'vuex'
import ResizableTextarea from '@/components/ResizableTextarea'
import {
  getFolloweesUrl,
  getFollowersUrl,
  getUserDetailsUrl,
  userMurmurUrl,
  murmurUrl,
} from '../constants/url'

export default {
  name: 'Perfil',

  components: {
    ResizableTextarea,
  },

  data() {
    return {
      userMurmurs: [],
      text: '',
      me: 0,
      follower: 0,
      followee: 0,
    }
  },

  computed: {
    // ...mapState(['user'])
  },

  created() {
    // this.$axios.$get(`/api/users/${this.user.id}`).then((res) => {
    //   this.me = res.user
    // })
  },

  methods: {
    async create() {
      if (this.text.trim().length > 0) {
        const response = await fetch(murmurUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Specify the content type if sending JSON data
            // Add other necessary headers if required
          },
          body: JSON.stringify({
            content: this.text,
            createdBy: 1,
          }), // Convert data to JSON format
        })
        console.log('response ', response);
        this.text = ''
      }
      this.userMurmurs = await fetch(`${userMurmurUrl}?userId=1`).then((res) =>
        res.json()
      )
    },
  },
  async fetch() {
    this.followee = await fetch(`${getFolloweesUrl}?userId=1`).then((res) =>
      res.json()
    )
    this.follower = await fetch(`${getFollowersUrl}?userId=1`).then((res) =>
      res.json()
    )
    this.me = await fetch(`${getUserDetailsUrl}?userId=1`).then((res) =>
      res.json()
    )
    this.userMurmurs = await fetch(`${userMurmurUrl}?userId=1`).then((res) =>
      res.json()
    )
    // console.log(this.me, this.follower, this.followee, this.userMurmurs)
  },
}
</script>
