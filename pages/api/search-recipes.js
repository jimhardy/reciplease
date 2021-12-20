import { userService, recipeService } from '../../app/index';

export default function handler(req, res) {
  const user = userService.getuser(req.query.id);
  const { ingredients } = user;
  if (req.method === 'GET') {
    return recipeService.getRecipeByIngredients(ingredients).then((recipes) => {
      console.log(recipes);
      return res.status(200).json({ recipes });
    });
  }
}
