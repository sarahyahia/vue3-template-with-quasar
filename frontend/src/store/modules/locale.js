import i18n from "@/plugins/i18n";
import { defineStore } from 'pinia';

export const useLocaleStore = defineStore({
    id: 'locale',
    state: () => ({
        locale: localStorage.getItem('locale') || 'en',
    }),
    actions: {
        changeLocale({commit}, locale) {
            localStorage.setItem('locale', locale);
            commit('updateLocale', locale);
            document.title = i18n.t('title')
        },
    },
    mutations: {
        updateLocale(state, locale) {
            state.locale = locale;
        },
    },
    getters: {
        localeGetter: state => state.locale,
    }
});
