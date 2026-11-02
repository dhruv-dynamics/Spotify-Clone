import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { FaAngleLeft, FaAngleRight, FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa'
import Card from '../Card/Card'
import { Link } from 'react-router-dom'
import SongBar from '../MasterBar/SongBar'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { userActor, logoutActor } from '../../states/actors/userActor'

export const songs = [
  {
    id: 1,
    title: "Acoustic Breeze",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60",
    artist: "Benjamin Tissot (Royalty Free)",
    mp3: new Audio("https://cdn.jsdelivr.net/gh/KamalAlyKamal/spotify-clone@master/assets/music/bensound-acousticbreeze.mp3")
  },
  {
    id: 2,
    title: "A New Beginning",
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60",
    artist: "Benjamin Tissot (Royalty Free)",
    mp3: new Audio("https://cdn.jsdelivr.net/gh/KamalAlyKamal/spotify-clone@master/assets/music/bensound-anewbeginning.mp3")
  },
  {
    id: 3,
    title: "Better Days",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60",
    artist: "Benjamin Tissot (Royalty Free)",
    mp3: new Audio("https://cdn.jsdelivr.net/gh/KamalAlyKamal/spotify-clone@master/assets/music/bensound-betterdays.mp3")
  },
  {
    id: 4,
    title: "Tomorrow",
    img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60",
    artist: "Benjamin Tissot (Royalty Free)",
    mp3: new Audio("https://cdn.jsdelivr.net/gh/KamalAlyKamal/spotify-clone@master/assets/music/bensound-tomorrow.mp3")
  },
  {
    id: 5,
    title: "Creative Minds",
    img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60",
    artist: "Benjamin Tissot (Royalty Free)",
    mp3: new Audio("https://cdn.jsdelivr.net/gh/KamalAlyKamal/spotify-clone@master/assets/music/bensound-creativeminds.mp3")
  },
  {
    id: 6,
    title: "Going Higher",
    img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=60",
    artist: "Benjamin Tissot (Royalty Free)",
    mp3: new Audio("https://cdn.jsdelivr.net/gh/KamalAlyKamal/spotify-clone@master/assets/music/bensound-goinghigher.mp3")
  },
  {
    id: 7,
    title: "Jazzy Frenchy",
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&auto=format&fit=crop&q=60",
    artist: "Benjamin Tissot (Royalty Free)",
    mp3: new Audio("https://cdn.jsdelivr.net/gh/KamalAlyKamal/spotify-clone@master/assets/music/bensound-jazzyfrenchy.mp3")
  },
  {
    id: 8,
    title: "Sunny",
    img: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&auto=format&fit=crop&q=60",
    artist: "Benjamin Tissot (Royalty Free)",
    mp3: new Audio("https://cdn.jsdelivr.net/gh/KamalAlyKamal/spotify-clone@master/assets/music/bensound-sunny.mp3")
  },
]

const Home = () => {
  const { user, isAuthenticated } = useSelector((state) => state.account)
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState("")

  const getUser = async () => {
    try {
      const rawToken = localStorage.getItem("token")
      if (rawToken) {
        const token = JSON.parse(rawToken)
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000"
        const res = await fetch(`${apiUrl}/api/user/me`, {
          method: "GET",
          headers: {
            'Content-Type': "application/json",
            token,
          },
        })

        const d = await res.json()
        if (d.success) {
          dispatch(userActor(d.user))
        } else {
          localStorage.removeItem("token")
        }
      }
    } catch (err) {
      console.error("Error fetching user profile:", err)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleLogout = () => {
    dispatch(logoutActor())
    toast.info("Logged out successfully")
  }

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const trendingSongs = songs.slice(0, 4)
  const hitsSongs = songs.slice(4, 8)

  return (
    <Layout>
      {/* Top Bar with Navigation, Search, and Auth Controls */}
      <header className="sticky top-0 z-30 bg-[#121212]/90 backdrop-blur-md px-6 py-4 rounded-xl mb-4 flex justify-between items-center border border-white/5">
        <div className='flex items-center gap-3 w-1/2 max-w-lg'>
          <button className='bg-black/60 hover:bg-black text-neutral-300 hover:text-white rounded-full p-2 transition' title="Back">
            <FaAngleLeft className='text-xl' />
          </button>
          <button className='bg-black/60 hover:bg-black text-neutral-300 hover:text-white rounded-full p-2 transition' title="Forward">
            <FaAngleRight className='text-xl' />
          </button>
          <div className='relative w-full ml-2'>
            <input
              type="text"
              id='search'
              name='search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='What do you want to play?'
              className='w-full rounded-full border-0 text-white shadow-inner placeholder:text-neutral-500 focus:ring-2 focus:ring-white outline-none py-2.5 pl-11 pr-4 bg-[#242424] text-sm transition'
            />
            <FaSearch className='absolute top-3 left-4 text-neutral-400 text-sm' />
          </div>
        </div>

        {/* User Account State */}
        <div>
          {!isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                to='/signup'
                className="text-neutral-400 hover:text-white font-bold text-sm tracking-wide transition hover:scale-105"
              >
                Sign up
              </Link>
              <Link
                to='/login'
                className="rounded-full px-7 py-2.5 bg-white text-black text-sm font-bold hover:bg-neutral-200 hover:scale-105 active:scale-95 transition shadow-md"
              >
                Log in
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-[#242424] py-1.5 px-3 rounded-full border border-white/10">
              <div className="w-8 h-8 rounded-full bg-[#1ed760] text-black font-bold flex items-center justify-center text-xs shadow">
                {user?.username ? user.username.charAt(0).toUpperCase() : <FaUser />}
              </div>
              <span className="text-sm font-semibold text-white max-w-[120px] truncate">
                {user?.username || "Dhruv"}
              </span>
              <button
                onClick={handleLogout}
                className="text-neutral-400 hover:text-red-400 ml-1 p-1 transition"
                title="Log out"
              >
                <FaSignOutAlt className="text-sm" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <div className='bg-gradient-to-b from-[#1e1e1e] to-[#121212] p-6 rounded-2xl min-h-[calc(100vh-180px)] border border-white/5'>
        {searchQuery.trim() !== "" ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className='text-2xl font-bold tracking-tight'>Search Results for "{searchQuery}"</h2>
              <span className='text-xs text-neutral-400'>{filteredSongs.length} songs found</span>
            </div>
            {filteredSongs.length > 0 ? (
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-5'>
                {filteredSongs.map((song, i) => (
                  <Card key={song.id} idx={i} song={song} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-neutral-400">
                <p className="text-lg font-semibold mb-1">No songs found matching "{searchQuery}"</p>
                <p className="text-xs">Try searching by artist name or track title.</p>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Greeting & Quick Picks Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Good afternoon</h1>
              <p className="text-xs text-[#1ed760] font-medium">Enjoy popular and curated tracks on Spotify Clone by Dhruv</p>
            </div>

            {/* Trending & Focus Section */}
            <div className="mb-10">
              <div className="flex justify-between items-center px-1 mb-4">
                <h2 className='text-2xl font-bold hover:underline cursor-pointer tracking-tight'>Focus & Trending</h2>
                <span className='text-xs text-neutral-400 font-semibold hover:underline cursor-pointer'>Show all</span>
              </div>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-5'>
                {trendingSongs.map((song, i) => (
                  <Card key={song.id} idx={i} song={song} />
                ))}
              </div>
            </div>

            {/* Bollywood & Popular Hits Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center px-1 mb-4">
                <h2 className='text-2xl font-bold hover:underline cursor-pointer tracking-tight'>Featured Playlists & Hits</h2>
                <span className='text-xs text-neutral-400 font-semibold hover:underline cursor-pointer'>Show all</span>
              </div>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-5'>
                {hitsSongs.map((song, i) => (
                  <Card key={song.id} idx={i + 4} song={song} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <SongBar />
    </Layout>
  )
}

export default Home
