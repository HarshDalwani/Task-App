module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("tasks", {
    text: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
  });
  return Task;
};
