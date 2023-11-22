<template>
  <div
    class="flex flex-col bg-white gap-3 border-gray-200 border rounded-2xl p-4 w-80 mb-4"
  >
    <h3 class="pb-3 text-lg font-bold"></h3>
    <div v-for="object in list">
      <!-- <button type="button" @click="">"object.followId"</button> -->
      <Account
        :id="object.id"
        :username="object.username"
        :fullName="object.fullName"
        :status="object.status"
        :followId="object.followId"
      />
    </div>
    <div>
      <button type="button" @click="nextPage">Next</button>
      <button type="button" @click="prevPage">Previous</button>
    </div>
  </div>
</template>

<script>
import Account from '@/components/Account'
import { allUserUrl } from '../constants/url'

export default {
  name: 'WhoToFollow',
  components: {
    Account,
  },
  data: () => ({
    page: 1,
    pageSize: 10,
    list: [],
  }),
  computed: {
    currentPage() {
      return this.list.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      )
    },
    totalPages() {
      return Math.ceil(this.list.length / this.pageSize)
    },
  },
  methods: {
    nextPage() {
      this.page = Math.min(page + 1, totalPages)
    },
    prevPage() {
      this.page = Math.max(page - 1, 1)
    },
  },
  async fetch() {
    this.list = await fetch(`${allUserUrl}?userId=1`).then((res) => res.json())
    console.log(this.list);
  },
}
</script>
