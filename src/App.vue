<template>
    <div class="container">
      <Header></Header>
      <div class="row">
        <div class="col-md-12">
          <router-view></router-view>
        </div>
      </div>

    </div>
</template>

<script>
  import Header from './components/primary/Header.vue'
    export default {
      components: {
        Header
      }
    }
</script>

<style>
  body {
    padding-top: 40px;
  }
</style>
