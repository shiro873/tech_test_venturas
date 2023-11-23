<template>
  <div
    id="feed"
    class="w-auto bg-white border-gray-200 border lg:rounded-2xl lg:w-33 lg:max-w-33"
  >
    <h2 class="p-3 text-lg font-bold hidden lg:block">Murmurs</h2>
    <!-- <Murmur v-for="murmur in murmurs" :key="murmur.id" :murmur="murmur" /> -->
    <div v-for="item in murmurList">
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
import Murmur from '@/components/Murmur.vue'
import { murmurUrl } from '~/constants/url'

export default {
  name: 'Feed',
  components: {
    Murmur,
  },
  data: () => ({
    pageNo: 1,
    pageSizes: 10,
    murmurList: [],
  }),
  computed: {
    currentPage() {
      return this.list.slice(
        (this.pageNo - 1) * this.pageSizes,
        this.pageNo * this.pageSizes
      )
    },
    totalPages() {
      return Math.ceil(this.murmurList.length / this.pageSizes)
    },
  },
  created() {
    // this.loadFeed()
  },
  methods: {
    nextPage() {
      this.pageNo = Math.min(this.pageNo + 1, totalPages)
    },
    prevPage() {
      this.pageNo = Math.max(this.pageNo - 1, 1)
    },
  },
  async fetch() {
    this.murmurList = await fetch(`${murmurUrl}?id=1`).then((res) => res.json());
    // console.log('murmur list ---', this.murmurList);
  },
}
</script>
