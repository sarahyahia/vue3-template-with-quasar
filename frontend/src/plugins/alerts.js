import i18n from "@/plugins/i18n";
export default {
    install(Vue) {
        Vue.prototype.$alerts = {
            toast: {
                success: (message,locale=localStorage.locale) => {
                    Vue.$toast.clear();
                    Vue.$toast.success(message, {
                        position: locale === 'ar'
                            ? 'bottom-right' : 'bottom-left',
                        duration: 6000
                    })
                },
                error: (message,locale=localStorage.locale) => {
                    Vue.$toast.clear();
                    Vue.$toast.error(message, {
                        position: locale === 'ar'
                        ? 'bottom-right' : 'bottom-left',
                        duration: 6000,
                        pauseOnHover: true
                    })
                },
                warning: (message,locale=localStorage.locale) => {
                    Vue.$toast.clear();
                    Vue.$toast.warning(message, {
                        position: locale === 'ar'
                            ? 'bottom-right' : 'bottom-left',
                        duration: 6000
                    })
                },
                info: (message,locale=localStorage.locale) => {
                    Vue.$toast.clear();
                    Vue.$toast.info(message, {
                        position: locale === 'ar'
                            ? 'bottom-right' : 'bottom-left',
                        duration: 6000
                    })
                },
            },
            swal: {
                success: (message,locale=localStorage.locale) =>
                    Vue.swal({
                        title: message,
                        icon: 'success',
                        showConfirmButton: true,
                        showCancelButton: false,
                        confirmButtonColor: '#ff5252',
                        confirmButtonText: i18n.tc('PROJECT.CLOSE'),
                        timer: 2500,
                        reverseButtons: locale === 'ar'
                    }),
                error: (message,locale=localStorage.locale) =>
                    Vue.swal({
                        title: message,
                        icon: 'error',
                        showConfirmButton: true,
                        showCancelButton: false,
                        confirmButtonColor: '#ff5252',
                        confirmButtonText: i18n.tc('PROJECT.CLOSE'),
                        reverseButtons: locale === 'ar'
                    }),
                warning: (message, confirm_button,locale=localStorage.locale) =>
                    Vue.swal({
                        title: message,
                        icon: 'warning',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonColor: '#144265',
                        cancelButtonColor: '#ff5252',
                        confirmButtonText: confirm_button,
                        cancelButtonText: i18n.tc('PROJECT.CLOSE'),
                        reverseButtons: locale === 'ar'
                    }),
            },
        }
    }
}
