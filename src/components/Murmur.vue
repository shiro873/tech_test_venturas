<template>
  <div class="flex gap-4 gap-4 p-4 border-gray-200 border-t">
    <div class="w-full">
      <div class="flex md:space-x-2 space-x-1 items-baseline">
        <p class="md:text-base text-sm font-semibold w-max">
          {{ murmur.fullName }}
        </p>
        <p class="text-xs font-semibold text-gray-500">
          {{ murmur.username }}
        </p>
      </div>
      <p class="mb-2 break-all">
        {{ murmur.content }}
      </p>
      <div class="flex justify-between">
        <div class="flex space-x-2 flex-wrap gap-6 lg:gap-0">
          <button
            type="button"
            @click="like"
            class="flex gap-1 items-center text-gray-500 hover:text-gray-800 active:text-gray-800 transition duration-100 text-xs"
          >
            <!-- <HeartIcon class="lg:h-3 lg:w-3 h-4 w-4 lsg:m-0" fill="currentColor" /> -->
            <span class="flex hidden lg:block"> Like {{ murmur.likes }} </span>
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
  HeartIcon,
} from '@vue-hero-icons/outline'
import { likeMurmurUrl } from '../constants/url'

export default {
  name: 'Murmur',

  components: {
    ReplyIcon,
    RefreshIcon,
    StarIcon,
    DotsHorizontalIcon,
    HeartIcon,
  },

  props: {
    murmur: {
      type: Object,
      required: true,
    },
  },

  computed: {},

  methods: {
    async like() {
      const response = await fetch(likeMurmurUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type if sending JSON data
          // Add other necessary headers if required
        },
        body: JSON.stringify({
          murmurId: this.murmur.id,
          userId: 1,
        }), // Convert data to JSON format
      });
      console.log(response);
      this.$root.$emit('likedMurmur', this.murmur.id);
    },
    unlike() {},
  },
}
</script>
