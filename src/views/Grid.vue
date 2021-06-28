<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 p-2" v-for="item in users" :key="item.id">
        <div  class="shadow card">
          <div class="card-body">
            <h4 class="card-title text-center">User {{ item.id }}</h4>
            <hr />
            <strong>First Name:</strong>
            {{ item.first_name }}
            <br />
            <strong>Last Name:</strong>
            {{ item.last_name }}
            <br />
            <strong>Email:</strong>
            {{ item.email }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      users: null,
    }
  },
  created() {
    axios.get('https://reqres.in/api/users').then(({ data }) => {
      this.users = data.data
    })
  },
}
</script>

<style scoped>
/* .container {
  padding-top: 100px;
  min-height: 100vh;
} */
</style>
