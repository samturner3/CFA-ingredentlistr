var express = require('express');
var router = express.Router();

const Ingredient = require('../models/Ingredient');

/* GET home page. */
router.get('/', (req,res) => {
  Ingredient.find()
    .then(ingredients => {
      res.render('index', {
        title: 'Ingredients',
        ingredients: ingredients
      })
    })
  });

router.post('/', (req, res) => {
  // res.send(req.body)
  console.log('req.body: ', req.body)
  const name = req.body.ingredient_name;
  let ingredient = new Ingredient();
  ingredient.name = name;
  ingredient.save()
    .then(() => {
      res.redirect('/')
    });
});

router.get('/ingredients/:id/edit', (req,res) => {
  Ingredient.findOne({ _id: req.params.id})
    .then(ingredient => {
      res.render('edit', {ingredient: ingredient})
    });
})

router.post('/ingredients/:id/edit', (req, res) => {
  console.log('edit req.body: ', req.body)
  Ingredient.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true // returns new ingredient
  })
  .then(ingredient => {
    res.redirect('/')
  });
})

module.exports = router;
