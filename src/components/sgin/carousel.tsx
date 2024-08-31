import { apiService } from "@/lib/api";
import Link from "next/link";
import { GridTileImage } from "./grid/tile";
import Product from "./Product";

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await apiService.getProductList({
    current: 1,
    pageSize: 10,
  });

  if (!products?.data.data.length) return null;

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {products.data.data.map((product, i) => (
          <li
            key={`${product.product_uuid}`}
            className="relative aspect-square h-[40vh] max-h-[375px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link
              href={`/product/${product.product_uuid}`}
              className="relative h-full w-full"
            >
              <Product
                imageUrl={
                  process.env.NEXT_PUBLIC_API_BASE_URL +
                    "/public" +
                    product.images[0] || "/placeholder.png"
                } // 确保有图像显示
                name={product.name}
                price={product.price}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
