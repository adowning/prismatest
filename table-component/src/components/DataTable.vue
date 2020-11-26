<template>
  <v-container grid-list>
    <!-- Post Cards -->
    <v-item-group>
      <v-layout row v-if="publishedWorkorders">
        <v-flex v-for="order in publishedWorkorders.edges" :key="order.node.id">
          <v-item v-slot="{ active, toggle }">
            <v-card hover :color="active ? 'primary' : ''" @click="toggle">
              <!-- <v-img
            @click.native="goToPost(order.id)"
            :src="order.imageUrl"
            height="30vh"
            lazy
          ></v-img> -->
              <v-card-actions>
                <v-card-title primary>
                  <div>
                    <div class="headline">{{ order.node.accountName }}</div>
                    <div class="grey--text">
                      {{ order.node.callList ? order.node.callList.length : 0 }}
                      calls
                    </div>
                  </div>
                </v-card-title>
                <v-spacer></v-spacer>
                <v-btn @click="showPostCreator = !showPostCreator" icon>
                  <v-icon>{{
                    `${
                      showPostCreator
                        ? "mdi-eye-off-outline"
                        : "mdi-eye-outline"
                    }`
                  }}</v-icon>
                </v-btn>
              </v-card-actions>
              <!-- Post Creator Tile -->
              <v-slide-y-transition>
                <v-card-text v-show="showPostCreator" class="grey lighten-4">
                  <v-list-item>
                    <v-list-item-avatar>
                      <!-- <img :src="order.createdBy" /> -->
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="text--primary">{{
                        order.node.createdBy
                      }}</v-list-item-title>
                      <v-list-item-subtitle class="font-weight-thin"
                        >Added
                        {{
                          formatCreatedDate(order.node.createdAt)
                        }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon ripple>
                        <v-icon color="grey lighten-1">info</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-card-text>
              </v-slide-y-transition>
            </v-card>
          </v-item>
        </v-flex>
      </v-layout>
    </v-item-group>
    <v-layout v-if="showMoreEnabled" column>
      <v-flex v-intersect="onIntersect" xs12>
        <v-layout justify-center row>
          <v-btn color="info" @click="showMorePosts">Fetch More</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";
import { INFINITE_SCROLL_POSTS } from "../utils/queries";
const pageSize = 20;
export default {
  name: "Posts",
  data() {
    return {
      pageNum: 1,
      showPostCreator: false,
      isIntersecting: false
    };
  },
  apollo: {
    publishedWorkorders: {
      query: INFINITE_SCROLL_POSTS,
      variables: {
        pageNum: 20,
        pageSize
      }
    }
  },
  computed: {
    showMoreEnabled() {
      return (
        this.publishedWorkorders &&
        this.publishedWorkorders.pageInfo.hasNextPage
      );
    }
  },
  methods: {
    onIntersect(entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      this.isIntersecting = entries[0].isIntersecting;
      console.log(this.isIntersecting);
      this.showMorePosts();
    },
    showMorePosts() {
      this.pageNum += 20;
      this.$apollo.queries.publishedWorkorders.fetchMore({
        variables: {
          pageNum: this.pageNum,
          pageSize
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          console.log(fetchMoreResult);
          const newOrders = fetchMoreResult.publishedWorkorders.edges;
          const hasMore =
            fetchMoreResult.publishedWorkorders.pageInfo.hasNextPage;
          return {
            publishedWorkorders: {
              __typename: prevResult.publishedWorkorders.__typename,
              edges: [...prevResult.publishedWorkorders.edges, ...newOrders],
              hasMore
            }
          };
        }
      });
    },
    goToPost(postId) {
      this.$router.push(`/posts/${postId}`);
    },
    formatCreatedDate(date) {
      return moment(new Date(date)).format("ll");
    }
  }
};
</script>
