'use client';

import { useState } from 'react';
import { ROLES } from '../constants/role';

export const useRole = () => {
  // TODO: 유저 정보 조회 API 연동
  const [role, setRole] = useState<keyof typeof ROLES>('USER');
  return role;
};
