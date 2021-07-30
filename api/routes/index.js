const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const taskController = require("../controllers/task.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signup", [verifySignUp], controller.signup);

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/tasks/create", taskController.createTask);

  app.get("/api/tasks/get/:id", taskController.getTask);

  app.post("/api/tasks/update", taskController.updateTask);

  app.post("/api/tasks/delete", taskController.deleteTask);
};
