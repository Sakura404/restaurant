<template>
  <v-container>
    <v-dialog color="danger" max-width="400px" v-model="dialogdelete">
      <v-card>
        <v-card-title>警告</v-card-title>
        <v-card-text>确定要删除该菜品么</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="ediorcancel()" depressed>取消</v-btn>
          <v-btn @click="delectsumbit()" depressed>确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="400px" v-model="dialogedior">
      <v-card>
        <v-card-title>修改</v-card-title>
        <v-card-text>
          <v-row>
            <v-col md="4"
              ><v-text-field label="id" v-model="newitem.id"></v-text-field
            ></v-col>
            <v-col md="4"
              ><v-text-field label="name" v-model="newitem.name"></v-text-field
            ></v-col>
            <v-col md="4">
              <v-text-field label="cost" v-model="newitem.cost"></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col md="3">
              <v-btn @click="ediorcancel()" depressed>取消</v-btn>
            </v-col>
            <v-col md="3">
              <v-btn @click="ediorsumbit()" depressed>确认</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-data-table :headers="headers" :items="foodmenu">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Menu</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          {{ newitem }}<v-spacer></v-spacer>
          <v-icon>mdi-refresh</v-icon>
        </v-toolbar>
      </template>
      <template v-slot:[`item.opreation`]="{ item }">
        <v-btn icon>
          <v-icon @click="edior(item)">mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn icon @click="delect(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      newitem: {
        id: null,
        name: null,
        cost: null,
      },
      editoritem: null,
      dialogedior: null,
      dialogdelete: null,
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
          text: "opreation",
          value: "opreation",
          sortable: false,
          align: "center",
        },
      ],
      foodmenu: [
        {
          id: 1,
          name: "beef",
          cost: 20,
        },
        {
          id: 2,
          name: "rice",
          cost: 10,
        },
      ],
    };
  },
  methods: {
    edior(item) {
      this.editoritem = this.foodmenu.indexOf(item);
      this.newitem.id = item.id;
      this.newitem.name = item.name;
      this.newitem.cost = item.cost;
      this.dialogedior = true;
    },
    ediorsumbit() {
      this.foodmenu[this.editoritem].id = this.newitem.id;
      this.foodmenu[this.editoritem].name = this.newitem.name;
      this.foodmenu[this.editoritem].cost = this.newitem.cost;
    },
    delect(item) {
      this.editoritem = this.foodmenu.indexOf(item);
      this.dialogdelete = true;
    },
    delectsumbit() {
      this.foodmenu.splice(this.editoritem, 1);
      this.dialogdelete = false;
      //发生删除请求到后端
      //this.updata()
      this.editoritem = null;
    },
    ediorcancel() {
      this.dialogdelete = false;
      this.editoritem = null;
    },
  },
};
</script>