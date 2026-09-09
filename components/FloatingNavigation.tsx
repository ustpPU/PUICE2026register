'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FloatingNavigation() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const update = () => setShowTop(window.scrollY > 500);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <div className="floating-nav" aria-label="Navigasi pantas">
    <div className="floating-nav-actions">
      <Link href="/kemuncak" aria-label="Ke halaman Kemuncak" title="Kemuncak">⌂</Link>
      {showTop && <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Kembali ke atas" title="Ke atas">↑</button>}
    </div>
  </div>;
}
