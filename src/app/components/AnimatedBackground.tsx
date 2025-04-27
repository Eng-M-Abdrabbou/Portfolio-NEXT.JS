import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-navy via-light-navy to-lightest-navy opacity-70">
      {/* Optional: Add more elements here for animation or patterns */}
    </div>
  );
};

export default AnimatedBackground;