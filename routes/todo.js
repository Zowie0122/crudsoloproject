const express = require("express");
const router = express.Router();

const knex = require("../db/knex");
/* GET home page. */

function validTodo(todo) {
  return (
    typeof todo.title == "string" &&
    todo.title.trim() != "" &&
    typeof todo.priority != "undefined" &&
    !isNaN(todo.priority)
  );
}

function validId(id) {
  return !isNaN(id);
}

router.get("/", function (req, res, next) {
  knex("todo")
    .select()
    .then((todos) => {
      res.render("all", { todos: todos });
    });
});

router.get("/new", (req, res) => {
  res.render("new");
});

router.get("/:id", function (req, res) {
  const id = req.params.id;
  if (validId(id)) {
    knex("todo")
      .select()
      .where("id", id)
      .first()
      .then((todo) => {
        res.render("single", todo);
      });
  } else {
    res.status(500);
    res.render("error", {
      message: "Invalid id",
    });
  }
});

router.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  if (validTodo(req.body)) {
    const todo = {
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      data: new Date(),
    };
    knex("todo")
      .insert(todo, "id")
      .then((ids) => {
        id = ids[0];
        res.redirect(`/todo/${id}`);
      });
  } else {
    res.status(500);
    res.render("error", {
      message: "Invalid todo",
    });
  }
});

router.put("/:id", (req, res) => {
  validateTodoRenderError(req, res, (todo) => {
    const id = req.params.id;
    knex("todo")
      .where("id", id)
      .update(todo, "id")
      .then(() => {
        res.redirect(`/todo/${id}`);
      });
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (validId(id)) {
    knex("todo")
      .where("id", id)
      .del()
      .then(() => {
        res.redirect("/todo");
      });
  } else {
    res.status(500);
    res.render("error", {
      message: "Invalid id",
    });
  }
});

module.exports = router;
