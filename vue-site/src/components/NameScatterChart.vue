<template>
  <svg id="scatter_area"
    :height='height'
    :width='width'
  >
    <g id="scatter_content">
      <circle
        v-for='d in nameInfo'
        v-bind:key='d.name + d.sexe'
        :cx='x(d.x)'
        :cy='y(d.y)'
        :r='scale(d.count)'
        :rInit='scale(d.count)'
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
      zoomScale: 1,
      svg: null,
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
  },
  mounted() {
    this.svg = d3.select('#scatter_area')
    this.g = d3.select('#scatter_content')
    const zoom = d3.zoom()
        .scaleExtent([0.3, 20]) //zoom limit
        .on('zoom', function() {
          this.g.style('stroke-width', `${1.5 / d3.event.transform.k}px`)
          this.g.attr('transform', d3.event.transform) // updated for d3 v4
          let zoomScale = d3.event.transform.k
          d3.selectAll('.name').each(function() {
            let e = d3.select(this);
            //console.log(e.attr("rInit"))
            e.attr('r', e.attr("rInit") / (1+(Math.log(zoomScale)/1.5)))
          })
        }.bind(this))

    this.svg.call(zoom)

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.male {
  fill: #3498db77
}
.female {
  fill: #FF608877
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
