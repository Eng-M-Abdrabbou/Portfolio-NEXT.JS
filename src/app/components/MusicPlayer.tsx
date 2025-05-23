"use client";
import { useState, useEffect, useRef } from 'react';
import { FaVolumeUp, FaVolumeDown, FaPlay, FaPause, FaBackward, FaForward } from 'react-icons/fa';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode>();
  const animationRef = useRef<number>();
  const sourceRef = useRef<MediaElementAudioSourceNode>();
  const audioContextRef = useRef<AudioContext>();
  const progressBarRef = useRef<HTMLInputElement>(null);

  const tracks = [
    { name: 'Pixel Dreams', file: 'music/Pixel Dreams.mp3', author: 'Mahmoud Abdrabbou', image: '/img/pixel dreams.jpeg' },
    { name: 'Spring', file: 'music/Antonio Vivaldi- The Four Seasons- Spring- Allegro.mp3', author: 'Antonio Vivaldi', image: '/img/vivaldi spring.jpg' },
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Set initial duration for the first track
      const initialTrack = tracks[currentTrackIndex];
      audio.src = initialTrack.file;
      
      const setInitialDuration = () => {
        if (audio.duration > 0) {
          setDuration(audio.duration);
          audio.removeEventListener('loadedmetadata', setInitialDuration);
        }
      };

      audio.addEventListener('loadedmetadata', setInitialDuration);
      
      // Fallback method to set duration
      if (audio.duration > 0) {
        setDuration(audio.duration);
      }
    }
  }, [currentTrackIndex]);

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
  }, [tracks, currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const setAudioData = () => {
        setDuration(audio.duration);
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

  const changeTrack = (newIndex: number) => {
    setCurrentTrackIndex(newIndex);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (currentTrackIndex > 0 && isPlaying) {
        if (audio.readyState >= 2) { 
          if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume().then(() => {
              audio.play().catch(error => console.error("Error playing audio after track change:", error));
            });
          } else {
            audio.play().catch(error => console.error("Error playing audio after track change:", error));
          }
        } else {
          const playWhenReady = () => {
            audio.play().catch(error => console.error("Error playing audio after track change:", error));
            audio.removeEventListener('canplay', playWhenReady);
          };
          audio.addEventListener('canplay', playWhenReady);
          return () => {
            audio.removeEventListener('canplay', playWhenReady);
          };
        }
      }
    }
  }, [currentTrackIndex, isPlaying]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      cancelAnimationFrame(animationRef.current!);
    } else {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        audio.play().catch(error => console.error("Error playing audio:", error));
        visualize();
      } else {
        console.warn("AudioContext is closed. Cannot play audio.");
      }
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const audio = audioRef.current;
      if (!audio) return;

      switch (event.key) {
        case ' ':
          event.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          changeTrack((currentTrackIndex + 1) % tracks.length);
          break;
        case 'ArrowLeft':
          changeTrack((currentTrackIndex - 1 + tracks.length) % tracks.length);
          break;
        case 'ArrowDown':
          audio.currentTime = Math.max(0, audio.currentTime - 10); // Rewind 10 seconds
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, currentTrackIndex, tracks.length, togglePlay]);

  const visualize = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    const bars = Array.from({ length: 20 }, (_, i) => {
      const value = dataArray[i * Math.floor(bufferLength / 20)] / 255;
      return Math.max(0.1, value);
    });

    bars.forEach((height, i) => {
      document.documentElement.style.setProperty(`--visualizer-height-${i}`, height.toString());
    });

    animationRef.current = requestAnimationFrame(visualize);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
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

  const handleSeekEnd = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
      setIsSeeking(false);
      if (!isPlaying) {
        togglePlay(); // Auto-play after seeking if not already playing
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      if (isPlaying) {
        visualize();
        const interval = setInterval(visualize, 50);
        return () => clearInterval(interval);
      }
    } else if (isPlaying) {
       console.warn("AudioContext is closed. Cannot load or play new track.");
    }
  }, [currentTrackIndex, isPlaying, visualize]);

  return (
    <div className="fixed bottom-5 right-5 bg-navy backdrop-blur-sm bg-opacity-10 text-white p-4 rounded-xl shadow-lg flex flex-col space-y-3 w-72 border border-gray-700/50 transition-all duration-300">
      <div className="relative h-full w-full">
        {/* Visualization Bars */}
        <div className="absolute bottom-20 top-0 left-0 w-full h-full flex gap-1 justify-center items-end p-2 opacity-50 pointer-events-none mb-16">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-gradient-to-t from-neon-green to-neon-green rounded-xl"
              style={{ height: `calc(var(--visualizer-height-${i}) * 80px)` }}
            />
          ))}
        </div>

        {/* Track Info and Controls */}
        <div className="relative z-10 flex items-center space-x-4">
          {/* Album Art */}
          <img
            src={tracks[currentTrackIndex]?.image || '/img/Portfolio/1.png'} // Placeholder if no image
            alt="Album Art"
            className="w-16 h-16 rounded-xl object-cover shadow-md mb-12"
          />

          <div className="flex flex-col flex-grow">
            {/* Track Name and Author */}
            <p className="text-white/90 font-medium truncate text-sm">
              Title: {tracks[currentTrackIndex]?.name}
            </p>
            <p className="text-white/70 text-xs truncate">
              Author: {tracks[currentTrackIndex]?.author || 'Unknown Artist'}
            </p>

            {/* Time and Seek Bar */}
            <div className="flex items-center gap-1 mt-3">
              <span className="text-white/80 text-xs">{formatTime(currentTime)}</span>
              <input
                type="range"
                ref={progressBarRef}
                min="0"
                max={duration}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                onMouseUp={handleSeekEnd}
                onTouchEnd={handleSeekEnd}
                className="flex-grow h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-neon-green"
              />
              <span className="text-white/80 text-xs">{formatTime(duration)}</span>
            </div>

            {/* Playback Controls */}
            <div className="w-full justify-center mt-3 space-x-6 mr-6">
              <button
                onClick={() => changeTrack((currentTrackIndex - 1 + tracks.length) % tracks.length)}
                className="p-1 hover:bg-white/10 rounded-full transition-all"
              >
                <FaBackward className="text-white/80 text-lg" />
              </button>

              <button
                onClick={togglePlay}
                className="p-2 bg-gradient-to-br from-neon-green to-neon-green-900 rounded-full shadow-lg hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <FaPause className="text-white text-xl" />
                ) : (
                  <FaPlay className="text-white text-xl ml-0.5" />
                )}
              </button>

              <button
                onClick={() => changeTrack((currentTrackIndex + 1) % tracks.length)}
                className="p-1 hover:bg-white/10 rounded-full transition-all"
              >
                <FaForward className="text-white/80 text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Volume Control */}
        <div className="mt-4 flex items-center w-full gap-2 justify-center mb-8">
          <FaVolumeDown className="text-white/80" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolume}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-neon-green"
          />
          <FaVolumeUp className="text-white/80" />
        </div>

        <audio
          ref={audioRef}
          src={tracks[currentTrackIndex]?.file}
          onEnded={() => changeTrack((currentTrackIndex + 1) % tracks.length)}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;