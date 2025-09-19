import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 클래스명을 병합하고 중복을 제거하는 유틸 함수
 * clsx와 tailwind-merge를 조합하여 사용
 * @example cn("bg-red-500", isActive && "bg-blue-500") => isActive ? "bg-blue-500" : "bg-red-500"
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
