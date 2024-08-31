import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';
import { ShoppingCartIcon } from '@heroicons/react/24/outline'; // Import the shopping cart icon
import  RightContent  from '../../sgin/RightContent';

const SITE_NAME = 'SginShop';

export function Navbar() {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            {/* <LogoSquare /> */}
            <div className="ml-2 flex-none text-sm font-medium md:hidden lg:block">
              {SITE_NAME}
            </div>
            
          </Link>
          <Link
            href="/products"
            prefetch={true}
            className="ml-4 text-sm font-medium text-gray-800 dark:text-white hover:text-blue-500 transition duration-150"
          >
            Products
          </Link>
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-1/3">
          <Link href="/cart" prefetch={true} className="flex items-center">
            <ShoppingCartIcon className="h-6 w-6 text-gray-800 dark:text-white hover:text-blue-500 transition duration-150" />
          </Link>

          <RightContent />
        </div>
      </div>
    </nav>
  );
}
