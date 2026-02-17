"use client";

import { useRef, useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function LottieIcon({ 
  animationUrl, 
  hover = false, 
  size = 40,
  loop = false,
  autoplay = false,
  direction = 1,
  color
}) {
  const lottieRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Animation data fetch karein
    if (animationUrl) {
      fetch(animationUrl)
        .then(response => response.json())
        .then(data => setAnimationData(data))
        .catch(err => console.error('Lottie load error:', err));
    }
  }, [animationUrl]);

  useEffect(() => {
    if (!lottieRef.current || !animationData) return;

    if (hover && isHovered) {
      lottieRef.current.play();
    } else if (hover && !isHovered) {
      lottieRef.current.stop();
    }
  }, [isHovered, hover, animationData]);

  if (!animationData) {
    return (
      <div 
        style={{
          width: size,
          height: size,
          background: 'rgba(1, 103, 18, 0.1)',
          borderRadius: '8px'
        }}
      />
    );
  }

  return (
    <div
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => hover && setIsHovered(false)}
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{
          width: size,
          height: size,
          filter: color ? `drop-shadow(0 0 1px ${color})` : 'none'
        }}
        onLoaded={() => {
          if (lottieRef.current && hover) {
            lottieRef.current.stop();
          }
        }}
      />
    </div>
  );
}