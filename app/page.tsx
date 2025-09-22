'use client';

import { BorderBeam } from '@/components/ui/border-beam';
import { Highlighter } from '@/components/ui/highlighter';
import { Meteors } from '@/components/ui/meteors';
import { useEffect, useRef } from 'react';

import Link from 'next/link';

export default function Home() {
  interface Vertex {
    pos: number[];
    velocity: number[];
    distance: number;
    size: number;
  }

  const TILE = 80;
  const OFFSET_FACTOR = 0.75;
  const RANDOM_Z_FACTOR = 2;
  const VELOCITY_CONSTANT = 8;
  const RANDOM_DISTANCE_MAX = 900;
  const RANDOM_SIZE_FACTOR = 2;

  const StarCanvasFar = () => {
    const animationFrameIdRef = useRef<number | null>(null);
    const resizeAnimationFrameIdRef = useRef(0);
    const onRenderRef = useRef<VoidFunction | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const parentElement = canvas?.parentElement;
      const ctx = canvas?.getContext('2d');
      const vertexMap: Record<string, Vertex> = {};
      const startTime = Date.now();

      function getVertex(sx: number, sy: number): Vertex {
        const id = `${sx}x${sy}`;

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!vertexMap[id]) {
          const x =
            TILE * sx + TILE * 1.5 * Math.random() - TILE * OFFSET_FACTOR;
          const y =
            TILE * sy + TILE * 1.5 * Math.random() - TILE * OFFSET_FACTOR;
          const z = Math.random() * RANDOM_Z_FACTOR;
          const vx = 1 + Math.random() * VELOCITY_CONSTANT;
          const vy = 1 + Math.random() * VELOCITY_CONSTANT;
          const distance = 10 + Math.random() * RANDOM_DISTANCE_MAX;
          const size = 0.1 + Math.random() * RANDOM_SIZE_FACTOR;

          vertexMap[id] = {
            pos: [x, y, z],
            velocity: [vx, vy],
            size,
            distance,
          };
        }
        return vertexMap[id];
      }

      onRenderRef.current = () => {
        const width = canvas?.width ?? 0;
        const height = canvas?.height ?? 0;
        const distTime = Date.now() - startTime;

        ctx?.clearRect(0, 0, width, height);

        const maxSX = Math.ceil(width / TILE);
        const maxSY = Math.ceil(height / TILE);

        for (let sx = 0; sx <= maxSX; ++sx) {
          for (let sy = 0; sy <= maxSY; ++sy) {
            const { velocity, distance, pos, size } = getVertex(sx, sy);
            const scalar = Math.sqrt(
              velocity[0] * velocity[0] + velocity[1] * velocity[1]
            );
            const totalDistance = (distTime * scalar) / 1000;
            const isReverse = Math.floor(totalDistance / distance) % 2 !== 0;
            let nextDistance = totalDistance % distance;

            if (isReverse) {
              nextDistance = distance - nextDistance;
            }
            const x = pos[0] + (nextDistance / scalar) * velocity[0];
            const y = pos[1] + (nextDistance / scalar) * velocity[1];
            const a = 1 - pos[2];

            ctx?.beginPath();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ctx!.fillStyle = `rgba(255, 255, 255, ${a})`;
            ctx?.arc(x, y, size, 0, 2 * Math.PI);
            ctx?.fill();
          }
        }
      };
      const observer = new ResizeObserver(() => {
        const inlineSize = parentElement?.offsetWidth ?? 0;
        const blockSize = parentElement?.offsetHeight ?? 0;

        cancelAnimationFrame(resizeAnimationFrameIdRef.current);
        resizeAnimationFrameIdRef.current = requestAnimationFrame(() => {
          if (canvas) {
            canvas.width = inlineSize;
            canvas.height = blockSize;
            canvas.style.cssText += `width: ${inlineSize}px; height: ${blockSize}px;`;
            onRenderRef.current?.();
          }
        });
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      parentElement && observer.observe(parentElement);

      return () => {
        cancelAnimationFrame(resizeAnimationFrameIdRef.current);
        observer.disconnect();
      };
    }, []);

    useEffect(() => {
      const requestAnimation = () => {
        onRenderRef.current?.();
        animationFrameIdRef.current = requestAnimationFrame(requestAnimation);
      };

      if (animationFrameIdRef.current === null) {
        animationFrameIdRef.current = requestAnimationFrame(requestAnimation);
      }

      return () => {
        if (animationFrameIdRef.current !== null) {
          cancelAnimationFrame(animationFrameIdRef.current);
          animationFrameIdRef.current = null;
        }
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed top-0 right-0 bottom-0 left-0 opacity-70"
      />
    );
  };

  const TILE_CLOSE = 600;

  const StarCanvasClose = () => {
    const animationFrameIdRef = useRef<number | null>(null);
    const resizeAnimationFrameIdRef = useRef(0);
    const onRenderRef = useRef<VoidFunction | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const parentElement = canvas?.parentElement;
      const ctx = canvas?.getContext('2d');
      const vertexMap: Record<string, Vertex> = {};
      const startTime = Date.now();

      function getVertex(sx: number, sy: number): Vertex {
        const id = `${sx}x${sy}`;

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!vertexMap[id]) {
          const x =
            TILE_CLOSE * sx +
            TILE_CLOSE * 1.5 * Math.random() -
            TILE_CLOSE * 0.75;
          const y =
            TILE_CLOSE * sy +
            TILE_CLOSE * 1.5 * Math.random() -
            TILE_CLOSE * 0.75;
          const z = Math.random() * 1;
          const vx = 1 + Math.random() * 200;
          const vy = 1 + Math.random() * 200;
          const distance = 3000 + Math.random() * 2000;
          const size = 100 + Math.random() * 100;

          vertexMap[id] = {
            pos: [x, y, z],
            velocity: [vx, vy],
            size,
            distance,
          };
        }
        return vertexMap[id];
      }

      onRenderRef.current = () => {
        const width = canvas?.width ?? 0;
        const height = canvas?.height ?? 0;
        const distTime = Date.now() - startTime;

        ctx?.clearRect(0, 0, width, height);

        const maxSX = Math.ceil(width / TILE_CLOSE);
        const maxSY = Math.ceil(height / TILE_CLOSE);

        for (let sx = 0; sx <= maxSX; ++sx) {
          for (let sy = 0; sy <= maxSY; ++sy) {
            const { velocity, distance, pos, size } = getVertex(sx, sy);
            const scalar = Math.sqrt(
              velocity[0] * velocity[0] + velocity[1] * velocity[1]
            );
            const totalDistance = (distTime * scalar) / 1000;
            const isReverse = Math.floor(totalDistance / distance) % 2 !== 0;
            let nextDistance = totalDistance % distance;

            if (isReverse) {
              nextDistance = distance - nextDistance;
            }
            const x = pos[0] + (nextDistance / scalar) * velocity[0];
            const y = pos[1] + (nextDistance / scalar) * velocity[1];
            const a = 1 - pos[2];

            ctx?.beginPath();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ctx!.fillStyle = `rgba(255, 255, 255, ${a})`;
            ctx?.arc(x, y, size, 0, 2 * Math.PI);
            ctx?.fill();
          }
        }
      };
      const observer = new ResizeObserver(() => {
        const inlineSize = parentElement?.offsetWidth ?? 0;
        const blockSize = parentElement?.offsetHeight ?? 0;

        cancelAnimationFrame(resizeAnimationFrameIdRef.current);
        resizeAnimationFrameIdRef.current = requestAnimationFrame(() => {
          if (canvas) {
            canvas.width = inlineSize;
            canvas.height = blockSize;
            canvas.style.cssText += `width: ${inlineSize}px; height: ${blockSize}px; filter: blur(100px); opacity: 0.15;`;
            onRenderRef.current?.();
          }
        });
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      parentElement && observer.observe(parentElement);

      return () => {
        cancelAnimationFrame(resizeAnimationFrameIdRef.current);
        observer.disconnect();
      };
    }, []);

    useEffect(() => {
      const requestAnimation = () => {
        onRenderRef.current?.();
        animationFrameIdRef.current = requestAnimationFrame(requestAnimation);
      };

      if (animationFrameIdRef.current === null) {
        animationFrameIdRef.current = requestAnimationFrame(requestAnimation);
      }

      return () => {
        if (animationFrameIdRef.current !== null) {
          cancelAnimationFrame(animationFrameIdRef.current);
          animationFrameIdRef.current = null;
        }
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className={
          'pointer-events-none fixed top-0 right-0 bottom-0 left-0 opacity-0 transition-opacity duration-100'
        }
      />
    );
  };

  return (
    <main className="flex flex-col items-center justify-center text-center py-20">
      <>
        <StarCanvasFar />
        <StarCanvasClose />
      </>
      <Meteors />
      <div
        className="relative overflow-hidden w-full max-w-6xl mx-auto border border-gray-800 rounded-2xl p-24"
        style={{
          backgroundImage: 'url(/Rectangle-home.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <BorderBeam duration={12} size={120} />

        <h1 className="text-6xl font-bold text-white mb-4">
          <Highlighter action="underline" color="#87CEFA">
            Invest in Authenticity
          </Highlighter>{' '}
        </h1>
        <p className="text-base text-gray-300 mb-8">
          Discover and acquire authenticated artworks, <br />
          exclusively verified by the world's leading galleries.
        </p>
        <Link href="marketplace">
          <button
            className="text-white font-bold py-3 px-21 rounded-full text-lg hover:shadow-xl/40 shadow-blue-500/50"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)), url(/pain.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            Explore the Marketplace
          </button>
        </Link>
      </div>
    </main>
  );
}
