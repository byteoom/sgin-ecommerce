// pages/api/testCategories.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiService } from '@/lib/api'; // 确保导入路径正确

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await apiService.getProductCategories();
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching product categories:', error);
    res.status(500).json({ error: 'Failed to fetch product categories' });
  }
}
