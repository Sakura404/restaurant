<template>
  <v-container>
    <v-data-table
      hide-default-footer
      dense
      :headers="headers"
      :items="foodmenu"
    >
      <template v-slot:[`item.quantity`]="{ item }">
        <v-btn @click="quantityreduce(item)" icon>
          <v-icon>mdi-minus</v-icon></v-btn
        >
        {{ item.quantity }}
        <v-btn @click="quantityadd(item)" icon>
          <v-icon>mdi-plus</v-icon></v-btn
        >
      </template>
      <template v-slot:[`item.total`]="{ item }">
        {{ item.quantity * item.cost }}
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Order</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
        </v-toolbar>
      </template>
      <template v-slot:footer>
        <v-divider />
        <v-row flat>
          <v-col></v-col>
          <v-spacer></v-spacer>
          <v-col ><h3>total cost:{{ total }}￥</h3></v-col>
        </v-row>
        <v-row
          ><v-col></v-col> <v-spacer></v-spacer
          ><v-col cols="6"><v-btn text color="primary" width="70%">submit</v-btn></v-col
          ><v-spacer></v-spacer><v-col></v-col
        ></v-row>
      </template>
    </v-data-table>
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
          text: "cost(￥)",
          value: "cost",
        },
        {
          text: "quantity",
          value: "quantity",
          sortable: false,
          align: "center",
        },
        {
          text: "total(￥)",
          value: "total",
        },
      ],
      foodmenu: [],
    };
  },
  computed: {
    total() {
      var t = 0;
      for (var a of this.foodmenu) {
        t += a.quantity * a.cost;
      }
      return t;
    },
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
      var index = this.foodmenu.indexOf(item);
      item.quantity++;
      this.foodmenu.splice(index, 1, item);
    },
    quantityreduce(item) {
      if (item.quantity - 1 >= 0) {
        var index = this.foodmenu.indexOf(item);
        item.quantity--;
        this.foodmenu.splice(index, 1, item);
      }
    },
  },
  mounted() {
    this.foodget();
  },
};
</script>