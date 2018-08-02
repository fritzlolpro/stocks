<template>
  <div>
    <h1>Trade or View your portfolio</h1>
    <h2>Your Funds: {{funds}} $</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters(['funds']),
	},
};
</script>

<style scoped>
</style>