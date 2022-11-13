<template>
  <el-card class="box-card" id="charging card">
  <el-form :model="user" status-icon label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="pass">
      <el-input v-model="user.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="checkPass">
      <el-input  v-model="user.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="age">
      <el-input type="password" v-model.number="user.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="checkForm">提交</el-button>
    </el-form-item>
  </el-form>
  </el-card>
</template>

<script>
export default {
  name: "UserLogin",
  data: function () {
    return {
      user: {
        // the email from the input is bound to this property, they are always going to be the same
        name: "",
        email: "",
        password: ""
      },
      errors: [],
      errorMessage: ""
    };
  },
  methods: {
    // this method uses an if statement to determin if the data entered in the form is valid, and if there are errors pushes them to the errors array where they will be displayed by the template
    async checkForm() {
      this.errors = [];
      if (!this.user.email) {
        this.errors.push("Email required");
        this.errorMessage = "Please enter an email address";
      }
      // if no errors then log the user in
      if (!this.errors.length) {
        await this.loginUser(this.user);
      }
    },
    // this method logs in the user by sending a post request to the api, which responds with the user whose email is submitted if valid
    // variables in localStorage are set that store the user id, email, and the current state of being logged in
    async loginUser(user) {
      const res = await fetch('api/users');
      const data = await res.json();
      var found = false;
      for (const dataKey in data) {
        //console.log(data[dataKey])
        if (data[dataKey].email === user.email) {
          if (data[dataKey].password === user.password) {
            this.user.name = data[dataKey].name;
            this.user.id = data[dataKey].id;
            this.loginSuccess();
          } else {
            alert("wrong password");
          }
          found = true;
          break;
        }
      }
      if (!found) {
        alert("user not found");
      }
    },
    loginSuccess() {
      console.log("login success")
      localStorage.loggedIn = "yes";
      localStorage.name = this.user.name;
      localStorage.email = this.user.email;
      localStorage.id = this.user.id;
      this.$emit('login');
      if (this.$route.path === "/userlogin") {
        this.$router.push({path: "/userinfo"});
      }

    }
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>