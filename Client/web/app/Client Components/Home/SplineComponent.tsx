'use client';

import { ComponentType, useEffect, useState } from 'react';

// Define the props interface for the Spline component
interface SplineProps {
  scene: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown; // Allow additional props
}

// Create a wrapper component that will only be rendered on the client side
export default function SplineComponent({
  scene,
  onLoad,
  onError,
  className = '',
  style = {},
}: SplineProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [Spline, setSpline] = useState<ComponentType<SplineProps> | null>(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Dynamically import the Spline component on the client side
    if (isMounted) {
      import('@splinetool/react-spline')
        .then((module) => {
          // Cast the default export to ComponentType<SplineProps>
          const SplineComponent = module.default as unknown as ComponentType<SplineProps>;
          setSpline(() => SplineComponent);
          if (onLoad) onLoad();
        })
        .catch((error) => {
          console.error('Failed to load Spline component:', error);
          if (onError) onError(error);
        });
    }
  }, [isMounted, onLoad, onError]);

  if (!isMounted || !Spline) {
    return (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!Spline) return null;
  
  return <Spline 
    scene={scene} 
    className={className} 
    style={style} 
    onLoad={onLoad}
    onError={onError}
  />;
}
