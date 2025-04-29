'use client';

import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
size: number;
  baseX: number;
  baseY: number;
  density: number;
  color: string;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0, radius: 100 }); // Increased radius for subtle repulsion
  const accentColor = useRef('var(--accent-color)'); // Default color if CSS variable not found

  // Get accent color from CSS variable
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const style = getComputedStyle(document.body);
      const color = style.getPropertyValue('--accent-color').trim();
      if (color) {
        accentColor.current = color;
      }
    }
  }, []);

  // Initialize canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleDensity = 100; // Low density
    const particleSize = 1; // Small particles
    const tempParticles: Particle[] = [];

    for (let i = 0; i < particleDensity; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      tempParticles.push({
        x,
        y,
        size: particleSize,
        baseX: x,
        baseY: y,
        density: (Math.random() * 30) + 1,
        color: accentColor.current,
      });
    }
    particlesRef.current = tempParticles;

    // Handle window resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Re-initialize particles on resize to distribute them correctly
        const resizedParticles: Particle[] = [];
         for (let i = 0; i < particleDensity; i++) {
            const x = Math.random() * canvasRef.current.width;
            const y = Math.random() * canvasRef.current.height;
            resizedParticles.push({
              x,
              y,
              size: particleSize,
              baseX: x,
              baseY: y,
              density: (Math.random() * 30) + 1,
              color: accentColor.current,
            });
          }
          particlesRef.current = resizedParticles;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [accentColor]); // Depend on accentColor to re-initialize if it changes

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    let animationFrameId: number;

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        // Calculate distance to mouse
        const dx = mouse.current.x - particle.x;
        const dy = mouse.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = mouse.current.radius;
        const force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * particle.density;
        let directionY = forceDirectionY * force * particle.density;

        // Apply repulsion force
        if (distance < mouse.current.radius) {
          particle.x -= directionX;
          particle.y -= directionY;
        }


        // Ensure particles don't drift too far from their base position
        const maxDriftDistance = 100; // Maximum distance from base position
        const dxBase = particle.x - particle.baseX;
        const dyBase = particle.y - particle.baseY;
        const distanceToBase = Math.sqrt(dxBase * dxBase + dyBase * dyBase);

        if (distanceToBase > maxDriftDistance) {
          // If too far, pull them back towards the base position
          const returnForce = (distanceToBase - maxDriftDistance) / maxDriftDistance * 0.3; // Strength of the pull back
          particle.x -= dxBase * returnForce;
          particle.y -= dyBase * returnForce;
        }

        // Subtle random drift (always applied)
        const driftMagnitude = 0.09; // Control the magnitude of the random step for subtle drift
        particle.x += (Math.random() - 1.5) * driftMagnitude;
        particle.y += (Math.random() - 1.5) * driftMagnitude;

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // No dependencies, runs once on mount

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Ensure it's in the background
      }}
    />
  );
};

export default ParticleBackground;