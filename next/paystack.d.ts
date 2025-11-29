// types/paystack.d.ts

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: PaystackOptions) => void;
    };
  }

  interface PaystackOptions {
    key: string;
    email: string;
    amount: number;
    reference: string;
    callback: (response: any) => void;
    onclose: () => void;
  }
}

export {};
