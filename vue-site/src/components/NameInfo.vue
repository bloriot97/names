<template>
    <div>
        <div>
            <span class="info_title">Name : </span> {{information.name}}
        </div>
        <div>
            <span class="info_title">Max : </span> {{information.max}} (in {{information.idxmax}})
        </div>
    </div>
</template>

<script>
    export default {
        name: "NameInfo",
        props: {
            information: Object
        }
    }
</script>

<style scoped>
    .info_title {
        font-weight: bold;
    }
</style>