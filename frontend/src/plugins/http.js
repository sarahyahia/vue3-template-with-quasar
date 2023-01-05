import Axios from "axios";
import store from "@/store/index";
import i18n from "@/plugins/i18n";
import router from "@/router/index";
import moment from "moment";

const isAuthenticated = () => {
    const token = localStorage.token;
    const expiresAt = localStorage.expiresAt;

    return !!token && expiresAt > moment.utc().valueOf();
}

export default {
    install(Vue) {
        Axios.defaults.withCredentials = true;

        let loader = null;
        Axios.interceptors.request.use(
            config => {
                if (loader) {
                    loader.opacity = 0;
                    loader.zIndex = -1;
                    loader.hide();
                }

                loader = Vue.$loading.show({
                    color: '#235273',
                    backgroundColor: '#ffffff',
                    width: 64, height: 64, zIndex: 99,
                });
                config.headers["Authorization"] = localStorage.token;
                config.headers["Accept-Language"] = localStorage.locale;
                config.headers["Logged-User"] = localStorage.loggedIn;
                config.headers["Session-ID"] = localStorage.SessionId;
                try {
                    let scope = JSON.parse(localStorage.scope);
                    config.headers["Scope"] = scope.id;
                } catch (e) {
                    /* Pass */
                }
                // config.headers["xsrfCookieName"] = 'XSRF-TOKEN';
                // config.headers["xsrfHeaderName"] = 'X-XSRF-TOKEN';

                return config;
            },
            error => {
                if (loader) {
                    loader.opacity = 0;
                    loader.zIndex = -1;
                    loader.hide();
                }

                Vue.$toast.error(i18n.tc('SERVER_ERROR_MSG'), {
                    position: localStorage.locale === 'ar'
                        ? 'bottom-left' : 'bottom-right',
                    duration: 6000
                });

                return Promise.reject(error);
            }
        );

        Axios.interceptors.response.use(
            res => {
                if (loader) {
                    loader.opacity = 0;
                    loader.zIndex = -1;
                    loader.hide();
                }

                if (res.data.token) {
                    store.dispatch("refreshToken", {
                        token: res.data.token
                    }).then(r => r);
                }

                return res;
            },
            errors => {
                if (loader) {
                    loader.opacity = 0;
                    loader.zIndex = -1;
                    loader.hide()
                }


                if (errors.response.status === 401) {
                    Vue.$toast.error(i18n.tc('SESSION_TIMEOUT'), {
                        position: localStorage.locale === 'ar'
                            ? 'bottom-left' : 'bottom-right',
                        duration: 6000
                    });
                    store.dispatch('logout').then(() => {
                        router.push({
                            name: 'Login',
                            /*query: {redirect: to.fullPath}*/
                        }).then(r => r)
                    });
                }

                if (errors.response.status === 403) {
                    Vue.$toast.error("PERMISSION_ERROR_MSG", {
                        position: localStorage.locale === 'ar'
                            ? 'bottom-left' : 'bottom-right',
                        duration: 6000
                    });
                    Vue.$router.push({name: 'Dashboard'})
                }

                if (errors.response.status === 500) {
                    let route = router.currentRoute;
                    if (route.matched.some(record => record.meta.requiresAuth)) {
                        if (!isAuthenticated()) {
                            Vue.$toast.error(i18n.tc('SESSION_TIMEOUT'), {
                                position: localStorage.locale === 'ar'
                                    ? 'bottom-left' : 'bottom-right',
                                duration: 6000
                            });
                            store.dispatch('logout').then(() => {
                                router.push({
                                    name: 'Login',
                                    /*query: {redirect: to.fullPath}*/
                                }).then(r => r)
                            });

                            return Promise.reject(errors);
                        }
                    }

                    /*
                        Vue.$toast.error(i18n.tc('SERVER_ERROR_MSG'), {
                            position: localStorage.locale === 'ar'
                                ? 'bottom-left' : 'bottom-right',
                            duration: 6000
                        });
                    */
                }

                return Promise.reject(errors);
            }
        );

        Vue.prototype.$http = Axios
    }
}
