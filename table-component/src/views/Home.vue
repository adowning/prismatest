<template>
  <div class="home">
    <DataTable source="blog_Account" :fields="fields" />
  </div>
</template>

<script>
// @ is an alias to /src
import DataTable from "@/components/DataTable.vue";

export default {
  name: "Home",
  components: {
    DataTable
  },
  data() {
    return {
      fields: ["accountName"]
    };
  }
};
</script>
