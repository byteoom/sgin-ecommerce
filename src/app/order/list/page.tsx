// src/app/order/list/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiService} from "@/lib/api"; // 导入获取订单列表和创建支付的 API 函数
import { Order, ReqOrderQueryParam } from "@/lib/types/order"; // 导入订单类型
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; // 导入 PayPal 组件
import { Button } from "@/components/ui/button"; // 假设 ShadCN UI 的按钮和对话框组件
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // 假设 ShadCN UI 的按钮和对话框组件

const OrderListPage: React.FC = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPayModalVisible, setIsPayModalVisible] = useState(false);
  const [payPalOrderId, setPayPalOrderId] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const params: ReqOrderQueryParam = {
          status: "", // 可选的订单状态过滤
          order_no: "", // 可选的订单编号过滤
          current: 1, pageSize: 10, // 分页参数
        };
        const response = await apiService.getOrderList(params);
        if (response.code === 200) {
          setOrders(response.data.data);
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        setError("获取订单列表失败");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 获取 PayPal 客户端 ID
  useEffect(() => {
    const fetchPayPalClientId = async () => {
      try {
        const response = await apiService.fetchPayPalClientId("production");
        if (response.code === 200) {
          setClientId(response.data);
        } else {
          alert("Failed to load PayPal client ID");
        }
      } catch (error) {
        alert("An error occurred while fetching PayPal client ID");
      }
    };

    fetchPayPalClientId();
  }, []);

  const handlePay = async (orderId: string) => {
    try {
      const response = await apiService.createPayPalPayment(orderId);
      if (response.code === 200 && response.data && response.data.id) {
        setPayPalOrderId(response.data.id); // 设置 PayPal 订单 ID
        setIsPayModalVisible(true); // 显示支付弹窗
      } else {
        alert("Failed to initiate PayPal payment");
      }
    } catch (error) {
      alert("An error occurred while initiating PayPal payment");
      console.error(error);
    }
  };

  const handlePaymentSuccess = (orderId: string) => {
    alert(`Payment successful! Order ID: ${orderId}`);
    setIsPayModalVisible(false);
    // 更新订单状态或刷新列表
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">订单列表</h1>

      {loading && <p>加载中...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {orders.length === 0 && !loading && !error && (
        <p className="text-gray-600">暂无订单数据</p>
      )}

      <ul className="w-full max-w-4xl space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">订单编号: {order.order_no}</p>
              <p className="text-sm text-gray-600">收货人: {order.receiver_name}</p>
              <p className="text-sm text-gray-600">状态: {order.status}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                onClick={() => handlePay(order.order_no)}
                disabled={order.status !== "pending"}
              >
                支付
              </Button>
              <Button
                variant="default"
                onClick={() => router.push(`/order/detail/${order.id}`)}
              >
                查看详情
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* 使用 ShadCN UI 的 Dialog 组件实现支付弹窗 */}
      <Dialog open={isPayModalVisible} onOpenChange={setIsPayModalVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>完成您的支付</DialogTitle>
          </DialogHeader>
          {clientId && payPalOrderId && (
            <PayPalScriptProvider
              options={{ "client-id": clientId, currency: "USD", intent: "capture" }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={() => {
                  return payPalOrderId; // 返回 PayPal 订单 ID
                }}
                onApprove={async (data, actions) => {
                  const order = await actions.order.capture();
                  handlePaymentSuccess(order.id);
                }}
                onError={(err) => {
                  alert("An error occurred during payment processing");
                  console.error(err);
                }}
              />
            </PayPalScriptProvider>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default OrderListPage;
