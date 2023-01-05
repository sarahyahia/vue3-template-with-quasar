export default {
    install(Vue) {
        Vue.prototype.$loader = {
            loader: null,
            show: () => {
                this.loader = Vue.$loading.show({
                    color: '#235273',
                    backgroundColor: '#ffffff',
                    width: 64, height: 64, zIndex: 99,
                });

                return this.loader;
            },
            hide: () => this.loader.hide()
        }
    }
}
