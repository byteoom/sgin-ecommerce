// utils/request.ts
import Cookies from 'js-cookie';

// 定义请求配置类型
interface RequestOptions extends RequestInit {
  baseURL?: string;
  data?: any;
}

interface RequestConfig extends RequestOptions {
  withCredentials?: boolean;
  requestInterceptors?: Array<(config: RequestOptions) => RequestOptions>;
  errorConfig?: {
    errorHandler?: (error: any, opts?: { skipErrorHandler?: boolean }) => void;
  };
}

// 默认配置
const defaultHeaders = {
  'Content-Type': 'application/json',
};

const defaultOptions: RequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  headers: defaultHeaders,
  withCredentials: true,
  requestInterceptors: [
    (config: RequestOptions) => {
      const currentToken = Cookies.get('token');
      if (!currentToken || currentToken === 'undefined') {
        console.log('Token 不存在');
      }
      return {
        ...config,
        headers: {
          ...config.headers,
          'X-Token': currentToken || '',
        } as any,
      };
    },
  ],
  errorConfig: {
    errorHandler: (error, opts) => {
      if (opts?.skipErrorHandler) throw error;
      const { response } = error;

      if (response && response.status !== 200) {
        // 请求已发送但服务端返回状态码非200系列
        console.log('Response failed:', response);
      } else if (!response) {
        // 请求尚未发送就失败，网络问题或者请求被阻止等原因
        console.log('Request failed');
      }
      throw error; // 如果throw. 错误将继续抛出.
    },
  },
};

// 请求函数
const request = async <T = any>(
  url: string,
  options?: RequestOptions
): Promise<T> => {
  const { baseURL, headers, data, requestInterceptors, errorConfig, ...rest } =
    { ...defaultOptions, ...options };

  const fullUrl = `${baseURL}${url}`;

  // 应用请求拦截器
  let config: RequestOptions = {
    ...rest,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  };

  if (requestInterceptors) {
    requestInterceptors.forEach((interceptor) => {
      config = interceptor(config);
    });
  }

  // 如果有 data 且请求是 POST、PUT 等，需要将 data 序列化并传入 body
  if (data && ['POST', 'PUT', 'PATCH'].includes(config.method || '')) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(fullUrl, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '请求失败');
    }

    return response.json();
  } catch (error) {
    if (errorConfig?.errorHandler) {
      errorConfig.errorHandler(error);
    } else {
      console.error('Request Error:', error);
    }
    throw error;
  }
};

export default request;
