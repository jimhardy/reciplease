import { recipeService } from '../../app/index';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return recipeService
      .addRecipe({
        title: 'butter on toast',
        ingredients: [
          {
            name: 'bread',
            amount: 2,
            measure: 'slices',
          },
          {
            name: 'butter',
            amount: '20',
            measure: 'grams',
          },
        ],
        method: 'bread in toaster, butter bread',
        time: { minutes: 5 },
      })
      .then((recipe) => {
        console.log(recipe);
        return res.status(200).json({ newRecipe: recipe });
      });
  }
}
