import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GridTileImage } from '@/components/grid/tile';

import { Gallery } from '@/components/product/gallery';
import { ProductProvider } from '@/components/product/product-context';
import { ProductDescription } from '@/components/product/product-description';
import { apiService } from '@/lib/api';

import Link from 'next/link';
import { Suspense } from 'react';

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const response = await apiService.getProduct(params.handle);
  const product = response.data;

  if (!product) return notFound();


  return {
    title:  product.name,
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const response = await apiService.getProduct(params.handle);
  const product = response.data;

  console.log("product", product);

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'http://byteoom.com',
    '@type': 'Product',
    name: product.name,
  };

  console.log("product images:", product.images);

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product.images.slice(0, 5).map((image: string) => ({
                  src:  process.env.NEXT_PUBLIC_API_BASE_URL  +  '/public' + image,
                }))}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>
      </div>
    </ProductProvider>
  );
}
