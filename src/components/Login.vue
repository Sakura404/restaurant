<template>
  <v-app>
    <v-container app
      ><v-row justify="center"
        ><v-col class="x" cols="12" sm="4"
          ><v-card outlined app
            ><v-img
              height="250"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>
            <v-card-title>管理员登录</v-card-title>
            <v-card-text>
              <v-form ref="login">
                <v-text-field
                  v-model="user"
                  prepend-icon="mdi-account"
                  placeholder="输入你的用户名"
                  label="用户名"
                  clearable
                  :rules="namerules"
                ></v-text-field>
                <v-text-field
                  v-model="psw"
                  type="password"
                  prepend-icon="mdi-lock"
                  placeholder="输入你的密码"
                  label="密码"
                  :rules="pswrules"
                ></v-text-field> </v-form
              ><v-divider></v-divider>
              <v-card-actions>
                <v-spacer
                  ><v-btn @click="submit()" text color="primary" width="70%"
                    >登录</v-btn
                  ></v-spacer
                >
              </v-card-actions>
              {{ loginmeg }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import Qs from "qs";
export default {
  name: "Login",
  data() {
    return {
      loginmeg: null,
      psw: null,
      user: null,
      namerules: [(v) => !!v || "名字不能为空"],
      pswrules: [(v) => !!v || "密码不能为空"],
    };
  },
  methods: {
    // submit() {
    //   if (this.psw == 123456 && this.user == 123456) {
    //     sessionStorage.setItem("userId", this.user);
    //     alert("登陆成功");
    //     if (this.$route.query.redirect) {
    //       this.$router.push(this.$route.query.redirect);
    //     } else {
    //       this.$router.push("/");
    //     }
    //   } else {
    //     alert("登陆失败");
    //   }
    // },
    submit() {
      if (this.$refs.login.validate()) this.login();
    },
    login() {
      let data = {
        username: this.user,
        password: this.psw,
      };
      this.axios
        .post("api/login", Qs.stringify(data))
        .then((res) => {
          console.log(res);
          if (res.data.code == 1) {
            sessionStorage.setItem("userId", this.user);
            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect);
            } else {
              this.$router.push("/");
            }
          }
          this.loginmeg = res.data.meg;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
