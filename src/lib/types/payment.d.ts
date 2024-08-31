// types/payment.ts

// PayPal 配置类型
export interface PayPal {
    email: string; // 收款人邮箱
    merchant_id: string; // 商户ID
    clientid: string; // 客户端ID
    secret: string; // 客户端密钥
    env: string; // 环境: sandbox (沙盒) 或 production (正式环境)
  }
  

  // PayPal 订单详情类型
export interface PaypalOrderDetail {
    id?: string; // PayPal 订单 ID
    status?: string; // 状态: CREATED、SAVED、APPROVED、VOIDED、COMPLETED、PAYER_ACTION_REQUIRED
    intent?: string; // 订单意图
    processing_instruction?: string; // 处理指令
    create_time?: string; // 创建时间
    update_time?: string; // 更新时间
  }
  

  // 支付方式类型
export interface PaymentMethod {
    id: number; // 支付方式ID
    uuid: string; // 支付方式UUID
  
    // 支付方式名称
    name: string; 
  
    // 支付方式code
    code: string; 
  
    // 支付方式描述
    description: string; 
  
    // 支付方式图标
    icon: string; 
  
    // 支付方式url
    url: string; 
  
    // 支付方式状态 (1: 启用, 2: 禁用)
    status: number; 
  

  }