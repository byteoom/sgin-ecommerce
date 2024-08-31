// src/app/page.tsx
import Image from "next/image";
import Product from "@/components/sgin/Product";
import { Carousel } from "@/components/sgin/carousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <div className="max-w-3xl text-center">
        <Image
          src="/sgin-logo.png" // 确保此路径正确，图片放置在 public 目录中
          alt="SginShop Logo"
          width={180}
          height={50}
          priority
          className="mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">SginShop - 轻松搭建电商平台</h1>
        <p className="text-lg text-gray-700 mb-6">
          SginShop
          是一个专为国内独立站长打造的轻量级电商系统，致力于帮助站长快速搭建属于自己的在线商店，轻松开展跨境业务。
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">关于项目</h2>
            <p className="text-sm text-gray-600">
              基于 Go 语言和 Gin 框架开发，SginShop
              提供简洁、高效的电商解决方案，支持多种支付方式，满足不同用户的需求。
            </p>
            <a
              href="https://github.com/byteoom/sgin-shop"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                查看项目地址
              </button>
            </a>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md text-left">
            <h2 className="text-xl font-semibold mb-2">产品亮点</h2>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>⚡ 超快性能，优化用户体验</li>
              <li>🔐 强大的安全保护，保障交易和数据</li>
              <li>🛠️ 高度灵活的扩展性，轻松定制开发</li>
            </ul>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">推荐产品</h1>

      <Carousel />
    </main>
  );
}
