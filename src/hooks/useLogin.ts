'use client';
import { useState } from 'react';
import { login as loginApi } from '@/src/api/auth';
import { AuthLoginResponse } from '@/src/dto/auth';

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AuthLoginResponse | null>(null);

  const login = async ({ account }: { account: string }) => {
    setLoading(true);
    try {
      const response = await loginApi({ wallet_address: account });
      window.localStorage.setItem('access_token', response.access_token);
      setData(response);
    } catch (err) {
      throw err; // 에러를 다시 throw하여 호출자에게 전달
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    data,
  };
};
