<template>
  <v-container>
    <v-data-table :headers="headers" :items="foodmenu">
      <template v-slot:[`item.quantity`]="{ item }">
        <v-btn icon>
          <v-icon @click="quantityreduce(item)">mdi-arrow-left</v-icon></v-btn
        >
        {{ item.quantity }}
        <v-btn icon>
          <v-icon @click="quantityadd(item)">mdi-arrow-right</v-icon></v-btn
        >
      </template>
      
    </v-data-table>
    {{foodmenu}}
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "id",
          value: "id",
          sortable: false,
        },
        {
          text: "name",
          value: "name",
        },
        {
          text: "quantity",
          value: "quantity",
          sortable: false,
        },
        {
          text: "cost(￥)",
          value: "costs",
        },
      ],
      foodmenu: [],
    };
  },
  methods: {
    foodget() {
      this.axios
        .get("/api/food")
        .then((res) => {
          this.foodmenu = res.data;
          this.foodmenu.forEach((value) => {
            value["quantity"] = 0;
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    quantityadd(item) {
       var index= this.foodmenu.indexOf(item)
     console.log(index)
     this.foodmenu[index].quantity++
     console.log(this.foodmenu)
    },
    quantityreduce(item) {
      if (item.quantity - 1 >= 0) item.quantity--;
    },
  },
  mounted() {
    this.foodget();
  },
};
</script>