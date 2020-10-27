<script>
import LoadingMask from '@/components/loading'

export default {
  name: 'app',
  components: {
    LoadingMask
  },
  mounted () {
    document.title = this.$t('common.brand')
  }
}
</script>

<template lang="pug">
#app
  .app-root
    router-view
  LoadingMask
</template>
