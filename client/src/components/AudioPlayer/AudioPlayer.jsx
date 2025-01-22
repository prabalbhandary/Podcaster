import React, { useEffect, useRef, useState } from "react";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { FaPause, FaPlay } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { audioPlayerActions } from "../../store/AudioPlayer/AudioPlayer";

const AudioPlayer = () => {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef();

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const isPlayerDiv = useSelector((state) => state.audioPlayer.isPlayerDiv);
  const songPath = useSelector((state) => state.audioPlayer.songPath);
  const img = useSelector((state) => state.audioPlayer.img);

  const closeAudioPlayerDiv = (e) => {
    e.preventDefault();
    dispatch(audioPlayerActions.closeDiv());
    dispatch(audioPlayerActions.changeImg(""));
    dispatch(audioPlayerActions.changeSong(""));
  };

  const handlePlayPodcast = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetaData = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const backward = () => {
    if (audioRef.current) {
      let newTime = Math.max(audioRef.current.currentTime - 10, 0);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const forward = () => {
    if (audioRef.current) {
      let newTime = Math.min(audioRef.current.currentTime + 10, duration);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const newTime = (e.target.value / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    const currentAudio = audioRef.current;

    if (currentAudio) {
      currentAudio.addEventListener("timeupdate", handleTimeUpdate);
      currentAudio.addEventListener("loadedmetadata", handleLoadedMetaData);
      currentAudio.addEventListener("ended", handleAudioEnded);

      if (!isPlaying && currentAudio.paused && songPath) {
        currentAudio.play();
        setIsPlaying(true);
      }
    }

    return () => {
      if (currentAudio) {
        currentAudio.removeEventListener("timeupdate", handleTimeUpdate);
        currentAudio.removeEventListener("loadedmetadata", handleLoadedMetaData);
        currentAudio.removeEventListener("ended", handleAudioEnded);
      }
    };
  }, [songPath, isPlaying]);

  return (
    <div
      className={`${
        isPlayerDiv ? "fixed" : "hidden"
      } bottom-0 left-0 w-[100%] bg-zinc-900 text-zinc-300 p-4 rounded flex items-center gap-4`}
    >
      <div className="hidden md:block w-1/3">
        <img
          src={img}
          alt="SongImg"
          className={`size-12 rounded-full object-cover`}
        />
      </div>
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center gap-4 text-xl">
          <button onClick={backward}>
            <IoPlaySkipBack />
          </button>
          <button onClick={handlePlayPodcast}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={forward}>
            <IoPlaySkipForward />
          </button>
        </div>
        <div className="flex items-center justify-center mt-3 w-full">
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            className="w-full hover:cursor-pointer"
          />
        </div>
        <div className="w-full flex items-center justify-between text-sm">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="w-1/3 flex items-center justify-end">
        <button onClick={closeAudioPlayerDiv}>
          <ImCross />
        </button>
      </div>
      <audio ref={audioRef} src={songPath} autoPlay />
    </div>
  );
};

export default AudioPlayer;