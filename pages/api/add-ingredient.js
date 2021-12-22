import { userService, recipeService } from '../../app/index';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.data;
    res.status(200).json({ name: 'John Doe' });
  }
}
