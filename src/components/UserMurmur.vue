<template>
  <div class="flex gap-4 gap-4 p-4 border-gray-200 border-t">
    <div class="w-full">
      <div class="flex md:space-x-2 space-x-1 items-baseline">
        <p class="md:text-base text-sm font-semibold w-max">
          {{ userMurmur.fullName }}
        </p>
        <p class="text-xs font-semibold text-gray-500">
          {{ userMurmur.username }}
        </p>
      </div>
      <p class="mb-2 break-all">
        {{ userMurmur.content }}
      </p>
      <div class="flex justify-between">
        <div class="flex space-x-2 flex-wrap gap-6 lg:gap-0">
          <button
            type="button"
            @click="deleteMurmur"
            class="flex gap-1 items-center text-gray-500 hover:text-gray-800 active:text-gray-800 transition duration-100 text-xs"
          >
            <span class="flex hidden lg:block"> Delete </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ReplyIcon,
  RefreshIcon,
  StarIcon,
  DotsHorizontalIcon,
} from '@vue-hero-icons/outline'
import { murmurUrl } from '../constants/url'

export default {
  name: 'UserMurmur',
  components: {
    ReplyIcon,
    RefreshIcon,
    StarIcon,
    DotsHorizontalIcon,
  },
  props: {
    userMurmur: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async deleteMurmur() {
      const response = await fetch(
        `${murmurUrl}/delete?murmurId=${this.userMurmur.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Specify the content type if sending JSON data
            // Add other necessary headers if required
          },
        }
      )
      console.log(this.userMurmur, response);
      this.$root.$emit('deletePost', this.userMurmur.id);
    },
  },
}
</script>
