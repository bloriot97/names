<template>
  <div id="app">
    <SearchBar :names=nameInfo  v-on:select="selectName($event)"></SearchBar>
    <NameScatterChart
      :nameInfo=nameInfo
      v-on:select="selectName($event)"
    >
    </NameScatterChart>
    <div v-if="nameUsage">
      <NameUsageChart :name=selectedName :gender=selectedGender :nameUsage=nameUsage></NameUsageChart>
    </div>
    <NameInfo :information=nameInformation></NameInfo>
  </div>
</template>

<script>
import NameScatterChart from './components/NameScatterChart.vue'
import NameUsageChart from './components/NameUsageChart'
import NameInfo from './components/NameInfo.vue'
import SearchBar from './components/SearchBar.vue'

import * as d3 from 'd3'

export default {
  name: 'app',
  components: {
    NameScatterChart,
    NameUsageChart,
    NameInfo,
    SearchBar
  },
  data() {
    return {
      nameInfo: [],
      nameUsage: null,
      selectedName: 'BENJAMIN',
      selectedGender: 1,
      nameInformation: {}
    };
  },
  mounted() {
    this.fetchNameInfo();
    this.fetchNameUsage();
  },
  methods: {
    async fetchNameInfo() {
      let data = await d3.csv("info.csv");
      data.forEach(function(d) {
        d.x = +d.x
        d.y = +d.y
        d.count = +d.count
      });
      this.nameInfo = data;
    },
    async fetchNameUsage() {
      let data = await d3.csv("name_usage.csv");
      data.forEach(function (d) {
        let series = new Array()
        for (let [key, value] of Object.entries(d)) {
          if (key != 'name' && key != 'sexe') {
            d[key] = +value
            series.push({'date': new Date(+key, 1), 'value': d[key]})
          }
        }
        d.series = series
      });
      this.nameUsage = data;
    },
    selectName(node) {
      this.selectedName = node.name_index
      this.selectedGender = +node.sexe_index

      let id = 0;
      for (let i = 0; i < this.nameInfo.length; i++) {
        if (this.nameInfo[i].name_index == this.selectedName && this.nameInfo[i].sexe_index == this.selectedGender) {
          id = i;
        }
      }
      this.nameInformation = this.nameInfo[id]
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
  margin-top: 20px;
}
</style>
