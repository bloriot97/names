<template>
  <div id="app">
    <NameScatterChart :nameInfo=nameInfo>
    </NameScatterChart>
  </div>
</template>

<script>
import NameScatterChart from './components/NameScatterChart.vue'
import * as d3 from 'd3'

export default {
  name: 'app',
  components: {
    NameScatterChart
  },
  data() {
    return {
      nameInfo: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      let data = await d3.csv("info.csv");
      data.forEach(function(d) {
        d.x = +d.x
        d.y = +d.y
        d.count = +d.count
      });
      this.nameInfo = data;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
