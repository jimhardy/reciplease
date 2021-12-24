import { recipeService } from '../../app/index';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const response = await recipeService.addRecipe(req.body);
      return res.status(200).json({ recipe: response });
    }
  } catch (error) {}
}
