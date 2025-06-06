"use client";
import { useState, useEffect, useRef } from 'react';
import { FaVolumeUp, FaVolumeDown, FaPlay, FaPause, FaBackward, FaForward } from 'react-icons/fa';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false); // Keep this for the seek bar interaction

  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode>();
  const animationRef = useRef<number>(); 
  const sourceRef = useRef<MediaElementAudioSourceNode>();
  const audioContextRef = useRef<AudioContext>();
  const tracks = [
    { name: 'Pixel Dreams', file: 'music/Pixel Dreams.mp3', author: 'Mahmoud Abdrabbou', image: '/img/pixel dreams.jpeg' },
    { name: 'Spring', file: 'music/Antonio Vivaldi- The Four Seasons- Spring- Allegro.mp3', author: 'Antonio Vivaldi', image: '/img/vivaldi spring.jpg' },
  ];
  const bars = Array.from({ length: 20 });

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const initialTrack = tracks[currentTrackIndex];
      audio.src = initialTrack.file;
      
      const setInitialDuration = () => {
        if (audio.duration > 0 && !isNaN(audio.duration)) {
          setDuration(audio.duration);
        }
        audio.removeEventListener('loadedmetadata', setInitialDuration); 
      };

      audio.addEventListener('loadedmetadata', setInitialDuration);
      
      // Fallback for browsers that might fire 'loadedmetadata' too early or if duration is available immediately
      if (audio.duration > 0 && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    }
  }, [currentTrackIndex]);

  // EXACT LOGIC FROM YOUR WORKING FILE: Set up AudioContext, Analyser, and Source
  useEffect(() => {
    if (!audioContextRef.current) {
      // Ensure AudioContext is supported
      try {
        const AudioCtxt = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioCtxt();
      } catch (e) {
        console.error("Web Audio API is not supported in this browser.");
        return; // Exit if not supported
      }
    }
    const audioContext = audioContextRef.current;
    const audio = audioRef.current;

    if (audioContext.state !== 'closed' && audio) {
      if (!analyserRef.current) { // Create analyser only if it doesn't exist
        analyserRef.current = audioContext.createAnalyser();
        analyserRef.current.fftSize = 256;
      }

      // Create source node ONLY if it doesn't exist. This is CRITICAL.
      if (!sourceRef.current) { 
        sourceRef.current = audioContext.createMediaElementSource(audio);
      }
      // Connect the graph
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContext.destination);
    }

    return () => {
      // Disconnect only if analyser and source exist to avoid errors
      if (sourceRef.current && analyserRef.current) {
        try {
          sourceRef.current.disconnect(analyserRef.current);
          if (audioContext && audioContext.destination){
            analyserRef.current.disconnect(audioContext.destination);
          }
        } catch (e) {
          // console.warn("Error disconnecting audio nodes:", e);
        }
      }
    };
  }, [tracks, currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const setAudioData = () => {
        if (audio.duration > 0 && !isNaN(audio.duration)) setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      };

      const updateTime = () => {
        if (!isSeeking) {
          setCurrentTime(audio.currentTime);
        }
      };

      audio.addEventListener('loadedmetadata', setAudioData);
      audio.addEventListener('timeupdate', updateTime);

      return () => {
        audio.removeEventListener('loadedmetadata', setAudioData);
        audio.removeEventListener('timeupdate', updateTime);
      };
    }
  }, [isSeeking]);

  const changeTrack = (directionOrIndex: number, isAbsoluteIndex = false) => {
    let newIndex;
    if (isAbsoluteIndex) {
        newIndex = directionOrIndex;
    } else {
        newIndex = (currentTrackIndex + directionOrIndex + tracks.length) % tracks.length;
    }
    setCurrentTrackIndex(newIndex);
  };
  
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) { 
        if (audio.readyState >= 2) { 
          if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume().then(() => {
              audio.play().catch(error => console.error("Error playing audio after track change (context resumed):", error));
            });
          } else {
            audio.play().catch(error => console.error("Error playing audio after track change:", error));
          }
        } else {
          const playWhenReady = () => {
            audio.play().catch(error => console.error("Error playing audio after track change (canplay):", error));
            audio.removeEventListener('canplay', playWhenReady);
          };
          audio.addEventListener('canplay', playWhenReady);
          return () => {
            audio.removeEventListener('canplay', playWhenReady);
          };
        }
      }
  }, [currentTrackIndex, isPlaying]); // Dependencies from your original code

  // EXACT LOGIC FROM YOUR WORKING FILE: The visualization loop.
  const visualize = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    bars.forEach((_, i) => {
      const value = dataArray[i * Math.floor(bufferLength / 20)] / 255;
      const height = Math.max(0.1, value);
      document.documentElement.style.setProperty(`--visualizer-height-${i}`, height.toString());
    });

    animationRef.current = requestAnimationFrame(visualize);
  };

  // EXACT LOGIC FROM YOUR WORKING FILE: The main play/pause toggle.
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    } else {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        audio.play().catch(error => console.error("Error playing audio:", error));
        visualize(); // Start visualization
      } else {
        console.warn("AudioContext is closed or not initialized. Cannot play audio.");
      }
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const audio = audioRef.current;
      if (!audio) return;

      switch (event.key) {
        // case ' ':
        //   event.preventDefault();
        //   togglePlay();
        //   break;
        case 'ArrowRight':
          changeTrack(1); // Adapted to use new changeTrack helper
          break;
        case 'ArrowLeft':
          changeTrack(-1); // Adapted
          break;
        case 'ArrowDown':
          audio.currentTime = Math.max(0, audio.currentTime - 10);
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, currentTrackIndex, tracks.length, togglePlay]); // Original dependencies


  useEffect(() => {
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      if (isPlaying) {
        visualize(); 
        const interval = setInterval(visualize, 50); 
        return () => clearInterval(interval);
      } else {
        // Ensure animation is cancelled if not playing
        if(animationRef.current) cancelAnimationFrame(animationRef.current);
      }
    } else if (isPlaying) {
       console.warn("AudioContext is closed. Cannot load or play new track.");
    }
  }, [currentTrackIndex, isPlaying]); 

  const prevTrack = () => changeTrack(-1);
  const nextTrack = () => changeTrack(1);

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) audioRef.current.volume = parseFloat(e.target.value);
    setVolume(parseFloat(e.target.value));
  };


  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = parseFloat(e.target.value);
      setCurrentTime(seekTime); 
      if (!isSeeking) {
        setIsSeeking(true);
      }
    }
  };

  const handleSeekEnd = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = parseFloat(e.currentTarget.value);
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime); // Ensure state is in sync
      setIsSeeking(false);
      if (!isPlaying) { // Your original auto-play logic on seek end
        togglePlay();
      }
    }
  };


  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div
      className="fixed bottom-5 right-5 group bg-navy backdrop-blur-sm bg-opacity-20 text-white
                 shadow-lg border border-gray-700/50
                 transition-all duration-300 ease-in-out
                 w-[220px] h-[88px] rounded-full p-2
                 hover:w-72 hover:h-auto hover:rounded-xl hover:p-6"
    >
      {/* --- Compact View --- */}
      <div className="w-full h-full flex flex-col items-center justify-center
                     transition-opacity duration-200
                     opacity-100 visible group-hover:opacity-0 group-hover:invisible group-hover:h-0 group-hover:w-0">
        
        <p className="text-white/90 font-medium truncate text-sm mb-2 w-full text-center px-2">
          {tracks[currentTrackIndex]?.name}
        </p>

        <div className="flex justify-center items-center space-x-6">
          <button onClick={prevTrack} className="p-1 hover:bg-white/10 rounded-full transition-all" aria-label="Previous track">
            <FaBackward className="text-white/80 text-lg" />
          </button>
          <button onClick={togglePlay} className="p-2 bg-gradient-to-br from-neon-green/50 to-neon-green-900/50 rounded-full shadow-lg hover:scale-105 transition-transform" aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <FaPause className="text-white text-xl" /> : <FaPlay className="text-white text-xl ml-0.5" />}
          </button>
          <button onClick={nextTrack} className="p-1 hover:bg-white/10 rounded-full transition-all" aria-label="Next track">
            <FaForward className="text-white/80 text-lg" />
          </button>
        </div>
      </div>

      {/* --- Expanded View --- */}
      <div className="flex flex-col w-full transition-opacity duration-200 opacity-0 invisible h-0 group-hover:opacity-100 group-hover:visible group-hover:h-auto group-hover:w-full">
        <img
            src={tracks[currentTrackIndex]?.image || '/img/Portfolio/1.png'}
            alt="Album Art"
            className="w-full aspect-square object-cover rounded-lg shadow-lg"
        />
        <div className="mt-4 text-center">
            <p className="text-white/90 font-semibold text-lg truncate px-2">Title: {tracks[currentTrackIndex]?.name}</p>
            <p className="text-white/70 text-sm truncate px-2">Author: {tracks[currentTrackIndex]?.author || 'Unknown Artist'}</p>
        </div>
        
        {/* Visualizer Bars */}
        <div className="flex justify-center items-end gap-[2px] h-12 my-3 w-full px-2">
            {bars.map((_, i) => (
                <div
                    key={i}
                    className="w-full bg-neon-green rounded-full transition-all duration-100"
                    style={{ height: `calc(var(--visualizer-height-${i}, 0.1) * 100%)` }}
                />
            ))}
        </div>

        <div className="flex items-center gap-2 mt-1">
            <span className="text-white/80 text-xs w-10 text-center">{formatTime(currentTime)}</span>
            <input
                type="range" min="0" max={duration || 100} step="0.1"
                value={currentTime} 
                onChange={handleSeek}
                onMouseUp={handleSeekEnd}
                onTouchEnd={handleSeekEnd}
                className="flex-grow h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-neon-green"
            />
            <span className="text-white/80 text-xs w-10 text-center">{formatTime(duration)}</span>
        </div>
        <div className="flex justify-center items-center mt-4 space-x-6">
            <button onClick={prevTrack} className="p-1 text-white/80 hover:text-white transition-colors">
                <FaBackward className="text-2xl" />
            </button>
            <button onClick={togglePlay} className="p-3 bg-gradient-to-br from-neon-green to-teal-500 rounded-full shadow-lg hover:scale-105 transition-transform">
                {isPlaying ? <FaPause className="text-white text-2xl" /> : <FaPlay className="text-white text-2xl ml-1" />}
            </button>
            <button onClick={nextTrack} className="p-1 text-white/80 hover:text-white transition-colors">
                <FaForward className="text-2xl" />
            </button>
        </div>
        <div className="mt-4 flex items-center w-full gap-2">
            <FaVolumeDown className="text-white/70" />
            <input
                type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolume}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-neon-green"
            />
            <FaVolumeUp className="text-white/70" />
        </div>
      </div>
      
      <audio
        ref={audioRef}
        onEnded={nextTrack}
        crossOrigin="anonymous"
        className="hidden"
      />
    </div>
  );
};

export default AudioPlayer;