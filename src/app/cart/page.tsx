// src/app/cart/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // 使用 Next.js 的路由
import CartList from "@/components/sgin/CartList";
import { CartProductItemRes, ReqCartItemCountParam } from "@/lib/types/cart"; // 导入购物车类型
import { apiService } from "@/lib/api"; // 假设已有获取购物车数据的服务

export default function CartPage() {
    const router = useRouter();
  const [cartItems, setCartItems] = useState<CartProductItemRes[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set()); // 存储已选中的商品UUID
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const response = await apiService.getCartItemList({
          current: 1,
          pageSize: 10,
        }); // 假设已有此 API 方法
        setCartItems(response.data.data);
      } catch (err) {
        setError("获取购物车数据失败");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (uuid: string) => {
    console.log(`移除商品: ${uuid}`);
    try {
      const response = await apiService.deleteCartItem(uuid);
      if (response.code !== 200) {
        throw new Error(response.message);
      }

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.uuid !== uuid)
      );

      setSelectedItems((prevSelected) => {
        const newSelected = new Set(prevSelected);
        newSelected.delete(uuid);
        return newSelected;
      });
    } catch (err) {
      console.error("移除商品失败:", err);
      alert("移除商品失败，请稍后再试！");
    }
  };

  const handleIncreaseQuantity = async (uuid: string) => {
    console.log(`增加商品数量: ${uuid}`);
    const updatedItem = cartItems.find((item) => item.uuid === uuid);
    if (!updatedItem) return;

    const newQuantity = updatedItem.quantity + 1;

    try {
      const response = await updateQuantity(uuid, newQuantity);
      if (response.code !== 200) {
        throw new Error(response.message);
      }

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.uuid === uuid ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error("更新数量失败:", err);
      alert("更新数量失败，请稍后再试！");
    }
  };

  const handleDecreaseQuantity = async (uuid: string) => {
    console.log(`减少商品数量: ${uuid}`);
    const updatedItem = cartItems.find((item) => item.uuid === uuid);
    if (!updatedItem || updatedItem.quantity <= 1) return;

    const newQuantity = updatedItem.quantity - 1;

    try {
      const response = await updateQuantity(uuid, newQuantity);
      if (response.code !== 200) {
        throw new Error("更新数量失败");
      }

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.uuid === uuid ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error("更新数量失败:", err);
      alert("更新数量失败，请稍后再试！");
    }
  };

  const updateQuantity = async (uuid: string, quantity: number) => {
    const payload: ReqCartItemCountParam = { uuid, quantity };
    return apiService.updateCartItemCount(payload);
  };

  // 处理商品选择
  const handleSelectItem = (uuid: string) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(uuid)) {
        newSelected.delete(uuid);
      } else {
        newSelected.add(uuid);
      }
      return newSelected;
    });
  };

  // 处理全选/取消全选
  const handleSelectAll = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map((item) => item.uuid)));
    }
  };

  // 处理购买操作
  const handlePurchase = async () => {
    if (selectedItems.size === 0) {
      alert("请选择要购买的商品！");
      return;
    }
    const selectedProductItems = cartItems.filter((item) =>
      selectedItems.has(item.uuid)
    );

    
    const cartUuids = selectedProductItems.map((item) => item.uuid);

    const orderData = {
        receiver: {
          receiver_name: "张三",
          receiver_phone: "1234567890",
          receiver_email: "example@example.com",
          receiver_country: "中国",
          receiver_province: "北京市",
          receiver_city: "北京市",
          receiver_address: "某街道某小区",
          receiver_zip: "100000",
          receiver_remark: "请尽快发货",
        },
        cart_uuids: cartUuids,
      };

      try {
        // 调用创建订单接口
        const response = await apiService.createOrder(orderData);
        if (response.code === 200 && response.data) {
          // 创建成功后，跳转到订单详情页面并传递订单 ID
         // router.push(`/order/detail/${response.data.order_id}`);
         // 创建订单成功后，跳转到订单成功页面
         console.log('创建订单成功', response.data)
        } else {
          throw new Error(response.message || "订单创建失败");
        }
      } catch (error) {
        console.error("订单创建失败:", error);
        alert("订单创建失败，请重试！");
      }

 
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">我的购物车</h1>

      {loading && <p>加载中...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={selectedItems.size === cartItems.length}
          onChange={handleSelectAll}
          className="mr-2"
        />
        <label className="text-gray-700">全选</label>
      </div>

      <CartList
        cartItems={cartItems}
        selectedItems={selectedItems}
        onSelectItem={handleSelectItem}
        onRemoveItem={handleRemoveItem}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
      />

      <button
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        onClick={handlePurchase}
      >
        购买
      </button>
    </main>
  );
}
