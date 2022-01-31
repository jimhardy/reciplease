import { userService } from '../../app/index';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { userId } = req.query;
      const response = await userService.updateUserPantry(userId, req.body);
      return res.status(200).json({ recipe: response });
    }
  } catch (error) {
    console.log({ error });
  }
}
