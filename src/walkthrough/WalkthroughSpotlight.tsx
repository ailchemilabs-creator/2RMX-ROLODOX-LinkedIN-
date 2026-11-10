import React, { useMemo } from 'react';
import { TargetRect } from './types';

interface WalkthroughSpotlightProps {
  targetRect: TargetRect | null;
  onBackdropClick?: () => void;
}

const SPOTLIGHT_PADDING = 6;
const BORDER_RADIUS = 14;

export const WalkthroughSpotlight: React.FC<WalkthroughSpotlightProps> = ({
  targetRect,
  onBackdropClick
}) => {
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

  // Memoize padded cutout bounds
  const cutout = useMemo(() => {
    if (!targetRect) return null;
    const x = Math.max(0, targetRect.left - SPOTLIGHT_PADDING);
    const y = Math.max(0, targetRect.top - SPOTLIGHT_PADDING);
    const width = Math.min(windowWidth - x, targetRect.width + SPOTLIGHT_PADDING * 2);
    const height = Math.min(windowHeight - y, targetRect.height + SPOTLIGHT_PADDING * 2);

    return { x, y, width, height };
  }, [targetRect, windowWidth, windowHeight]);

  return (
    <div 
      className="fixed inset-0 z-40 pointer-events-auto transition-opacity duration-300"
      onClick={onBackdropClick}
      aria-hidden="true"
    >
      <svg 
        className="w-full h-full block" 
        style={{ width: '100vw', height: '100vh' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="walkthrough-spotlight-mask" x="0" y="0" width="100%" height="100%">
            {/* White base fills entire screen */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            
            {/* Black cutout creates the transparent hole */}
            {cutout && (
              <rect
                x={cutout.x}
                y={cutout.y}
                width={cutout.width}
                height={cutout.height}
                rx={BORDER_RADIUS}
                ry={BORDER_RADIUS}
                fill="black"
              />
            )}
          </mask>
        </defs>

        {/* Backdrop overlay masked with the rounded spotlight cutout */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(4, 15, 30, 0.78)"
          mask="url(#walkthrough-spotlight-mask)"
        />
      </svg>

      {/* Active Focus Highlight Ring around spotlight element */}
      {cutout && (
        <div
          className="fixed pointer-events-none rounded-[14px] border-2 border-[#007BFF] transition-all duration-300 animate-pulse"
          style={{
            top: `${cutout.y}px`,
            left: `${cutout.x}px`,
            width: `${cutout.width}px`,
            height: `${cutout.height}px`,
            boxShadow: '0 0 0 2px rgba(0, 123, 255, 0.25), 0 0 24px rgba(0, 123, 255, 0.45)'
          }}
        />
      )}
    </div>
  );
};
