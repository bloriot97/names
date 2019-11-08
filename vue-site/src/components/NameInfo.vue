<template>
    <div>
        <div>
            <span class="info_title">{{$t('name')}} : </span> {{information.name}}
        </div>
        <div>
            <span class="info_title">{{$t('max')}} : </span> {{information.max}} (in {{information.idmax}})
        </div>
        <div>
            <span class="info_title">{{$t('neighbours')}} : </span>
            <ul>
                <li v-for="(neighbour, i) in neighbours" v-bind:key="i">
                    {{neighbour.name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NameInfo",
        props: {
            information: Object,
            neighbours: Array
        }
    }
</script>

<style scoped>
    .info_title {
        font-weight: bold;
    }
</style>