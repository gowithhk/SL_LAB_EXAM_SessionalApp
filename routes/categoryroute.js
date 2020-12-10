const route = require("express").Router();

const Category = require("./model").CategoryModel;

route.get("/",async (req, res) => {
  try {
    const found = await Category.find();
    res.json(found);
  } catch (err) {
    console.log(err)
  }

});

route.post("/", async (req, res) => {
  const name = req.body.name;
  const threshold = req.body.threshold;
  const item = new Category({
    name: name,
    threshold: threshold
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
    const deletedItem = await Category.deleteOne({_id: delID});
    res.json(deletedItem);
  } catch (err) {
    console.log(err)
  }
});

module.exports = route;
