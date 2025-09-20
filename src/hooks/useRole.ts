'use client';

import { useState } from 'react';
import { UserRole } from '../dto/auth';

export const useRole = () => {
  // TODO: 유저 정보 조회 API 연동
  const [role, _setRole] = useState<UserRole>(UserRole.USER);
  return role;
};
