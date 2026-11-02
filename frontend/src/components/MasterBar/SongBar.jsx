import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineHeart, AiFillHeart, AiOutlinePlaySquare, AiOutlineArrowsAlt } from 'react-icons/ai'
import { CgScreen } from 'react-icons/cg'
import { BiShuffle, BiRepeat } from 'react-icons/bi'
import { IoMdSkipForward, IoMdSkipBackward } from 'react-icons/io'
import { PiMicrophoneStageDuotone } from 'react-icons/pi'
import { FaPause, FaPlay } from 'react-icons/fa'
import { HiMiniQueueList, HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import { BsFillSpeakerFill } from 'react-icons/bs'
import { pauseMaster, playMaster, playSong } from '../../states/actors/songActor'
import { useGlobalContext } from '../../states/Context'
import "./SongBar.css"
import { songs } from '../Home/Home'

const SongBar = () => {
    const dispatch = useDispatch()
    const { progress, setProgress, resetEverything, currTime, setCurrTime, songIdx, setSongIdx, duration, setDuration } = useGlobalContext()
    const { masterSong, isPlaying } = useSelector(state => state.mainSong)
    const [volume, setVolume] = useState(50)
    const [isLiked, setIsLiked] = useState(false)
    const [isRepeat, setIsRepeat] = useState(false)

    const handleMaster = () => {
        if (!masterSong?.mp3) {
            if (songs.length > 0) {
                setSongIdx(0)
                dispatch(playSong(songs[0]))
            }
            return
        }
        if (isPlaying) {
            dispatch(pauseMaster())
        } else {
            dispatch(playMaster())
        }
    }

    const formatTime = (durationInSeconds) => {
        if (!durationInSeconds || isNaN(durationInSeconds)) return "00:00"
        const min = Math.floor(durationInSeconds / 60)
        const sec = Math.round(durationInSeconds % 60)
        return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`
    }

    useEffect(() => {
        if (masterSong.mp3) {
            setDuration(formatTime(masterSong?.mp3?.duration))
            if (isPlaying) {
                masterSong?.mp3?.play()
            } else {
                masterSong?.mp3?.pause()
            }
        }

        const interval = setInterval(() => {
            if (isPlaying && masterSong?.mp3) {
                const current = masterSong.mp3.currentTime
                const total = masterSong.mp3.duration

                if (current >= total || progress >= 100) {
                    if (isRepeat) {
                        masterSong.mp3.currentTime = 0
                        masterSong.mp3.play()
                    } else {
                        forwardSong()
                    }
                } else if (total > 0) {
                    setProgress(Math.round((current / total) * 100))
                }
                setCurrTime(formatTime(current))
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [masterSong, isPlaying, isRepeat])

    const changeProgress = (e) => {
        const val = Number(e.target.value)
        setProgress(val)
        if (masterSong?.mp3?.duration) {
            masterSong.mp3.currentTime = (val / 100) * masterSong.mp3.duration
        }
    }

    const changeVolume = (e) => {
        const val = Number(e.target.value)
        setVolume(val)
        if (masterSong?.mp3) {
            masterSong.mp3.volume = val / 100
        }
    }

    const forwardSong = () => {
        if (!songs || songs.length === 0) return
        if (masterSong?.mp3) {
            masterSong.mp3.pause()
            masterSong.mp3.currentTime = 0
        }
        resetEverything()
        const nextIdx = (songIdx + 1) % songs.length
        setSongIdx(nextIdx)
        dispatch(playSong(songs[nextIdx]))
    }

    const backwardSong = () => {
        if (!songs || songs.length === 0) return
        if (masterSong?.mp3) {
            masterSong.mp3.pause()
            masterSong.mp3.currentTime = 0
        }
        resetEverything()
        const prevIdx = (songIdx - 1 + songs.length) % songs.length
        setSongIdx(prevIdx)
        dispatch(playSong(songs[prevIdx]))
    }

    return (
        <div className='fixed px-4 bottom-0 flex items-center justify-between left-0 h-20 bg-[#181818] border-t border-white/10 w-full z-50'>
            {/* Song Info */}
            <div className="w-3/12 flex items-center">
                <div className="flex gap-3 items-center">
                    <img
                        src={masterSong?.img || "/assets/song.png"}
                        alt={masterSong?.title || "Music Player"}
                        className='h-14 w-14 rounded-md object-cover bg-neutral-800'
                    />
                    <div className="flex flex-col justify-center min-w-0">
                        <h3 className='text-sm font-semibold text-white truncate max-w-[160px]'>
                            {masterSong?.title || "Welcome to Spotify"}
                        </h3>
                        <span className='text-xs text-neutral-400 truncate max-w-[160px]'>
                            {masterSong?.artist || "Curated by Dhruv"}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsLiked(!isLiked)}
                        className='ml-2 text-xl text-neutral-400 hover:text-white transition'
                        title={isLiked ? "Unlike" : "Like"}
                    >
                        {isLiked ? <AiFillHeart className='text-[#1ed760]' /> : <AiOutlineHeart />}
                    </button>
                </div>
            </div>

            {/* Playback Controls */}
            <div className="w-6/12 flex flex-col items-center">
                <div className="flex justify-center items-center gap-6 mb-1">
                    <button className='text-neutral-400 hover:text-white transition text-lg' title="Shuffle">
                        <BiShuffle />
                    </button>
                    <button onClick={backwardSong} className='text-neutral-300 hover:text-white transition text-2xl' title="Previous">
                        <IoMdSkipBackward />
                    </button>
                    <button
                        onClick={handleMaster}
                        className='flex justify-center rounded-full items-center bg-white hover:scale-105 active:scale-95 transition p-2.5 shadow'
                        title={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? (
                            <FaPause className='text-black text-sm' />
                        ) : (
                            <FaPlay className='text-black text-sm pl-0.5' />
                        )}
                    </button>
                    <button onClick={forwardSong} className='text-neutral-300 hover:text-white transition text-2xl' title="Next">
                        <IoMdSkipForward />
                    </button>
                    <button
                        onClick={() => setIsRepeat(!isRepeat)}
                        className={`transition text-lg ${isRepeat ? "text-[#1ed760]" : "text-neutral-400 hover:text-white"}`}
                        title="Repeat"
                    >
                        <BiRepeat />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-3 w-full max-w-xl">
                    <span className="text-xs text-neutral-400 w-10 text-right">{currTime}</span>
                    <div className="relative w-full flex items-center">
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={progress}
                            disabled={!masterSong?.mp3}
                            onChange={changeProgress}
                            className='w-full'
                            id="progress_bar"
                        />
                        <div className="active_progress" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="text-xs text-neutral-400 w-10">{duration}</span>
                </div>
            </div>

            {/* Volume & Extra Controls */}
            <div className="w-3/12 flex items-center justify-end gap-3 text-neutral-400">
                <button className='hover:text-white transition text-lg hidden lg:block'>
                    <AiOutlinePlaySquare />
                </button>
                <button className='hover:text-white transition text-lg hidden lg:block'>
                    <PiMicrophoneStageDuotone />
                </button>
                <button className='hover:text-white transition text-lg hidden sm:block'>
                    <HiMiniQueueList />
                </button>
                <div className="flex items-center gap-2 w-32">
                    <button
                        onClick={() => changeVolume({ target: { value: volume > 0 ? 0 : 50 } })}
                        className='hover:text-white transition text-xl'
                    >
                        {volume <= 0 ? <HiSpeakerXMark /> : <HiSpeakerWave />}
                    </button>
                    <div className="relative w-full flex items-center">
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={volume}
                            disabled={!masterSong?.mp3}
                            onChange={changeVolume}
                            className='w-full block'
                            id="volume_bar"
                        />
                        <div className="active_progress" style={{ width: `${volume}%` }}></div>
                    </div>
                </div>
                <button className='hover:text-white transition text-lg hidden sm:block'>
                    <AiOutlineArrowsAlt />
                </button>
            </div>
        </div>
    )
}

export default SongBar