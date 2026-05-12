import { useEffect, useState } from 'react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [follower, setFollower] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTimeout(() => setFollower({ x: e.clientX, y: e.clientY }), 80);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      <div className="cursor" style={{ left: pos.x, top: pos.y }} />
      <div className="cursor-follower" style={{ left: follower.x, top: follower.y }} />
    </>
  );
}
