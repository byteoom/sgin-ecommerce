// pages/api/testLogin.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { authService } from '@/lib/api/auth'; // 确保导入路径正确

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username = "admin";
  const password = "admin";

  try {
    const response = await authService.loginUser({ username, password });
    console.log("response:", response);
    console.log("token:", response.data.token);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
}
