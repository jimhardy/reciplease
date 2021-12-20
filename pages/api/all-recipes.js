import { recipeService } from '../../app/index';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return recipeService.getAllRecipes().then((recipes) => {
      console.log(recipes);
      return res.status(200).json({ recipes });
    });
  }
}
