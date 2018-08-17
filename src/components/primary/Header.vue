<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link tag="a" class="navbar-brand" exact="" to="/"><a>🏠</a></router-link>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <router-link active-class="active" tag="li" to="/portfolio"><a>Portfolio</a></router-link>
            <router-link active-class="active" tag="li" to="/stocks"><a>Stocks</a></router-link>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li><button class="btn btn-danger navbar-btn" :disabled='isGameFinished' :class="{disabled: isGameFinished}" @click="startNextDay()">End day</button></li>
            <li class="dropdown" :class="{open: isDropdownOpen}" @click="isDropdownOpen= !isDropdownOpen">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Save'n'Load <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li @click="saveGame"><a href="#">Save Game</a></li>
                <li @click="loadGame"><a href="#">Load Game</a></li>
                <li @click="startNewGame"><a href="#">New Game</a></li>
              </ul>
            </li>
            <p class="navbar-text"><b>Day: {{currentDay}}</b></p>
            <p class="navbar-text"><b>Remaining: {{daysRemaining}}</b></p>
            <p class="navbar-text"><b>Funds: {{funds}} $</b></p>
            <p class="navbar-text"><b>Goal: {{goal}} $</b></p>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	data() {
		return {
			isDropdownOpen: false
		};
	},
	computed: {
		...mapGetters([
			"goal",
			"funds",
			"currentDay",
			"daysRemaining",
			"isGameFinished",
			"isGameLost"
		])
	},
	watch: {
		isGameFinished: function() {
      if (this.isGameFinished) {
				if (this.isGameLost) {
					if (window.confirm("You loose. Start the new game?")) {
						this.startNewGame();
					}
				} else {
					if (window.confirm("You won. Start the new game?")) {
						this.startNewGame();
					}
				}
			}
		}
	},
	methods: {

		...mapActions(["startNextDay", "saveGame", "loadGame", "startNewGame"])
	}
};
</script>

<style scoped>
</style>