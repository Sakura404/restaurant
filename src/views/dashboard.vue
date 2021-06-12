<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-sheet
                class="mx-auto"
                elevation="12"
                max-width="calc(100% - 32px)"
                color="cyan"
              >
                <v-sparkline
                  show-labels
                  auto-draw
                  color="white"
                  line-width="2"
                  padding="16"
                  smooth="10"
                  :value="daysale"
                >
                </v-sparkline>
              </v-sheet>
              <v-card-text>近10天每天的营业收入</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card :loading="loading">
              <v-card-title>sales</v-card-title>
              <v-card-text>
                <v-row max-width="400px">
                  <v-col>id</v-col>
                  <v-col>name</v-col>
                  <v-col>sales</v-col>
                </v-row>
                <v-row max-width="400px" v-for="(item, i) in foodsale" :key="i">
                  <v-col>{{ item.id }}</v-col>
                  <v-col>{{ item.name }}</v-col>
                  <v-col>{{ item.sales }}</v-col>
                </v-row>
                <v-row max-width="400px">
                  <v-col></v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
          <v-expansion-panels>
              <v-expansion-panel>
                  <v-expansion-panel-header>2</v-expansion-panel-header>
                    <v-expansion-panel-content>1</v-expansion-panel-content>
              </v-expansion-panel>
          </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      daysale: [10, 20, 12, 24, 17, 45, 73, 30, 41],
      foodsale: [],
      loading: true,
    };
  },
  methods: {
    addsale() {
      this.daysale.push(20);
    },
    day() {
      var x = new Array();
      for (var i = 0; i < this.daysale.length && i < 30; i++) {
        x.push(i + 1);
      }
      return x;
    },
    getsale() {
      this.loading = true;
      this.axios
        .get("api/salesget")
        .then((res) => {
          this.foodsale = res.data;
          this.loading = false;
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {
    this.getsale();
  },
};
</script>
