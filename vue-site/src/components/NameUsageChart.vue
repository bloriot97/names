<template>
    <div>
        <h3>
            {{name}}
        </h3>
        <svg id="lineplot_area"
             :height='height'
             :width='width'
        >
            <g>
                <path class="line" :d=series>

                </path>
                <text x="0" :y="height" class="date">1900</text>
                <text :x="width-40" :y="height" class="date">2017</text>
            </g>
        </svg>
    </div>
</template>

<script>
    import * as d3 from 'd3'

    export default {
        name: "NameUsageChart",
        props: {
            name: String,
            gender: Number,
            nameUsage: Array
        },
        data() {
            return {
                valueline: null,
                height: 200,
                width: 400,
                series: [],
                x: null,
                y: null,
            }
        },
        created() {
            this.x = d3.scaleTime().range([0, this.width]).domain([new Date(1900, 1), new Date(2018, 1)]);
            this.y = d3.scaleLinear().range([this.height - 20, 0]);
            this.x.domain([new Date(1900, 1), new Date(2018, 1)]).nice();
            this.y.domain([0, 1]);
            let x = this.x
            let y = this.y
            this.valueline = d3.line()
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.value); })
            this.updateData()
        },
        watch: {
            name: function () {
                this.updateData()
            },
            nameUsage: function () {
                this.updateData()
            }
        },
        methods: {
            updateData: function () {
                let id = 0;
                for (let i = 0; i < this.nameUsage.length ; i++) {
                    if (this.nameUsage[i].name == this.name && this.nameUsage[i].sexe == this.gender) {
                        id = i;
                    }
                }
                this.series = this.valueline(this.nameUsage[id].series.slice(0, this.nameUsage[id].series.length - 1))
            }
        }
    }
</script>

<style scoped>
    .line {
        fill: none;
        stroke: steelblue;
        stroke-width: 1.5;
    }
    .date {
        fill: #cccccc;
    }
</style>