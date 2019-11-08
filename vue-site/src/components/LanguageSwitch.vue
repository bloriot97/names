<template>
    <div>
        <button type="button" v-on:click="switchLocale()">
            <span v-if="selectedLanguage === 'en'">FR</span>
            <span v-else>EN</span>
        </button>
    </div>
</template>

<script>
    import i18n from '@/plugins/i18n';
    export default {
        name: "LanguageSwitch",
        data() {
            return {
                selectedLanguage: 'en'
            }
        },
        methods: {
            switchLocale() {
                if (this.selectedLanguage === 'en') {
                    this.selectedLanguage = 'fr'
                } else {
                    this.selectedLanguage = 'en';
                }
                i18n.locale = this.selectedLanguage
            }
        }
    }
</script>

<style scoped>
    button{
        margin: 2px;
        padding: 10px 15px;
        font-size: 1em;
        background-color: #FFFFFF00;
        color: #FFFFFF;
        border-radius: 4px;
        border: 1px solid #FFFFFF00;
    }
</style>