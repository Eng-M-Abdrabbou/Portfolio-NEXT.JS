"use client";
import { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaBackward, FaForward } from 'react-icons/fa';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode>();
  const animationRef = useRef<number>();
  const sourceRef = useRef<MediaElementAudioSourceNode>();
  const audioContextRef = useRef<AudioContext>();

  const tracks = [
    { name: 'Pixel Dreams', file: 'music/Pixel Dreams.mp3' },
    { name: 'Spring', file: 'music/Antonio Vivaldi- The Four Seasons- Spring- Allegro.mp3' },
  ];

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    const audioContext = audioContextRef.current;

    if (audioContext.state !== 'closed') {
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      if (audioRef.current) {
        if (!sourceRef.current) {
          const source = audioContext.createMediaElementSource(audioRef.current);
          sourceRef.current = source;
        }
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContext.destination);
      }
    }

    return () => {
      sourceRef.current?.disconnect();
    };
  }, []);

  const visualize = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    const bars = Array.from({ length: 20 }, (_, i) => {
      const value = dataArray[i * Math.floor(bufferLength / 20)] / 255;
      return Math.max(0.1, value);
    });

    document.documentElement.style.setProperty('--visualizer-height', bars.join(','));
    
    animationRef.current = requestAnimationFrame(visualize);
  };

  const togglePlay = async () => {
    if (isPlaying) {
      audioRef.current?.pause();
      cancelAnimationFrame(animationRef.current!);
    } else {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        audioRef.current?.play().catch(error => console.error("Error playing audio:", error));
        visualize();
      } else {
        console.warn("AudioContext is closed. Cannot play audio.");
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  useEffect(() => {
    if (audioRef.current && audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(error => console.error("Error playing audio:", error));
        visualize();
      }
    } else if (isPlaying) {
       console.warn("AudioContext is closed. Cannot load or play new track.");
    }
  }, [currentTrackIndex, isPlaying]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/20">
        {/* Visualization Bars */}
        <div className="absolute top-0 left-0 w-full h-full flex gap-1.5 justify-center items-end p-4 opacity-50 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="w-2 bg-gradient-to-t from-green-400 to-cyan-400 rounded-t"
              style={{ height: `calc(var(--visualizer-height-${i}) * 100px)` }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="relative flex items-center justify-between gap-4">
          <button 
            onClick={() => setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)}
            className="p-2 hover:bg-white/10 rounded-full transition-all"
          >
            <FaBackward className="text-white/80" />
          </button>

          <button
            onClick={togglePlay}
            className="p-4 bg-gradient-to-br from-cyan-400 to-green-500 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <FaPause className="text-white text-xl" />
            ) : (
              <FaPlay className="text-white text-xl ml-0.5" />
            )}
          </button>

          <button
            onClick={() => setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)}
            className="p-2 hover:bg-white/10 rounded-full transition-all"
          >
            <FaForward className="text-white/80" />
          </button>
        </div>

        {/* Track Info */}
        <div className="mt-4 text-center">
          <p className="text-white/90 font-medium truncate">
            {tracks[currentTrackIndex]?.name}
          </p>
        </div>

        {/* Volume Control */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolume}
            className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <audio
          ref={audioRef}
          src={tracks[currentTrackIndex]?.file}
          onEnded={() => setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;