import { userService } from '../../app/index';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { userId } = req.query;
      const response = await userService.updateUserPantry(userId, req.body);
      console.log('response in save-user', response);
      return res.status(200).json({ user: response });
    }
  } catch (error) {
    console.log({ error });
  }
}
