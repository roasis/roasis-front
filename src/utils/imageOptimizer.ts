/**
 * 이미지 최적화 유틸리티 함수들
 * 가로세로 비율을 유지하면서 이미지를 최적화합니다.
 */

export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 ~ 1.0
  format?: 'jpeg' | 'png' | 'webp';
  maintainAspectRatio?: boolean;
}

export interface OptimizedImageResult {
  file: File;
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
  dimensions: {
    original: { width: number; height: number };
    optimized: { width: number; height: number };
  };
}

/**
 * 이미지 파일을 최적화합니다.
 * @param file 원본 이미지 파일
 * @param options 최적화 옵션
 * @returns 최적화된 이미지 파일과 메타데이터
 */
export const optimizeImage = async (
  file: File,
  options: ImageOptimizationOptions = {}
): Promise<OptimizedImageResult> => {
  const {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.8,
    format = 'jpeg',
    maintainAspectRatio = true,
  } = options;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }

    img.onload = () => {
      try {
        // 원본 이미지 크기
        const originalWidth = img.width;
        const originalHeight = img.height;

        // 최적화된 크기 계산 (비율 유지)
        const { width, height } = calculateOptimalDimensions(
          originalWidth,
          originalHeight,
          maxWidth,
          maxHeight,
          maintainAspectRatio
        );

        // Canvas 크기 설정
        canvas.width = width;
        canvas.height = height;

        // 이미지 그리기
        ctx.drawImage(img, 0, 0, width, height);

        // 최적화된 이미지로 변환
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create optimized image'));
              return;
            }

            // 파일명 생성 (확장자 변경)
            const fileName = generateFileName(file.name, format);
            const optimizedFile = new File([blob], fileName, {
              type: `image/${format}`,
            });

            const result: OptimizedImageResult = {
              file: optimizedFile,
              originalSize: file.size,
              optimizedSize: blob.size,
              compressionRatio: Math.round((1 - blob.size / file.size) * 100),
              dimensions: {
                original: { width: originalWidth, height: originalHeight },
                optimized: { width, height },
              },
            };

            resolve(result);
          },
          `image/${format}`,
          quality
        );
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // 이미지 로드
    img.src = URL.createObjectURL(file);
  });
};

/**
 * 최적화된 이미지 크기를 계산합니다.
 * @param originalWidth 원본 너비
 * @param originalHeight 원본 높이
 * @param maxWidth 최대 너비
 * @param maxHeight 최대 높이
 * @param maintainAspectRatio 비율 유지 여부
 * @returns 최적화된 크기
 */
const calculateOptimalDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number,
  maintainAspectRatio: boolean
): { width: number; height: number } => {
  if (!maintainAspectRatio) {
    return {
      width: Math.min(originalWidth, maxWidth),
      height: Math.min(originalHeight, maxHeight),
    };
  }

  // 비율 유지하면서 크기 조정
  const aspectRatio = originalWidth / originalHeight;

  let width = originalWidth;
  let height = originalHeight;

  // 너비가 최대값을 초과하는 경우
  if (width > maxWidth) {
    width = maxWidth;
    height = width / aspectRatio;
  }

  // 높이가 최대값을 초과하는 경우
  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
  };
};

/**
 * 파일명을 생성합니다.
 * @param originalName 원본 파일명
 * @param format 새로운 포맷
 * @returns 새로운 파일명
 */
const generateFileName = (originalName: string, format: string): string => {
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
  const timestamp = Date.now();
  return `${nameWithoutExt}_optimized_${timestamp}.${format}`;
};

/**
 * 이미지 파일 유효성을 검사합니다.
 * @param file 검사할 파일
 * @param maxSizeInMB 최대 파일 크기 (MB)
 * @returns 유효성 검사 결과
 */
export const validateImageFile = (
  file: File,
  maxSizeInMB: number = 10
): { isValid: boolean; error?: string } => {
  // 파일 타입 검사
  if (!file.type.startsWith('image/')) {
    return {
      isValid: false,
      error: '이미지 파일만 업로드할 수 있습니다.',
    };
  }

  // 지원하는 이미지 포맷 검사
  const supportedFormats = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ];
  if (!supportedFormats.includes(file.type)) {
    return {
      isValid: false,
      error: 'JPEG, PNG, WebP 형식의 이미지만 지원합니다.',
    };
  }

  // 파일 크기 검사
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    return {
      isValid: false,
      error: `파일 크기는 ${maxSizeInMB}MB를 초과할 수 없습니다.`,
    };
  }

  return { isValid: true };
};

/**
 * 이미지 미리보기 URL을 생성합니다.
 * @param file 이미지 파일
 * @returns 미리보기 URL
 */
export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = () => {
      reject(new Error('Failed to read image file'));
    };
    reader.readAsDataURL(file);
  });
};

/**
 * 이미지 최적화 진행률을 추적하는 함수
 * @param file 원본 파일
 * @param options 최적화 옵션
 * @param onProgress 진행률 콜백 (0-100)
 * @returns 최적화된 이미지 결과
 */
export const optimizeImageWithProgress = async (
  file: File,
  options: ImageOptimizationOptions = {},
  onProgress?: (progress: number) => void
): Promise<OptimizedImageResult> => {
  // 진행률 시뮬레이션 (실제로는 이미지 처리 시간에 따라 조정)
  const steps = [
    { progress: 20, message: '이미지 로딩 중...' },
    { progress: 50, message: '이미지 분석 중...' },
    { progress: 80, message: '이미지 최적화 중...' },
    { progress: 100, message: '완료' },
  ];

  let currentStep = 0;
  const progressInterval = setInterval(() => {
    if (currentStep < steps.length && onProgress) {
      onProgress(steps[currentStep].progress);
      currentStep++;
    }
  }, 100);

  try {
    const result = await optimizeImage(file, options);
    clearInterval(progressInterval);
    if (onProgress) onProgress(100);
    return result;
  } catch (error) {
    clearInterval(progressInterval);
    throw error;
  }
};
