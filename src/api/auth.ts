import httpV1 from './http';
import { AuthLoginRequest, AuthLoginResponse } from '../dto/auth';

export const login = async ({ wallet_address }: AuthLoginRequest) => {
  const response = await httpV1.post<AuthLoginResponse>('/auth/login', {
    wallet_address,
  });
  return response.data;
};
