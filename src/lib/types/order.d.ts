import { BaseQueryParams } from "./common";
import { ProductItemRes } from "./product";

// 订单状态常量
export const OrderStatus = {
  Pending: "pending", // 待支付
  Paid: "paid", // 已支付
  Delivered: "delivered", // 已发货
  Completed: "completed", // 已完成
  Closed: "closed", // 已关闭
} as const;

// 订单类型
export interface Order {
  id: number;
  order_no: string; // 订单编号
  user_id: string; // 用户ID
  total_amount: number; // 订单总金额
  status: string; // 订单状态

  receiver_name: string; // 收货人姓名
  receiver_phone: string; // 收货人电话
  receiver_email: string; // 收货人邮箱

  receiver_country: string; // 收货人国家
  receiver_province: string; // 收货人省份
  receiver_city: string; // 收货人城市
  receiver_address: string; // 收货人地址
  receiver_zip: string; // 收货人邮编
  receiver_remark: string; // 收货人备注

  paid_at: string; // 支付时间
  delivered_at: string; // 发货时间
  completed_at: string; // 完成时间
  closed_at: string; // 关闭时间
  created_at: string; // 创建时间
  updated_at: string; // 更新时间
}

// 订单响应类型
export interface OrderRes extends Order {
  items: OrderItemRes[]; // 订单商品列表
}

// 收货人信息
export interface OrderReceiver {
  receiver_name: string; // 收货人姓名
  receiver_phone: string; // 收货人电话
  receiver_email: string; // 收货人邮箱

  receiver_country: string; // 收货人国家
  receiver_province: string; // 收货人省份
  receiver_city: string; // 收货人城市
  receiver_address: string; // 收货人地址
  receiver_zip: string; // 收货人邮编
  receiver_remark: string; // 收货人备注
}

// 订单商品类型
export interface OrderItem {
  id: number;
  order_id: string; // 订单ID
  product_item_id: string; // 商品ID
  quantity: number; // 商品数量
  price: number; // 商品单价
  total_amount: number; // 商品总价
  discount_amount: number; // 折扣金额
  discount: number; // 折扣
  discount_price: number; // 折扣价
  created_at: string; // 创建时间
  updated_at: string; // 更新时间
}

// 订单商品响应类型
export interface OrderItemRes extends OrderItem {
  product_item: ProductItemRes; // 商品信息
}


// 创建订单请求类型
export interface ReqOrderCreate {
  receiver: OrderReceiver; // 收货人信息
  items?: ReqOrderItemCreate[]; // 订单商品列表
  cart_uuids?: string[]; // 购物车ID列表
}

// 创建订单商品请求类型
export interface ReqOrderItemCreate {
  product_item_id: string; // 商品ID
  quantity: number; // 商品数量
}

// 订单查询参数
export interface ReqOrderQueryParam extends BaseQueryParams {
  status: string; // 订单状态，用于过滤
  order_no: string; // 订单编号，用于过滤
}



// PayPal 订单详情类型
export interface PaypalOrderDetail {
    id?: string; // PayPal 订单 ID
    status?: string; // 状态: CREATED、SAVED、APPROVED、VOIDED、COMPLETED、PAYER_ACTION_REQUIRED
    intent?: string; // 订单意图
    processing_instruction?: string; // 处理指令
    create_time?: string; // 创建时间
    update_time?: string; // 更新时间
  }
  