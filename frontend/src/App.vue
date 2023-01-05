<template>
  <q-layout view="lHh Lpr lFf">
    <div>{{$t('title')}}</div>
    <div>{{$i18n.locale}}</div>
    <router-view/>
  </q-layout>
</template>

<script>
import {ref} from 'vue'
import { useLocaleStore } from "@/store/modules/locale";
import { storeToRefs } from "pinia";

export default {
  name: 'LayoutDefault',
  components: {
  },
  setup () {
    const store = useLocaleStore();
    // storeToRefs lets todoList keep reactivity:
    const { locale } = storeToRefs(store);
    console.log(locale.value)

    return {
      locale,
    }
  }
}
</script>
