/**
 * GameParticles.ts — Lightweight Canvas Particles, Confetti & Screen Shake Utility
 * Author & System Architect: Mohammad El-Menshawy (محمد المنشاوي)
 * 100% lightweight, zero dependencies, auto-cleanup, and respects prefers-reduced-motion.
 */

export function triggerConfetti(canvas: HTMLCanvasElement | null, durationMs: number = 1500): () => void {
  if (!canvas) return () => {};

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  // Check prefers-reduced-motion
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const width = (canvas.width = canvas.parentElement?.clientWidth || 400);
  const height = (canvas.height = canvas.parentElement?.clientHeight || 250);

  const colors = ['#FFC928', '#0878E8', '#10B981', '#F43F5E', '#8B5CF6', '#FFFFFF'];
  const particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    rotation: number;
    vRot: number;
    alpha: number;
  }> = [];

  for (let i = 0; i < 45; i++) {
    particles.push({
      x: width / 2 + (Math.random() * 60 - 30),
      y: height / 2 + (Math.random() * 40 - 20),
      vx: (Math.random() - 0.5) * 8,
      vy: -Math.random() * 6 - 2,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      alpha: 1,
    });
  }

  let animId: number;
  const startTime = Date.now();

  const render = () => {
    const elapsed = Date.now() - startTime;
    if (elapsed >= durationMs) {
      ctx.clearRect(0, 0, width, height);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25; // gravity
      p.rotation += p.vRot;
      p.alpha = Math.max(0, 1 - elapsed / durationMs);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      ctx.restore();
    });

    animId = requestAnimationFrame(render);
  };

  animId = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(animId);
    ctx.clearRect(0, 0, width, height);
  };
}

export function triggerMudSplash(canvas: HTMLCanvasElement | null, durationMs: number = 800): () => void {
  if (!canvas) return () => {};

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const width = (canvas.width = canvas.parentElement?.clientWidth || 400);
  const height = (canvas.height = canvas.parentElement?.clientHeight || 200);

  const particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
  }> = [];

  const mudColors = ['#5c3d1e', '#7c532b', '#3d2511', '#966538'];

  for (let i = 0; i < 30; i++) {
    particles.push({
      x: width / 2 + (Math.random() * 40 - 20),
      y: height - 20,
      vx: (Math.random() - 0.5) * 6,
      vy: -Math.random() * 5 - 2,
      size: Math.random() * 5 + 3,
      color: mudColors[Math.floor(Math.random() * mudColors.length)],
      alpha: 1,
    });
  }

  let animId: number;
  const startTime = Date.now();

  const render = () => {
    const elapsed = Date.now() - startTime;
    if (elapsed >= durationMs) {
      ctx.clearRect(0, 0, width, height);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3; // gravity
      p.alpha = Math.max(0, 1 - elapsed / durationMs);

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    animId = requestAnimationFrame(render);
  };

  animId = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(animId);
    ctx.clearRect(0, 0, width, height);
  };
}
