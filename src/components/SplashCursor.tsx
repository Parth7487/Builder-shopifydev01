import { useEffect, useRef } from "react";

interface SplashCursorProps {
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  COLOR_UPDATE_SPEED?: number;
}

function SplashCursor({
  DENSITY_DISSIPATION = 2.5,
  VELOCITY_DISSIPATION = 1.8,
  SPLAT_RADIUS = 0.15,
  SPLAT_FORCE = 4000,
  COLOR_UPDATE_SPEED = 5,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Simple fluid-like effect using 2D canvas
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      hue: number;
    }> = [];

    function addParticle(x: number, y: number, force: number = 1) {
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * force * 8,
          vy: (Math.random() - 0.5) * force * 8,
          life: 1.0,
          hue: (Date.now() * 0.01 + Math.random() * 60) % 360,
        });
      }
    }

    function animate() {
      // Clear with slight fade
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Filter out dead particles
      particles = particles.filter((p) => p.life > 0);

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.008;
        p.vx *= 0.98;
        p.vy *= 0.98;

        const alpha = p.life * 0.6;
        const size = p.life * 4;

        // Create gradient for each particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
        gradient.addColorStop(0, `hsla(${p.hue}, 70%, 60%, ${alpha})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 70%, 60%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    // Event listeners
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      addParticle(x, y, 1.5);
    });

    canvas.addEventListener("mouseenter", (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      addParticle(x, y, 2);
    });

    // Touch events for mobile
    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      addParticle(x, y, 1.5);
    });

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Start animation
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    COLOR_UPDATE_SPEED,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40 pointer-events-auto"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

export default SplashCursor;
