"use client";

import { useEffect, useState } from "react";
import ProductItem from "@/components/sgin/Product";
import { apiService } from "@/lib/api"; // Ensure the path is correct
import { Product, ProductCategory } from "@/lib/types"; // Import data types
import { useRouter } from "next/navigation";

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product list and categories
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiService.getProductList({
          current: 1,
          pageSize: 10,
        });
        setProducts(response.data.data);
      } catch (err) {
        setError("获取产品列表失败");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await apiService.getProductCategories();
        setCategories(response.data);
      } catch (err) {
        setError("获取产品分类失败");
        console.error(err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleViewDetails = (product: Product) => {
    console.log("查看详情:", product);
    // 跳转
    router.push(`/product/${product.product_uuid}`);
  };

  const handleAddToCart = async (product: Product) => {
    try {
      const response = await apiService.addCart({
        product_item_uuid: product.product_item_uuid,
        quantity: 1,
      });
      if (response.code === 200) {
        console.log("添加购物车成功");
      } else {
        console.error("添加购物车失败");
      }
    } catch (error) {
      console.error("添加购物车时出错:", error);
    }
  };

  return (
    <main className="flex min-h-screen p-8 bg-gray-50">
      <div className="flex w-full max-w-7xl mx-auto gap-6">
        {/* Product Categories Section */}
        <aside className="w-1/6 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Collections</h2>
          {categories.length > 0 ? (
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="text-gray-700 cursor-pointer hover:text-blue-500"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">暂无分类</p>
          )}
        </aside>

        {/* Products Section */}
        <section className="flex-1 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-min">
          {loading && <p>加载中...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {products.length > 0 ? (
            products.map((product) => (
              <ProductItem
                key={product.id}
                imageUrl={
                  product.images.length > 0
                    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/public${product.images[0]}`
                    : "/placeholder.png"
                }
                name={product.name}
                price={product.price}
                description={product.description}
                onViewDetails={() => handleViewDetails(product)}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))
          ) : (
            <p className="text-gray-600">暂无产品</p>
          )}
        </section>

        {/* Sorting Options Section */}
        <aside className="w-1/6 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sort by</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="cursor-pointer hover:text-blue-500">Relevance</li>
            <li className="cursor-pointer hover:text-blue-500">Trending</li>
            <li className="cursor-pointer hover:text-blue-500">
              Latest arrivals
            </li>
            <li className="cursor-pointer hover:text-blue-500">
              Price: Low to high
            </li>
            <li className="cursor-pointer hover:text-blue-500">
              Price: High to low
            </li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
