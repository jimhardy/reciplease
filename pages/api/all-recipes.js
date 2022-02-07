import { recipeService } from '../../app/index';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const response = await recipeService.getAllRecipes();
      console.log('here ====================================');
      console.log(response);
      return res.status(200).json({ recipes: response });
    }
  } catch (error) {}
}
