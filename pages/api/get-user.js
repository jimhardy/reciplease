import { userService } from '../../app/index';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { userId } = req.query;
      const response = await userService.getUser(userId);
      return res.status(200).json({ user: response });
    }
  } catch (error) {}
}
