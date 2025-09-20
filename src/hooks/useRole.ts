'use client';

import { useState, useEffect } from 'react';
import { UserRole, UserRoleDTO } from '@/src/dto/auth';
import { getCurrentUser } from '@/src/api/auth';

export const useRole = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const userInfo = await getCurrentUser();

        // API 응답의 user_type을 UserRole로 매핑
        const mappedRole =
          userInfo.user_type === UserRoleDTO.GALLERY
            ? UserRole.GALLERY
            : UserRole.USER;
        setRole(mappedRole);
      } catch (err) {
        console.error('Failed to fetch user role:', err);
        setError('사용자 정보를 불러오는데 실패했습니다.');
        // 에러 발생 시 기본값으로 USER 설정
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return { role, isLoading, error };
};
