<template>
  <div>
    <h1>Trade or View your portfolio</h1>
    <h2>Your Funds: {{funds}} $</h2>
    <p>Your goal is to earn 100k in 100 days, prices are changing randomly</p>
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