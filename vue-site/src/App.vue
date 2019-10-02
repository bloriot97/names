<template>
  <div id="app">
    <div id="header">
      <SearchBar :names=nameInfo  v-on:select="selectName($event)"></SearchBar>
    </div>
    <div class="body">
      <div id="general_info" class="side">
        <h2>
          What do i see here?
        </h2>
        <div>
          <p>
            Here you can see a visualisation of the trend for french names from 1900 until 2017.
          </p>
          <p>
            The closer two dots are on the visualisation the more similar their trend are (t-SNE).
            The size depends on the total number of babies who received the names.
          </p>
          <p>
            For clarity reasons, I removed the names given less that 1000 times, so don't panic if you don't see your names,
            it means you are special 🙃.
          </p>
        </div>
      </div>
      <div id="scatter_container">
        <NameScatterChart
                :nameInfo=nameInfo
                v-on:select="selectName($event)"
        />
      </div>
      <div id="name_info" class="side">
        <h2>
          Name's Information
        </h2>
        <div v-if="nameUsage">
          <NameUsageChart :name=selectedName :gender=selectedGender :nameUsage=nameUsage></NameUsageChart>
        </div>
        <NameInfo :information=nameInformation></NameInfo>
      </div>
    </div>
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
  body {
    margin: 0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
  .body{
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
  }
  #scatter_container{
    flex-grow: 1;
  }
  .side {
    padding: 0px 20px;
  }
  .side > h2 {
    margin-top: 0;
  }
  #header {
    background-color: #2c3e50;
    padding: 10px;
  }
  #general_info {
    max-width: 300px;
    text-align: justify;
  }
</style>
