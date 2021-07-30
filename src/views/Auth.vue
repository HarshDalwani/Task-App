<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="card shadow">
            <h2 class="card-title text-center">
              Register User
            </h2>
            <div class="card-body py-md-4">
              <div class="form-group">
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Email"
                />
              </div>

              <div class="form-group">
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div
                class="d-flex flex-row align-items-center justify-content-between"
              >
                <button @click="signUpUser" class="btn btn-primary">
                  Create Account
                </button>
                <button @click="logInUser" class="btn btn-info">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async apiCall(path) {
      try {
        const { data } = await axios.post(
          `${process.env.VUE_APP_API_URL}${path}`,
          {
            email: this.email,
            password: this.password,
          }
        );
        return { data: data, error: false };
      } catch (error) {
        alert(error.response.data.message);
        return { error: true };
      }
    },
    async signUpUser() {
      if (this.areFieldsEmpty) {
        alert("Please provide email and password");
        return;
      }
      const { data, error } = await this.apiCall("auth/signup");
      if (!error) alert(data.message);
      this.email = null;
      this.password = null;
    },
    async logInUser() {
      if (this.areFieldsEmpty) {
        alert("Please provide email and password");
        return;
      }
      const { data, error } = await this.apiCall("auth/signin");
      if (!error) {
        this.$store.commit("SETUSER", data);
        this.$router.push("/tasks");
      }
    },
  },
  computed: {
    areFieldsEmpty() {
      return this.email == null && this.password == null;
    },
  },
};
</script>

<style scoped>

h2 {
  padding-top: 1.5rem;
}
a {
  color: #333;
}
a:hover {
  color: #da5767;
  text-decoration: none;
}
.card {
  /* border: 0.4rem solid #f8f9fa; */
  top: 20%;
}
.form-control {
  background-color: #f8f9fa;
  padding: 15px 15px;
  margin-bottom: 1.3rem;
}

.form-control:focus {
  color: #000000;
  background-color: #ffffff;
  border: 3px solid #da5767;
  outline: 0;
  box-shadow: none;
}
</style>
