import { ProductItemRes } from "./product";

// 购物车类型
export interface Cart {
  id: number; // ID
  uuid: string; // UUID
  user_id: string; // 用户ID
  product_item_uuid: string; // 产品ID
  quantity: number; // 数量
  created_at: string; // 创建时间
  updated_at: string; // 更新时间
}

export interface ReqCartAdd {
  product_item_uuid: string; // 产品项UUID
  quantity: number; // 数量
}

// 购物车产品项类型
export interface CartProductItemRes extends Cart {
  product_item: ProductItemRes | null; // 可能为空
}

// 更新购物车数量的请求参数类型
export interface ReqCartItemCountParam {
  uuid: string; // 购物车UUID
  quantity: number; // 数量
}
