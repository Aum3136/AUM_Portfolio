import React, { useState, useEffect, useRef } from 'react';
import './Cursor.css';

export function Cursor() {
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'hover' | 'project' | 'link'
  const [isVisible, setIsVisible] = useState(false);
  const [isHoverSupported, setIsHoverSupported] = useState(false);

  const dotPosRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const requestRef = useRef(null);

  // Touch / Mobile check using window.matchMedia('(hover: hover)')
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    setIsHoverSupported(mediaQuery.matches);

    const handleChange = (e) => setIsHoverSupported(e.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!isHoverSupported) return;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);

      const x = e.clientX;
      const y = e.clientY;

      dotPosRef.current = { x, y };
      setDotPos({ x, y });

      const target = e.target;
      if (target && target instanceof Element) {
        if (target.closest('[data-cursor="project"]')) {
          setCursorType('project');
        } else if (target.closest('[data-cursor="link"]')) {
          setCursorType('link');
        } else if (target.closest('a, button, [data-cursor="hover"]')) {
          setCursorType('hover');
        } else {
          setCursorType('default');
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // rAF loop for smooth ring lerping (lag factor 0.12)
    const animate = () => {
      ringPosRef.current.x += (dotPosRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (dotPosRef.current.y - ringPosRef.current.y) * 0.12;

      setRingPos({ x: ringPosRef.current.x, y: ringPosRef.current.y });
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isHoverSupported, isVisible]);

  if (!isHoverSupported) return null;

  const getRingText = () => {
    if (cursorType === 'project') return 'VIEW →';
    if (cursorType === 'link') return '↗';
    return null;
  };

  return (
    <>
      {/* Precise Dot Cursor */}
      <div
        className={`cursor-dot cursor-dot--${cursorType} ${!isVisible ? 'cursor-hidden' : ''}`}
        style={{
          transform: `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`,
        }}
      />
      {/* Lerped Ring Cursor */}
      <div
        className={`cursor-ring cursor-ring--${cursorType} ${!isVisible ? 'cursor-hidden' : ''}`}
        style={{
          transform: `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`,
        }}
      >
        <div className="cursor-ring-inner">
          {getRingText()}
        </div>
      </div>
    </>
  );
}
