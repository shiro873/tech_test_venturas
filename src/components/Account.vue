<template>
    <div class="flex gap-4 pb-1">
      <div class="w-full">
        <div class="flex items-center mb-3 justify-between">
          <div class="flex space-x-2 items-center">
            <p class="text-lg font-semibold">{{ fullName }}</p>
            <p class="text-lg md:text-xs font-semibold text-gray-500">
              {{ username }}
            </p>
          </div>
          <button class="font-semibold text-xl transform -translate-y-0.5">
            x
          </button>
        </div>
        <button
          type="button"
          class="
            mb-2
            p-1
            px-3
            text-xs
            rounded-full
            duration-100
            transition-colors
            ease-in-out
            delay-75
            border border-transparent
          "
          :class="
            status
              ? 'bg-white text-black border-gray-200'
              : 'bg-black text-white'
          "
          @click="status = !status"
        >
          {{ status ? 'Following' : 'Follow' }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Account',
  
    props: {
      username: {
        type: String,
        required: true,
      },
      fullName: {
        type: String,
        required: true,
      },
      status: {
        type: Number,
        required: true
      }
    },
    methods: [],
    data() {
      return {
        following: false,
      }
    },
  }
  </script>