<script>
import LoadingMask from '@/components/loading'
import NavBar from '@/components/navbar'

export default {
  name: 'app',
  components: {
    LoadingMask,
    NavBar
  },
  mounted () {
    document.title = 'Personal Blog'
  }
}
</script>

<template lang="pug">
#app
  .app-root
    NavBar
    router-view
  //- LoadingMask
</template>

<style lang="scss">
.app-root {
}
</style>
