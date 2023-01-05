import { createI18n } from 'vue-i18n'
// import messages from "@intlify/unplugin-vue-i18n/messages";
import en from '@/locales/en'
import ar from '@/locales/ar'


const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  // allowComposition: true, // you need to specify that!
  fallbackLocale: "en",
  availableLocales: ["en", "ar"],
  messages:{en, ar},
});

export default i18n