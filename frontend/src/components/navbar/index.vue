<script>
export default {
  name: 'nav-bar',
  data () {
    return {}
  },
  props: {},
  computed: {},
  methods: {},
  mounted () {},
  components: {},
  watch: {}
}
</script>

<template lang="pug">
.nav-bar
  .left-bar
    el-button(type="text")
      i.fas.fa-bars
</template>

<style lang="scss">
.nav-bar {
  height: 60px;
  background: linear-gradient(to right, #ebf4f5, #b5c6e0);
}
</style>
