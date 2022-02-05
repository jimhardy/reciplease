import { recipeService, userService } from '../../app/index';
const config = require('config');
const faunadb = require('faunadb');

export default async function handler(req, res) {
  // const user = userService.getuser(req.query.id);
  try {
    if (req.method === 'GET') {
      const user = await userService.getUser(req.query.userId);
      const ingredients = user.pantry.ingredients;
      const response = await recipeService.getRecipeByIngredients(ingredients);
      return res.status(200).json({ recipes: response });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
}
