exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("todo")
    .del()
    .then(function () {
      // Inserts seed entries
      const todos = [
        {
          title: "Finish assignment",
          priority: 1,
          data: new Date(),
        },
        {
          title: "Clean the house",
          priority: 2,
          data: new Date(),
        },
        {
          title: "5 mins excercise",
          priority: 3,
          data: new Date(),
        },
      ];
      return knex("todo").insert(todos);
    });
};
