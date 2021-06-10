<template>
  <v-container>
    <v-dialog max-width="400px" v-model="submitdialog">
      <v-card>
        <v-card-title>bill</v-card-title>
        <v-card-text>
          <v-row max-width="400px">
            <v-col>name</v-col>
            <v-col>quantity</v-col>
          </v-row>
          <v-row max-width="400px" v-for="(bill_item, i) in bill" :key="i">
            <v-col>{{ bill_item.name }}</v-col>
            <v-col>{{ bill_item.quantity }}</v-col>
          </v-row>
          <v-row max-width="400px">
            <v-col>
              <h3>
                total cost:<v-chip outlined small>{{ total }}￥</v-chip>
              </h3>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer>
            <v-btn color="primary" class="mx-1" @click="cancel()"
              >cancel
            </v-btn>
            <v-btn color="primary" class="mx-1" @click="billsubmit()"
              >submit</v-btn
            >
          </v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      hide-default-footer
      dense
      :loading="loading"
      :loading-text="loadingmeg"
      :headers="headers"
      :items="foodmenu"
    >
      <template v-slot:[`item.quantity`]="{ item }">
        <v-btn @click="quantityreduce(item)" icon>
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        {{ item.quantity }}
        <v-btn @click="quantityadd(item)" icon>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
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
          <v-col>
            <h3>
              total cost:<v-chip outlined small>{{ total }}￥</v-chip>
            </h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
          <v-spacer></v-spacer>
          <v-col cols="6">
            <v-btn @click="submit" :disabled="billdisable" outlined width="70%"
              >submit</v-btn
            >
          </v-col>
          <v-spacer></v-spacer>
          <v-col></v-col>
        </v-row>
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
      submitdialog: false,
      loading: true,
      loadingmeg: "正在获取数据中请稍等",
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
    bill() {
      var billarr = new Array();
      for (var a of this.foodmenu) {
        if (a.quantity != 0) billarr.push(a);
      }
      return billarr;
    },
    billdisable() {
      if (this.bill.length == 0) return true;
      else return false;
    },
  },
  methods: {
    submit() {
      this.submitdialog = true;
    },
    cancel() {
      this.submitdialog = false;
    },
    billsubmit() {
      this.submitdialog = false;
      let data = this.bill;
      console.log(data);
      this.axios
        .post("/api/ordersubmit", data)
        .then((res) => {
          this.foodget();
          alert("submit success");
          console.log(res.data.meg);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    foodget() {
      this.loading = true;
      this.axios
        .get("/api/food")
        .then((res) => {
          this.loading = false;
          this.foodmenu = res.data;
          this.foodmenu.forEach((value) => {
            value["quantity"] = 0;
          });
        })
        .catch((err) => {
          this.loading = false;
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