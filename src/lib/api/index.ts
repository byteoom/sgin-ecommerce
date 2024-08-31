import request from "@/lib/utils/request"; // 使用自定义的 request 封装
import {
  ProductListQueryParams,
  BaseResult,
  BaseListResult,
  Product,
  ProductCategory,
  ReqCartAdd,
  BaseQueryParams,
  CartProductItemRes,
  ReqCartItemCountParam,
  ReqOrderCreate,
  ReqOrderQueryParam,
  OrderRes,
  PaypalOrderDetail,
  PayPal,
  PaymentMethod,
  ProductShowItem,
} from "../types"; // 导入查询参数类型

// 获取产品列表
async function getProductList(
  params: ProductListQueryParams
): Promise<BaseListResult<Product>> {
  return request("/api/v1/f/product/list", {
    method: "POST",
    data: params,
  });
}

// 获取产品详情
// getProduct
async function getProduct(uuid: string): Promise<BaseResult<ProductShowItem>> {
  return request(`/api/v1/f/product/info`, {
    method: "POST",
    data: {uuid: uuid},
  });
}

// 获取产品分类
async function getProductCategories(): Promise<BaseResult<ProductCategory[]>> {
  return request("/api/v1/f/product_category/all", {
    method: "POST",
    data: {},
  });
}

// 添加购物车
async function addCart(data: ReqCartAdd): Promise<BaseResult> {
  return request("/api/v1/cart/add", {
    method: "POST",
    data,
  });
}

// 获取购物车列表
async function getCartItemList(
  data: BaseQueryParams
): Promise<BaseListResult<CartProductItemRes>> {
  return request("/api/v1/cart/list", {
    method: "POST",
    data,
  });
}

// 更新购物车商品数量
async function updateCartItemCount(
  data: ReqCartItemCountParam
): Promise<BaseResult> {
  return request("/api/v1/cart/update/count", {
    method: "POST",
    data,
  });
}

// 移除购物车商品
 async function deleteCartItem(uuid: string): Promise<BaseResult> {
  return request("/api/v1/cart/delete", {
    method: "POST",
    data: { uuid },
  });
}

// 创建订单
 async function createOrder(data: ReqOrderCreate): Promise<BaseResult> {
  return request("/api/v1/order/create", {
    method: "POST",
    data,
  });
}

// 获取订单列表
async function getOrderList(params: ReqOrderQueryParam): Promise<BaseListResult<OrderRes>> {
  return request('/api/v1/user/orders', {
    method: 'POST',
    data: params,
  });
}

// 创建paypal 支付订单
 async function createPayPalPayment(order_id: string): Promise<BaseResult<PaypalOrderDetail>> {
  return request('/api/v1/payment_method/paypal/create', {
    method: 'POST',
    data: {order_id: order_id},
  });
}

// 获取PayPal Client ID
async function fetchPayPalClientId(env: string): Promise<BaseResult<string>>  {
  return request('/api/v1/payment_method/paypal/client_id', {
    method: 'POST',
    data: { env: env },
  });
}


// 获取可用的支付方式
async function getPaymentMethods(): Promise<BaseResult<PaymentMethod[]>> {
  return request('/api/v1/f/payment_method/all', {
    method: 'POST',
    data: {},
  });
}


export const apiService = {
  getProductList,
  getProduct,
  getProductCategories,
  addCart,
  getCartItemList,
  updateCartItemCount,
  deleteCartItem,
  createOrder,
  getOrderList,
  createPayPalPayment,
  fetchPayPalClientId,
  getPaymentMethods,
};
