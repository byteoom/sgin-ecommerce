// src/components/sgin/CartList.tsx
import React from "react";
import CartItem from "./CartItem"; // 引入 CartItem 组件
import { CartProductItemRes } from "@/lib/types/cart"; // 导入购物车类型

interface CartListProps {
  cartItems: CartProductItemRes[]; // 购物车商品列表
  selectedItems: Set<string>; // 已选中的商品UUID
  onSelectItem: (uuid: string) => void; // 处理商品选择
  onRemoveItem: (uuid: string) => void; // 移除商品的回调函数
  onIncreaseQuantity: (uuid: string) => void; // 增加数量的回调函数
  onDecreaseQuantity: (uuid: string) => void; // 减少数量的回调函数
}

const CartList: React.FC<CartListProps> = ({
  cartItems,
  selectedItems,
  onSelectItem,
  onRemoveItem,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">购物车</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">购物车为空</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.uuid}
              item={item}
              isSelected={selectedItems.has(item.uuid)}
              onSelect={() => onSelectItem(item.uuid)}
              onRemoveItem={onRemoveItem}
              onIncreaseQuantity={onIncreaseQuantity}
              onDecreaseQuantity={onDecreaseQuantity}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartList;
