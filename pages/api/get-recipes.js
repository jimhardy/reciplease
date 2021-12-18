// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { userService, recipeService } from '../app/index';

export default function handler(req, res) {
  if (req.method === 'GET') {
    // const recipes = recipeService.getAllRecipes();
    res.status(200).json({ x:1 });
  }
}

// to call from component await fetch('./api/add-ingredient', {method: 'POST', body: {name: 'John Doe'}, headers etc...})
// await response.json()