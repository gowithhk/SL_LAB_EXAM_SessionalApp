const route = require("express").Router();

const Expense = require("./model").ExpenseModel;

route.get("/",async (req, res) => {
  try {
    const found = await Expense.find();
    res.json(found);
  } catch (err) {
    console.log(err)
  }

});

route.post("/", async (req, res) => {
  const desc = req.body.desc;
  const date = req.body.date;
  const category_id = req.body.category_id;
  const amount = req.body.amount;
  const item = new Expense({
    desc: desc,
    date: date,
    category_id: category_id,
    amount: amount
  })
  try {
    const result = await item.save();
    res.json(result);
  } catch (err) {
    console.log(err);
  }

});

route.delete("/:id",async (req, res) => {
  const delID = req.params.id
  try {
    const deletedItem = await Expense.deleteOne({_id: delID});
    res.json(deletedItem);
  } catch (err) {
    console.log(err)
  }
});

module.exports = route;
