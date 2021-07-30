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
        <transition name="fade">
          <tr v-for="(item, i) in taskData" :key="item._id">
            <th scope="row">{{ i + 1 }}</th>
            <td>
              <span v-if="!edit" @click="(edit = !edit), (index = i)">
                {{ item.text }}
              </span>
              <span v-else>
                <span v-if="index == i">
                  <input
                    :id="item.id"
                    v-model="item.text"
                    class=""
                    type="text"
                    name=""
                  />
                  <button class="btn btn-sm" @click="edit = false">
                    Close
                  </button>
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
              <button
                @click="deleteTask(item.id, i)"
                class="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        </transition>
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
    deleteTask(id, idx) {
      axios
        .post(`${process.env.VUE_APP_API_URL}tasks/delete`, { id: id })
        .then(() => {
          this.taskData.splice(idx, 1);
        });
    },
    changeTask(item, str) {
      item.status = str;
      axios.post(`${process.env.VUE_APP_API_URL}tasks/update`, {
        id: item.id,
        obj: item,
        update: "status",
      });
    },
    updateTask(item) {
      axios
        .post(`${process.env.VUE_APP_API_URL}tasks/update`, {
          id: item.id,
          obj: item,
          update: "text",
        })
        .then(() => {
          this.edit = false;
        });
    },
  },
};
</script>

<style scoped>
.table_wrapper {
  margin-top: 80px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
