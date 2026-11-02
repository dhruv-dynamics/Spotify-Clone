import React from 'react'
import './Card.css'
import { FaPause, FaPlay } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { playSong, pauseSong } from '../../states/actors/songActor'
import { useGlobalContext } from '../../states/Context'

const Card = ({ song, idx }) => {
  const { masterSong, isPlaying } = useSelector((state) => state.mainSong)
  const { resetEverything, setSongIdx } = useGlobalContext()
  const dispatch = useDispatch()

  if (!song) return null

  const isCurrentSongPlaying = masterSong?.id === song?.id && isPlaying

  const handlePlay = (e) => {
    e.stopPropagation()
    setSongIdx(idx)
    if (isPlaying && masterSong?.mp3) {
      masterSong.mp3.currentTime = 0
      masterSong.mp3.pause()
      resetEverything()
    }
    dispatch(playSong(song))
  }

  const handlePause = (e) => {
    e.stopPropagation()
    dispatch(pauseSong())
  }

  return (
    <div
      onClick={isCurrentSongPlaying ? handlePause : handlePlay}
      className={`card group p-3.5 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#282828] bg-[#181818] ${
        masterSong?.id === song?.id ? 'ring-1 ring-white/20' : ''
      }`}
    >
      <div className="relative aspect-square w-full mb-3 rounded-lg overflow-hidden shadow-lg">
        <img
          src={song.img || "/assets/song.png"}
          alt={song.title}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
        />
        <div
          className={`absolute bottom-2 right-2 transition-all duration-300 ${
            isCurrentSongPlaying
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
          }`}
        >
          {isCurrentSongPlaying ? (
            <button
              onClick={handlePause}
              className='flex items-center justify-center w-11 h-11 rounded-full bg-[#1ed760] text-black shadow-xl hover:scale-105 transition'
              title="Pause"
            >
              <FaPause className='text-sm' />
            </button>
          ) : (
            <button
              onClick={handlePlay}
              className='flex items-center justify-center w-11 h-11 rounded-full bg-[#1ed760] text-black shadow-xl hover:scale-105 transition'
              title="Play"
            >
              <FaPlay className='text-sm pl-0.5' />
            </button>
          )}
        </div>
      </div>
      <h3 className={`text-sm font-semibold truncate ${masterSong?.id === song?.id ? 'text-[#1ed760]' : 'text-white'}`}>
        {song.title}
      </h3>
      <p className='text-xs text-neutral-400 truncate mt-1'>{song.artist}</p>
    </div>
  )
}

export default Card