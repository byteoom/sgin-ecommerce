"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"; // React Hook Form 用于表单管理
import { authService } from "@/lib/api/auth";
import { ReqUserLogin } from "@/lib/types";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";


interface LoginFormValues extends ReqUserLogin {}

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 初始化表单
  const form = useForm<LoginFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      console.log("values:", values);
      const response = await authService.loginUser(values);
      if (response.code == 200 && response.data.token) {
        Cookie.set("token", response.data.token);
        // 跳转首页
        window.location.href = "/";
        return;
      }

      setError("登录失败，请检查用户名或密码！");
      // 处理登录成功的逻辑
    } catch (error) {
      setError("登录失败，请检查用户名或密码！");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">登录</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && <div className="text-red-500 text-center">{error}</div>}
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">用户名或邮箱</FormLabel>
                <FormControl>
                  <Input
                    placeholder="请输入用户名或邮箱"
                    {...field}
                    className="border border-gray-300 rounded-md p-2 w-full focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">密码</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="请输入密码"
                    {...field}
                    className="border border-gray-300 rounded-md p-2 w-full focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "登录中..." : "登录"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm;
