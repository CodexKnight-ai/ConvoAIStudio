'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Define the props interface for the Spline component
interface SplineProps {
  scene: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  style?: React.CSSProperties;
}

// Create a wrapper component that handles the dynamic import
export default function SplineWrapper(props: SplineProps) {
  const Spline = dynamic(
    () => import('@splinetool/react-spline').then((mod) => {
      // The Spline component is the default export
      const SplineComponent = mod.default as ComponentType<SplineProps>;
      return SplineComponent;
    }),
    { 
      ssr: false,
      loading: () => (
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )
    }
  ) as ComponentType<SplineProps>;

  return <Spline {...props} />;
}
