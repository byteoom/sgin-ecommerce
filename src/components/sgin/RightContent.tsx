"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Avatar } from "@/components/ui/avatar"; // Ensure the import paths match your setup
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"; // ShadCN dropdown components
import {
  ArrowRightOnRectangleIcon, // Login icon
  ArrowLeftOnRectangleIcon, // Logout icon
  UserCircleIcon, // User profile icon
} from "@heroicons/react/24/outline";
import { authService } from "@/lib/api/auth";

export default function RightContent({ isHome = false }) {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user info if not logged in
    fetchUserInfo();
  }, []);

  // Fetch user information from API
  const fetchUserInfo = async () => {
    try {
      const response = await authService.getUserInfo();
      if (response.code === 200) {
        setCurrentUser(response.data);
      } else {
        setCurrentUser(null); // Clear state if fetching fails
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      setCurrentUser(null);
    }
  };

  const handleClickLogin = () => {
    // Redirect to login page
    console.log("Login clicked");
    router.push("/login");
  };

  const handleLogout = async () => {
    // Handle logout process
    console.log("Logout");
    try {
    
      Cookies.remove("token");
      setCurrentUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const getAvatar = () => {
    if (currentUser?.avatar) {
      return currentUser.avatar.startsWith("http")
        ? currentUser.avatar
        : `/public${currentUser.avatar}`;
    }
    return "/placeholder-avatar.png"; // Default avatar image if none provided
  };

  return (
    <div className="flex items-center space-x-4">
      {currentUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center cursor-pointer">
              <Avatar src={getAvatar()} className="h-8 w-8" />
              {!isHome && <span className="ml-2">{currentUser.nickname}</span>}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <UserCircleIcon className="mr-2 h-5 w-5 text-gray-700" />
              <span>个人中心</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/order/list")}>
              <UserCircleIcon className="mr-2 h-5 w-5 text-gray-700" />
              <span>我的订单</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <ArrowLeftOnRectangleIcon className="mr-2 h-5 w-5 text-gray-700" />
              <span>退出登录</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div onClick={handleClickLogin} className="flex items-center space-x-2 cursor-pointer">
          <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-700" />
          <span>登录</span>
        </div>
      )}
    </div>
  );
}
