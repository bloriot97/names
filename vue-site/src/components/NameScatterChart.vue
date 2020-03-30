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
        :fill="colorScale(d.idmax)"
        :id="`name_${d.name_index}_${d.sexe == 1 ? 1 : 2}`"
        v-on:mouseover="$emit('select', d)"
      >
      </circle>
    </g>
  </svg>
</template>

<script>
import * as d3 from 'd3'
import { interpolateSpectral } from 'd3-scale-chromatic';

export default {
  name: 'NameScatterChart',
  props: {
    nameInfo: Array,
    selectedName: String,
    selectedNameGender: Number
  },
  data() {
    return {
      height: 800,
      width: 800,
      zoomScale: 1,
      svg: null,
    }
  },
  computed: {
    x() {
      let [minX, maxX] = d3.extent(this.nameInfo.map(d => d.x))
      const x = d3.scaleTime().range([10 , this.width - 20]);
      x.domain([minX, maxX ]);
      return x
    },
    y() {
      let [minY, maxY] = d3.extent(this.nameInfo.map(d => d.y))
      const y = d3.scaleTime().range([this.height - 20, 10]);
      y.domain([minY, maxY]);
      return y
    },
    scale() {
      return d3.scaleLog()
       .domain(d3.extent(this.nameInfo.map(d => d.count)))
       .range([2, 7]);
    },
    colorScale() {
      let [minX, maxX] = d3.extent(this.nameInfo.map(d => d.idmax));
      let color = function (c) {
        return interpolateSpectral((c-minX) / (maxX - minX));
      }
      return color;
    }
  },
  watch: {
    selectedName: function () {
        this.highlightName()
    },
    selectedNameGender: function () {
        this.highlightName()
    }
  },
  methods: {
    highlightName() {
      d3.selectAll(`.name`).attr('selected', null)
      d3.select(`#name_${this.selectedName}_${this.selectedNameGender}`).attr('selected', true)
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
  /*
.male {
  fill: #3498db77
}
.female {
  fill: #FF608877
}*/
.name {
  stroke: black;
  stroke-width: 0.5;
  filter: grayscale(0.3);
  fill-opacity: 0.8;
}
.name[selected="true"] {
  stroke: black;
  stroke-width: 1.5;
  filter: saturate(8);
  fill-opacity: 1;
  transform: translateX(40);
  /* fill: inherit; */
}
</style>
