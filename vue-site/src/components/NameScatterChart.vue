<template>
  <svg id="scatter_area"
    :height='height'
    :width='width'
  >
    <g>
      <circle
        v-for='d in nameInfo'
        v-bind:key='d.name + d.sexe'
        :cx='x(d.x)'
        :cy='y(d.y)'
        :r='scale(d.count)'
        :class="[d.sexe == 1 ? 'male' : 'female', 'name']"
        v-on:mouseover="$emit('select', d)"
      >
      </circle>
    </g>
  </svg>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'NameScatterChart',
  props: {
    nameInfo: Array
  },
  data() {
    return {
      height: 600,
      width: 600,
    }
  },
  computed: {
    x() {
      let [minX, maxX] = d3.extent(this.nameInfo.map(d => d.x))
      const x = d3.scaleTime().range([0, this.width]);
      x.domain([minX, maxX]);
      return x
    },
    y() {
      let [minY, maxY] = d3.extent(this.nameInfo.map(d => d.y))
      const y = d3.scaleTime().range([this.height, 0]);
      y.domain([minY, maxY]);
      return y
    },
    scale() {
      return d3.scaleLog()
       .domain(d3.extent(this.nameInfo.map(d => d.count)))
       .range([2, 7]);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.male {
  fill: #3498db
}
.female {
  fill: #FF6088
}
.name {
  stroke: black;
  stroke-width: 0.5;
}
.name:hover {
  stroke: black;
  stroke-width: 1.5;
}
</style>
