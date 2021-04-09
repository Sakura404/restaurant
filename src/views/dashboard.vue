<template>
  <v-container>
    <v-row>
      <v-col lg="6" cols="12">
        <v-card>
          <v-sheet
            class="mx-auto"
            elevation="12"
            max-width="calc(100% - 32px)"
            color="cyan"
          >
            <v-sparkline
              auto-draw
              color="white"
              line-width="2"
              padding="16"
              smooth="10"
              :labels="day()"
              :value="daysale"
            >
            </v-sparkline>
          </v-sheet>
          <v-card-text>近30天每天的营业收入</v-card-text>
        </v-card>
      </v-col>
      <v-col lg="3" cols="6">
        <v-card>
          <v-card-title>今天营业收入</v-card-title>
          <v-sheet
            color="cyan"
            class="d-flex align-center justify-center pa-4 mx-auto"
            min-height="100px"
          >
            <div class="display-1">550</div></v-sheet
          >
        </v-card> </v-col
      ><v-col lg="3" cols="6">
        <v-card>
          <v-card-title>今月营业收入</v-card-title>
          <v-sheet
            color="cyan"
            class="d-flex align-center justify-center pa-4 mx-auto"
            min-height="100px"
          >
            <div class="display-1">550</div></v-sheet
          >
        </v-card>
      </v-col>
      {{ day() }}
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      daysale: [10, 20, 12, 24, 17, 45, 73, 30, 41],
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
  },
};
</script>
