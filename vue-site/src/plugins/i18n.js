import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);


const messages = {
    en: {
        info: {
            title: 'What do i see here?',
            content: [
                `Here you can see a visualisation of the trend for french names from 1900 until 2017.`,
                `The closer two dots are on the visualisation the more similar their trend are (t-SNE). The size depends on the total number of babies who received the names. `,
                `For clarity I removed the names given less that 1000 times, so don't panic if you don't see your names, it means you are special 🙃.`,
            ]
        },
        nameInformation: `Name information`,
        name: 'Name',
        max: 'Max',
        neighbours: 'Neighbours',
        search: 'Search...',
    },
    fr: {
        info: {
            title: `Qu'est-ce que je vois ?`,
            content: [
                `Vous voyez une visualisation de la mode des prénoms de 1900 à 2017.`,
                `Deux points sont proches s'ils ont suivi une mode similaire (t-SNE). La taille dépend du nombre total d'enfants qui ont reçu le prénom.`,
                `Pour rendre la visualisation plus claire, j'ai supprimé les prénoms donnés moins de 1000 fois. Si vous ne trouvez pas votre prénom pas de panique, c'est que vous êtes spécial.`,
            ]
        },
        nameInformation: `Information du prénom`,
        name: 'Prénom',
        neighbours: 'Voisins',
        search: 'Chercher...',
    }
};

// eslint-disable-next-line
export default new VueI18n({
    locale: 'en', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
});