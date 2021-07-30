<template>
  <div class="container mt-5">
    <h2 class="text-uppercase">Tasks List</h2>
    <button
      data-bs-toggle="modal"
      data-bs-target="#taskModal"
      class="btn btn btn-primary float-start"
    >
      Add Task
    </button>

    <TaskList :taskData="tasks" />

    <!-- Modal -->
    <div
      class="modal fade"
      id="taskModal"
      tabindex="-1"
      aria-labelledby="taskModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form @submit.prevent="createTask">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div class="modal-body">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label"
                  >Task:</label
                >
                <input
                  v-model="taskObj.text"
                  type="text"
                  class="form-control"
                  placeholder="Go To Gym...."
                  required
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-success">Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TaskList from "../components/TaskList.vue";
export default {
  data() {
    return {
      tasks: null,
      taskObj: {
        text: "",
        status: "pending",
      },
    };
  },
  components: {
    TaskList,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    createTask() {
      axios
        .post(`${process.env.VUE_APP_API_URL}tasks/create`, {
          taskObj: this.taskObj,
          userId: this.user.id,
        })
        .then((res) => {
          alert(res.data.message);
          window.location.reload()
        })
        .catch((err) => console.error(err));
    },
    listTasks() {
      axios
        .get(`${process.env.VUE_APP_API_URL}tasks/get/${this.user.id}`, {})
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch((err) => console.error(err));
    },
  },
  created() {
    this.listTasks();
  },
};
</script>

<style lang="scss" scoped></style>
