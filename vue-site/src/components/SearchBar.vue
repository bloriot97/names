<template>
    <div style="text-align: center">
        <div class="input_wrapper">
            <input
                type="text"
                name="search"
                v-model="name"
                :placeholder="$t('search')"
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
                        {{d.name}} ({{d.gender == 1 ? 'M' : 'F'}})
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
                this.suggestions = suggestions.slice(0, 50);
            },
        },
        methods: {
            hideSuggestions() {
                setTimeout(function(){ this.displaySuggestions = false }.bind(this), 300)
            },
            selectName(name, gender){
                this.name = name
                this.gender = gender
                this.$emit('select', {name_index: name, sexe_index: gender})
            }
        }
    }
</script>

<style scoped>
    .input_wrapper {
        width: 100%;
        text-align: center;
    }
    input[type=text] {
        width: 400px;
        -webkit-transition: width 0.4s ease-in-out;
        transition: width 0.4s ease-in-out;
        padding: 15px;
        text-align: center;
        background-color: #ffffff;
        color: #2c3e50;
        border: 0;
        border-bottom: 2px solid #182431;
    }

    /* When the input field gets focus, change its width to 100% */
    input[type=text]:focus {

    }

    .name_dropdown {
        width: 430px;
        left: 50%;
        margin-left: -215px;
        display: block;
        position: absolute;
        max-height: 300px;
        overflow: scroll;
        color: #2c3e50;
    }
    .name_dropdown > ul {
        padding: 0;
        list-style-type: none;
        background-color: #ffffffee;
        width: 100%;
        margin: 0;
    }
    .name_dropdown > ul > li {
        background-color: #ffffffee;
        padding: 5px 0;
    }
    .name_dropdown > ul > li:hover {
        background-color: rgba(249, 249, 249, 0.93);
    }
</style>