<template>
  <div
    id="perfil"
    class="bg-white border-gray-200 border rounded-2xl w-80 mb-4"
  >
    <div class="grid grid-cols-3 px-8 text-center gap-2">
      <p class="text-lg font-semibold mt-2">{{ user.name }}</p>
      <!-- <p class="text-lg font-semibold mt-2 center">Name</p> -->
      <p class="text-l font-semibold text-gray-500">
        {{ user.username }}
      </p>
      <!-- <p class="text-xs font-semibold text-gray-500">username</p> -->
    </div>
    <div id="info" class="flex gap-3 border-gray-200 border-t px-4"></div>
    <div class="grid grid-cols-3 px-8 text-center gap-2">
      <p class="md:text-xs">MURMURS</p>
      <p class="md:text-xs">FOLLOWING</p>
      <p class="md:text-xs">FOLLOWERS</p>
      <p class="md:text-xs font-bold">{{ userMurmurList.length }}</p>
      <p class="md:text-xs font-bold">{{ userFollowee.following }}</p>
      <p class="md:text-xs font-bold">
        {{ userFollower.follower ? userFollower.follower : 0 }}
      </p>
    </div>
    <div v-for="item in userMurmurList">
      <Murmur :murmur="item" />
    </div>
    <div class="p-3 text-lg font-bold hidden lg:block">
      <button type="button" @click="nextPage">Next</button>
      <button type="button" @click="prevPage">Previous</button>
    </div>
  </div>
</template>

<script>
// import { mapActions, mapState } from 'vuex'
import ResizableTextarea from '@/components/ResizableTextarea'
import Murmur from '@/components/Murmur.vue'
import {
  getFolloweesUrl,
  getFollowersUrl,
  getUserDetailsUrl,
  userMurmurUrl,
  murmurUrl,
} from '../constants/url'
import ref from 'vue'

export default {
  name: 'Perfil',
  components: {
    ResizableTextarea,
    Murmur,
  },
  data() {
    return {
      userMurmurList: [],
      text: '',
      user: 0,
      userFollower: 0,
      userFollowee: 0,
      pageNumber: 1,
      pagelength: 3,
      selectedUserId: 0,
    }
  },
  async mounted() {
    let id = localStorage.getItem('selectedUser')
    console.log('id', id)
    if (id) {
      this.selectedUserId = id
      this.fetchData(id);
    }
  },
  created() {
    // Listen for the event emitted from ComponentA to update ComponentB
    this.$root.$on('selectedUser', (data) =>  this.fetchData(data));

  },
  computed: {
    currentPage() {
      return this.list.slice(
        (this.pageNumber - 1) * this.pagelength,
        this.pageNumber * this.pagelength
      )
    },
    totalPages() {
      return Math.ceil(this.userMurmurList.length / this.pagelength)
    },
  },
  methods: {
    nextPage() {
      this.pageNumber = Math.min(this.pageNumber + 1, this.pagelength)
    },
    prevPage() {
      this.pageNumber = Math.max(this.pageNumber - 1, 1)
    },
    async fetchData(data) {
      this.userFollowee = await fetch(`${getFolloweesUrl}?userId=${data}`).then(
        (res) => res.json()
      )
      this.userFollower = await fetch(`${getFollowersUrl}?userId=${data}`).then(
        (res) => res.json()
      )
      this.me = await fetch(`${getUserDetailsUrl}?userId=${data}`).then((res) =>
        res.json()
      )
      this.userMurmurList = await fetch(`${userMurmurUrl}?userId=${data}`).then(
        (res) => res.json()
      )
    },
  },
  beforeDestroy() {
    // Ensure to clean up the event listener to prevent memory leaks
    this.$root.$off('selectedUser')
  },
}
</script>
