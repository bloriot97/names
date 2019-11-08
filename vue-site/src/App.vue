<template>
  <div id="app">
    <div id="header">
      <SearchBar :names=nameInfo  v-on:select="selectName($event)"></SearchBar>
      <LanguageSwitch id='language_switch' />
    </div>
    <div class="body">
      <div id="general_info" class="side">
        <h2>
          {{$t('info.title')}}
        </h2>
        <div>
          <p
            v-for="(content, id) in $t('info.content')"
            v-bind:key="id"
          >
            {{content}}
          </p>
        </div>
      </div>
      <div id="scatter_container">
        <NameScatterChart
          v-if="loaded"
          :nameInfo=nameInfo
          v-on:select="selectName($event)"
        />
        <div v-else>
          <Loading/>
        </div>
      </div>
      <div id="name_info" class="side">
        <h2>
          {{$t('nameInformation')}}
        </h2>
        <div v-if="nameUsage">
          <NameUsageChart
            :name=selectedName
            :gender=selectedGender
            :nameUsage=nameUsage
          />
        </div>
        <NameInfo
          :information=nameInformation
          :neighbours=neighbours
        />
      </div>
    </div>
  </div>
</template>

<script>
import NameScatterChart from './components/NameScatterChart.vue'
import NameUsageChart from './components/NameUsageChart'
import NameInfo from './components/NameInfo.vue'
import Loading from './components/Loading.vue'
import SearchBar from './components/SearchBar.vue'
import LanguageSwitch from './components/LanguageSwitch.vue'

import * as d3 from 'd3'

export default {
  name: 'app',
  components: {
    NameScatterChart,
    NameUsageChart,
    NameInfo,
    SearchBar,
    Loading,
    LanguageSwitch,
  },
  data() {
    return {
      nameInfo: [],
      nameUsage: null,
      selectedName: 'BENJAMIN',
      selectedGender: 1,
      nameInformation: {},
      neighbours: [],
      loaded: false,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.nameInfo = await this.loadNameInfo();
      this.nameUsage = await this.loadNameUsage();
      this.loaded = true;
    },
    async loadNameInfo() {
      let data = await d3.csv("info.csv");
      data.forEach(function(d) {
        d.x = +d.x
        d.y = +d.y
        d.idmax = +d.idmax
        d.count = +d.count
      });
      return data;
    },
    async loadNameUsage() {
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
      return data;
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


      this.neighbours = this.nameInfo.map(function(info, i) {
        const delta_x = info.x - this.nameInformation.x;
        const delta_y = info.y - this.nameInformation.y;
        return {dist: Math.sqrt(delta_x*delta_x + delta_y*delta_y), index: i}
      }.bind(this))
        .sort((x, y) => x.dist > y.dist ? 1 : x.dist == y.dist ? 0 : -1)
        .slice(1,6)
        .map(function(x)  {
          return this.nameInfo[x.index]
        }.bind(this))
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
  }
  #scatter_container{
    flex-grow: 1;
  }
  .side {
    padding: 20px 20px 0px 20px;
  }
  .side > h2 {
    margin-top: 0;
  }
  #header {
    background-color: #2c3e50;
    padding: 10px;
  }
  #language_switch {
    display: block;
    width: 60px;
    position: absolute;
    right: 10px;
    top: 10px;
  }
  #general_info {
    max-width: 300px;
    text-align: justify;
  }
</style>
