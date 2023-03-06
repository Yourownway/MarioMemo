import { useState, useEffect } from 'react';

export function UseScreenSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });


  const handleResize = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return { screenWidth: size.width, screenHeight: size.height };
}