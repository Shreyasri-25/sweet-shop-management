const Sweet = require("../models/Sweet");

function getSweets(req, res) {
  Sweet.find().then((sweets) => res.json(sweets));
}

function createSweet(req, res) {
  Sweet.create(req.body).then((sweet) =>
    res.status(201).json(sweet)
  );
}

function updateSweet(req, res) {
  Sweet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).then((sweet) => res.json(sweet));
}

function deleteSweet(req, res) {
  Sweet.findByIdAndDelete(req.params.id).then(() =>
    res.json({ message: "Sweet deleted" })
  );
}

function restockSweet(req, res) {
  const { quantity } = req.body;

  Sweet.findById(req.params.id).then((sweet) => {
    sweet.quantity += Number(quantity);
    sweet.save().then(() => res.json(sweet));
  });
}

module.exports = {
  getSweets,
  createSweet,
  updateSweet,
  deleteSweet,
  restockSweet,
};
