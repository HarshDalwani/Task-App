<template>
  <div class="table_wrapper">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Sr.No</th>
          <th scope="col">Task</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in taskData" :key="item._id">
          <th scope="row">{{ i + 1 }}</th>
          <td>
            <span v-if="!edit" @click="(edit = !edit), (index = i)">
              {{ item.text }}
            </span>
            <span v-else>
              <span v-if="index == i">
                <input
                  :id="item._id"
                  v-model="item.text"
                  class=""
                  type="text"
                  name=""
                />
                <button class="btn btn-sm" @click="edit = false">Close</button>
              </span>
            </span>
          </td>
          <td>
            <span v-if="item.status == 'pending'" class="badge bg-secondary"
              >Pending</span
            ><span v-else-if="item.status == 'ongoing'" class="badge bg-info"
              >OnGoing</span
            >
            <span v-else class="badge bg-success">Completed</span>
          </td>
          <td>
            <button
              v-if="item.status == 'pending'"
              class="mx-1 btn btn-sm btn-primary"
              @click="changeTask(item, 'ongoing')"
            >
              Started
            </button>
            <button
              class="mx-1 btn btn-sm btn-secondary"
              v-if="item.status == 'ongoing'"
              @click="changeTask(item, 'completed')"
            >
              Completed
            </button>
            <button
              @click="updateTask(item)"
              v-if="edit && index == i"
              class="btn btn-sm btn-info mx-1"
            >
              Update
            </button>
            <button @click="deleteTask(item._id)" class="btn btn-sm btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    taskData: {
      type: Array,
    },
  },
  data() {
    return {
      edit: false,
      index: 0,
    };
  },
  methods: {
    deleteTask(id) {
      axios
        .post("http://localhost:3000/delete-task", { id: id })
        .then(({ data }) => {
          console.log(data);
          window.location.reload()
        });
    },
    changeTask(item, str) {
      item.status = str;
      axios
        .post("http://localhost:3000/update-task", {
          id: item._id,
          obj: item,
          update: "status",
        })
        .then(({ data }) => {
          console.log(data);
        });
    },
    updateTask(item) {
      axios
        .post("http://localhost:3000/update-task", {
          id: item._id,
          obj: item,
          update: "text",
        })
        .then(({ data }) => {
          console.log(data);
        });
    },
  },
};
</script>

<style scoped>
.table_wrapper {
  margin-top: 80px;
}
</style>
