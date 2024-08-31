import ProductItem from '@/components/sgin/Product';
import { BaseQueryParams } from './common';

export interface Product {
  id: number; // 产品ID
  product_uuid: string; // 产品UUID
  product_item_uuid: string; // 产品项UUID
  product_type: string; // 产品类型：单个产品、变体产品、组合产品
  name: string; // 产品名称
  alias_name: string; // 产品别名
  description: string; // 产品描述
  price: number; // 产品价格
  discount: number; // 产品折扣
  discount_price: number; // 产品折扣价
  stock: number; // 产品库存
  images: string[]; // 产品图片
  image_list: string[]; // 产品图片列表
  videos: string[]; // 产品视频
  product_category_uuid: string; // 产品分类UUID
  type: string; // 产品类型：全新、二手、虚拟产品
}

export interface ProductItem {
  id: number; // 产品ID
  uuid: string; // 产品唯一UUID
  name: string; // 产品名称
  product_uuid: string; // 产品UUID
  product_variants_uuid: string; // 产品变体UUID
  product_variants_option_uuid: string; // 变体Option UUID
  product_variants_option_value_uuid: string; // 变体Option值UUID
  currency_code: string; // 货币代码
  variants: string; // 产品变体
  images: string; // 产品图片
  image_list: string[]; // 产品图片列表
  videos: string; // 产品视频
  description: string; // 产品描述
  price: number; // 产品价格
  discount: number; // 产品折扣
  discount_price: number; // 产品折扣价
  stock: number; // 产品库存
  created_at: string; // 创建时间
  updated_at: string; // 更新时间
  product_info: Product; // 产品信息
}

export interface ProductVariants {
  id: number; // 产品变体ID
  uuid: string; // 产品变体UUID
  product_uuid: string; // 产品UUID
  name: string; // 产品变体名称
  description: string; // 产品变体描述
  created_at: string; // 创建时间
  updated_at: string; // 更新时间
}

export interface ProductVariantsOption {
  id: number; // 产品变体Option ID
  uuid: string; // 产品变体Option UUID
  product_uuid: string; // 产品UUID
  product_variants_uuid: string; // 产品变体UUID
  name: string; // 产品变体Option名称
  unit: string; // 单位，例如：个、件、套、箱
  description: string; // 产品变体Option描述
  created_at: string; // 创建时间
  updated_at: string; // 更新时间
}

export interface ProductShowItem extends ProductItem {
  product_variants: ProductVariants[]; // 产品变体数组
  product_variants_option: ProductVariantsOption[]; // 产品变体Option数组
  product_items: ProductItem[]; // 产品项数组
}


// 产品分类
export interface ProductCategory {
  id: number; // 分类ID
  uuid: string; // 分类UUID
  name: string; // 分类名称
  alias_name: string; // 别名
  icon: string; // 分类图标
  description: string; // 分类描述
  parent_uuid: string; // 父级分类UUID
  sort: number; // 排序
  status: number; // 状态 1:启用 2:禁用
  created_at: string; // 创建时间
  updated_at: string; // 最后更新时间
}


// 产品列表查询参数
export interface ProductListQueryParams extends BaseQueryParams {
    name?: string; // 产品名称
  }



  export interface ProductItemRes extends ProductItem {
    image_list: string[]; // 产品图片列表
    product_info: Product; // 产品信息
  }