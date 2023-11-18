<template>
    <div
      id="feed"
      class="
        w-auto
        bg-white
        border-gray-200 border
        lg:rounded-2xl lg:w-33 lg:max-w-33
      "
    >
      <h2 class="p-3 text-lg font-bold hidden lg:block">Murmurs</h2>
      <!-- <Murmur v-for="murmur in murmurs" :key="murmur.id" :murmur="murmur" /> -->

    </div>
  </template>
  
  <script>
  // import { mapActions, mapState } from 'vuex'
  import Murmur from '@/components/Murmur.vue'
  
  export default {
    name: 'Feed',
  
    components: {
      Murmur,
    },
  
    computed: {
      // ...mapState(['tweets']),
    },
  
    created() {
      // this.loadFeed()
    },
  
    methods: {
      // ...mapActions(['loadFeed']),
    },
  }
  </script>