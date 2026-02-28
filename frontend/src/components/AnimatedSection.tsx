import React, { useEffect, useRef, useState } from 'react';

type AnimationType = 'fadeIn' | 'slideUp' | 'zoomIn' | 'slideInLeft' | 'slideInRight';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  animation = 'fadeIn',
  delay = 0,
  className = '',
  threshold = 0.15,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const animClass = visible ? `animate-${animation}` : 'anim-hidden';

  return (
    <div
      ref={ref}
      className={`${animClass} ${className}`}
      style={visible ? { animationDelay: `${delay}ms` } : {}}
    >
      {children}
    </div>
  );
}
