// src/app/components/GradientSpots.tsx
import React from 'react';

const GradientSpots = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-lightest-navy/20 blur-4xl opacity-75 animate-subtle-move-1"></div>
      <div className="absolute top-1/2 right-1/4 w-[28rem] h-[28rem] rounded-full bg-slate/10 blur-4xl opacity-75 animate-subtle-move-2"></div>
      <div className="absolute bottom-1/4 left-1/2 w-60 h-60 rounded-full bg-lightest-navy/20 blur-4xl opacity-75 animate-subtle-move-3"></div>
      <div className="absolute top-3/4 right-1/2 w-80 h-80 rounded-full bg-slate/10 blur-4xl opacity-45 animate-subtle-move-4"></div>
      <div className="absolute bottom-1/2 left-1/4 w-[26rem] h-[26rem] rounded-full bg-slate/10 blur-4xl opacity-75 animate-subtle-move-5"></div>
    </div>
  );
};

export default GradientSpots;