const mongoose = require('mongoose');

// database is called recipes
// mongoose.connect('mongodb://localhost/recipes');
mongoose.connect('mongodb://admin:admin@ds141401.mlab.com:41401/recipe');
const { connection: db } = mongoose;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to recipe database');
});

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true // name = "    Sugar " - the white spaces will be trimmed
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
