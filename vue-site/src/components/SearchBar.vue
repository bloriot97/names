<template>
    <div style="text-align: center">
        <div class="input_wrapper">
            <input
                    type="text"
                    name="search"
                    v-model="name"
                    placeholder="Search..."
                    v-on:focus="displaySuggestions = true"
                    v-on:focusout="hideSuggestions"
            >
            <div class="name_dropdown" v-if="displaySuggestions">
                <ul>
                    <li
                        v-for='d in suggestions'
                        v-bind:key='d.name + d.gender'
                        v-on:click="selectName(d.name, d.gender)"
                    >
                        {{d.name}} ({{d.gender}})
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SearchBar",
        props: {
            names: Array,
        },
        data() {
            return {
                suggestions: [],
                name: '',
                gender: null,
                displaySuggestions: false
            }
        },
        watch: {
            name: function () {
                let suggestions = []
                let lowerName = this.name.toLowerCase()
                for (let i = 0; i < this.names.length; i++) {
                    if (this.names[i].name_index.toLowerCase().startsWith(lowerName)) {
                        suggestions.push({'name': this.names[i].name_index, 'gender': this.names[i].sexe_index})
                    }
                }
                this.suggestions = suggestions.slice(0, 9);
            },
        },
        methods: {
            hideSuggestions() {
                setTimeout(function(){ this.displaySuggestions = false }.bind(this), 100)
            },
            selectName(name, gender){
                this.name = name
                this.gender = gender
            }
        }
    }
</script>

<style scoped>
    .input_wrapper {
        width: 100%;
        text-align: center;
        margin-bottom: 2em;
    }
    input[type=text] {
        width: 400px;
        -webkit-transition: width 0.4s ease-in-out;
        transition: width 0.4s ease-in-out;
        padding: 15px;
        text-align: center;
    }

    /* When the input field gets focus, change its width to 100% */
    input[type=text]:focus {

    }

    .name_dropdown {
        width: 436px;
        left: 50%;
        margin-left: -218px;
        display: block;
        position: absolute;
    }
    .name_dropdown > ul {
        padding: 0;
        list-style-type: none;
        background-color: #FFFFFFBB;
        width: 100%;
        margin: 0;
    }
    .name_dropdown > ul > li {
        background-color: #FFFFFFBB;
        padding: 5px 0;
    }
    .name_dropdown > ul > li:hover {
        background-color: #EEEEEEBB;
    }
</style>