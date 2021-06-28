const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ObjectID } = require("mongodb");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const uri = `mongodb://127.0.0.1:27017/`;
const client = new MongoClient(uri);

app.post("/create-task", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("todo_app");
    const { insertedCount, insertedId } = await db
      .collection("all_tasks")
      .insertOne(req.body.obj);
    res.status(200).send({ insertedCount, insertedId });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  } finally {
    client.close();
  }
});

app.get("/list-tasks", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("todo_app");
    const tasks = await db
      .collection("all_tasks")
      .find()
      .toArray();
    res.status(200).send(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.post("/update-task", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("todo_app");
    console.log(req.body);
    const {result} = await db
      .collection("all_tasks")
      .updateOne(
        { _id: ObjectID(req.body.id) },
        { $set: { [req.body.update]: req.body.obj[req.body.update] } }
      );

    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }

});

app.post("/delete-task", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("todo_app");
    const { deletedCount, result } = await db
      .collection("all_tasks")
      .deleteOne({ _id: ObjectID(req.body.id) });

    console.log(deletedCount);
    res.status(200).send({ deletedCount, result });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }

});

app.listen(3000, () => {
  console.log(`Todo app listening at http://localhost:3000`);
});
