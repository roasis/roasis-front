'use client';
import type { ReactNode } from 'react';

interface UserTypeCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}

export default function UserTypeCard({
  title,
  description,
  icon,
  onClick,
}: UserTypeCardProps) {
  return (
    <div
      className={`flex-1 p-6 rounded-lg border-2 cursor-pointer transition-all hover:border-blue-400 border-gray-600 hover:bg-gray-800`}
      onClick={onClick}
    >
      <div className="text-center flex flex-col items-center justify-between h-full">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        <div className="flex justify-center">{icon}</div>
      </div>
    </div>
  );
}
