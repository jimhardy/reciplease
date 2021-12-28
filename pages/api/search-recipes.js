import { userService, recipeService } from '../../app/index';

export default async function handler(req, res) {
  const user = userService.getuser(req.query.id);
  
  if (req.method === 'GET') {
    const user = await userService.getuser(req.query.userId);
    return recipeService.getRecipeByIngredients(user.pantry.ingredients).then((recipes) => {
      console.log(recipes);
      return res.status(200).json({ recipes });
    });
  }
}
