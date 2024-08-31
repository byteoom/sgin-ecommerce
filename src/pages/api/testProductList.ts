// pages/api/testProductList.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiService } from '@/lib/api'; // 导入你的 service

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = {
    current: 1,
    pageSize: 10,
  };

  try {
    const response = await apiService.getProductList(params);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching product list:', error);
    res.status(500).json({ error: 'Failed to fetch product list' });
  }
}
