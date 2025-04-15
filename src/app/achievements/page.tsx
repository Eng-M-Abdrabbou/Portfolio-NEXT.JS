// src/app/achievements/page.tsx
import React from 'react';
import Link from 'next/link';
import { FaLock, FaTrophy } from 'react-icons/fa'; // Example icons

const AchievementsPage = () => {
  // Placeholder for achievements state - you'll need logic to track unlocked achievements
  const unlockedAchievements = ['solved-first-puzzle']; // Example

  const achievementsList = [
    { id: 'solved-first-puzzle', name: 'Puzzle Solver', description: 'You found and solved the first hidden challenge!', unlocked: true },
    { id: 'found-secret-page', name: 'Explorer', description: 'You discovered a hidden corner of the site.', unlocked: false },
    { id: 'easter-egg-master', name: 'Egg Hunter', description: 'Found all the easter eggs.', unlocked: false },
    // Add more achievements here
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-navy text-lightest-slate p-8 relative">
      <h1 className="text-4xl font-bold mb-6">Achievements</h1>
      <p className="text-lg text-slate mb-10 text-center max-w-lg">
        Welcome to the Hall of Achievements! Solve hidden challenges and easter eggs throughout the site to unlock these accolades.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {achievementsList.map((ach) => (
          <div
            key={ach.id}
            className={`p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition-all duration-300 ${
              ach.unlocked ? 'bg-light-navy border-2 border-neon-green' : 'bg-lightest-navy opacity-60'
            }`}
          >
            {ach.unlocked ? (
              <FaTrophy className="text-4xl text-neon-green mb-4" />
            ) : (
              <FaLock className="text-4xl text-slate mb-4" />
            )}
            <h2 className={`text-xl font-semibold mb-2 ${ach.unlocked ? 'text-lightest-slate' : 'text-slate'}`}>
              {ach.name}
            </h2>
            <p className={`text-sm ${ach.unlocked ? 'text-light-slate' : 'text-slate/80'}`}>
              {ach.description}
            </p>
          </div>
        ))}
      </div>

      <Link href="/" className="mt-12 inline-block bg-neon-green text-navy font-medium py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors duration-300">
          Return Home
      </Link>

       <footer className="absolute bottom-8 text-center text-sm text-dark-slate font-mono">
           <p>© {new Date().getFullYear()} Mahmoud Abdrabbou</p>
       </footer>
    </div>
  );
};

export default AchievementsPage;