const db = require("../models");
const Task = db.tasks;

exports.createTask = (req, res) => {
  Task.create({
    text: req.body.taskObj.text,
    status: req.body.taskObj.status,
  })
    .then((result) => {
      console.log(result);
      res.send({ message: "Task Created!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getTask = (req, res) => {
  Task.findAll({ userId: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.updateTask = (req, res) => {
  Task.update(
    { [req.body.update]: req.body.obj[req.body.update] },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteTask = (req, res) => {
  Task.destroy({ where: { id: req.body.id } })
    .then(() => {
      res.send('Deleted');
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
