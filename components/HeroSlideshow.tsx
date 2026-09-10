'use client';

import { useEffect, useState } from 'react';
import { sitePath } from '../lib/runtime-paths';

type HeroSlideshowProps = {
  images: readonly string[];
  className?: string;
  intervalSeconds?: number;
};

export default function HeroSlideshow({ images, className = '', intervalSeconds = 5 }: HeroSlideshowProps) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (images.length < 2) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % images.length), intervalSeconds * 1000);
    return () => window.clearInterval(timer);
  }, [images.length, intervalSeconds]);
  return <div className={`hero-slideshow ${className}`} aria-hidden="true">
    {images.map((image, index) => <img
      key={image}
      className={index === active ? 'active' : ''}
      src={sitePath(image)}
      alt=""
      decoding="async"
      fetchPriority={index === 0 ? 'high' : 'auto'}
    />)}
  </div>;
}
