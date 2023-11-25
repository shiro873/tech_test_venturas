<template>
  <div class="home h-screen w-screen">
    <Nav />
    <main class="lg:flex lg:gap-4 lg:justify-center grid py-14 lg:pt-20">
      <div class="hidden lg:block">
        <Perfil />
      </div>
      <Feed />
      <div class="hidden lg:block">
        <Users />
      </div>
      <OtherPerfil />
    </main>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Feed from '@/components/Feed.vue'
import About from '@/components/About.vue'
import Perfil from '@/components/Prefil.vue'
import Users from '~/components/Users.vue'
import AddTweet from '@/components/AddMurmur.vue'
import OtherPerfil from '@/components/OtherPerfil.vue'

export default {
  name: 'Home',
  components: {
    Nav,
    Feed,
    About,
    Perfil,
    Users,
    AddTweet,
  },
}
</script>