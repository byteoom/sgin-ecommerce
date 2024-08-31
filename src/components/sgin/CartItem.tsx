// src/components/sgin/CartItem.tsx
import React from "react";
import { CartProductItemRes } from "@/lib/types/cart"; // 导入购物车类型
import Image from "next/image";

interface CartItemProps {
  item: CartProductItemRes; // 单个购物车商品项
  isSelected: boolean; // 是否被选中
  onSelect: () => void; // 选择商品
  onRemoveItem: (uuid: string) => void; // 移除商品的回调函数
  onIncreaseQuantity: (uuid: string) => void; // 增加数量的回调函数
  onDecreaseQuantity: (uuid: string) => void; // 减少数量的回调函数
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  isSelected,
  onSelect,
  onRemoveItem,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  const imageutl = process.env.NEXT_PUBLIC_API_BASE_URL + "/public";

  const renderProductImage = () => {
    if (item.product_item?.image_list?.length > 0) {
      return imageutl + item.product_item?.image_list[0];
    } else if (item.product_item?.product_info?.image_list.length > 0) {
      return imageutl + item.product_item?.product_info?.image_list[0];
    } else {
      return "/placeholder.png";
    }
  };

  return (
    <li className="flex items-center space-x-4 border-b border-gray-200 pb-4">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onSelect}
        className="mr-2"
      />
      <Image
        src={renderProductImage()}
        alt={item.product_item?.name || "产品图片"}
        width={80}
        height={80}
        className="rounded"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">
          {item.product_item?.name || item.product_item?.product_info?.name}
        </h3>
        <p className="text-sm text-gray-600">数量: {item.quantity}</p>
        <p className="text-sm text-gray-600">
          价格: ¥{item.product_item?.price || 0}
        </p>
        <div className="flex items-center space-x-2 mt-2">
          <button
            className="bg-gray-300 text-gray-700 px-2 rounded hover:bg-gray-400"
            onClick={() => onDecreaseQuantity(item.uuid)}
          >
            -
          </button>
          <span className="px-2">{item.quantity}</span>
          <button
            className="bg-gray-300 text-gray-700 px-2 rounded hover:bg-gray-400"
            onClick={() => onIncreaseQuantity(item.uuid)}
          >
            +
          </button>
        </div>
      </div>
      <button
        className="text-red-500 hover:text-red-600"
        onClick={() => onRemoveItem(item.uuid)}
      >
        移除
      </button>
    </li>
  );
};

export default CartItem;
