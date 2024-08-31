// src/app/order/create/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // 使用 Next.js 的路由
import { apiService } from "@/lib/api"; // 导入创建订单的 API 函数
import { ReqOrderCreate, OrderReceiver, ReqOrderItemCreate } from "@/lib/types/order"; // 导入类型
import { CartProductItemRes } from "@/lib/types/cart"; // 导入购物车商品类型


const OrderCreatePage: React.FC = () => {
  const router = useRouter();
  const { state } = router; // 获取传递的状态
  const [orderData, setOrderData] = useState<ReqOrderCreate>({
    user_id: "", // 示例用户ID，可以从用户上下文或状态中获取
    receiver: {
      receiver_name: "",
      receiver_phone: "",
      receiver_email: "",
      receiver_country: "",
      receiver_province: "",
      receiver_city: "",
      receiver_address: "",
      receiver_zip: "",
      receiver_remark: "",
    },
    items: [],
    cart_uuids: [],
  });

  useEffect(() => {
    // 如果存在传递过来的商品数据

    console.log("state", state);

    if (state?.selectedProductItems) {
      const items = state.selectedProductItems.map((item: CartProductItemRes) => ({
        product_item_id: item.product_item_id, // 从购物车商品数据中获取ID
        quantity: item.quantity,
      }));

      const cartUuids = state.selectedProductItems.map((item: CartProductItemRes) => item.uuid);

      setOrderData((prev) => ({
        ...prev,
        items,
        cart_uuids: cartUuids,
      }));
    }
  }, [state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      receiver: {
        ...prev.receiver,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiService.createOrder(orderData);
      if (response.code === 200) {
        alert("订单创建成功");
        router.push("/order/success"); // 跳转到订单成功页面
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("订单创建失败:", error);
      alert("订单创建失败，请重试！");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">创建订单</h2>

      <div className="mb-4">
        <label className="block text-gray-700">收货人姓名</label>
        <input
          type="text"
          name="receiver_name"
          value={orderData.receiver.receiver_name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">收货人电话</label>
        <input
          type="text"
          name="receiver_phone"
          value={orderData.receiver.receiver_phone}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* 可以添加更多的收货人信息输入框 */}

      <button
        type="submit"
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
      >
        提交订单
      </button>
    </form>
  );
};

export default OrderCreatePage;
