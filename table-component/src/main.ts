import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { createProvider } from "./vue-apollo";
import { ApolloClient } from "apollo-client";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { InMemoryCache } from "apollo-cache-inmemory";

type VueApolloClient = ApolloClient<InMemoryCache> & {
  wsClient: SubscriptionClient;
};

Vue.config.productionTip = false;
console.log(createProvider());
new Vue({
  router,
  store,
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
