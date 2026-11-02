import React from 'react'
import { BiLibrary, BiSolidHome } from "react-icons/bi"
import { FiSearch } from "react-icons/fi"
import { FaPlus, FaHeart } from "react-icons/fa"
import { TbWorld } from "react-icons/tb"
import { Link } from 'react-router-dom'
import "./Sidebar.css"

const Sidebar = () => {
    return (
        <aside className='w-1/4 min-w-[240px] max-w-[320px] fixed left-0 top-0 h-[calc(100vh-80px)] p-2 flex flex-col gap-2 z-20 text-white'>
            {/* Logo & Navigation */}
            <div className="secondary_bg rounded-xl p-5 flex flex-col gap-4">
                <Link to="/" className="flex items-center gap-2 mb-2">
                    <img src="/assets/white_logo.png" alt="Spotify" className="h-9 w-auto" />
                </Link>
                <Link to="/" className='flex items-center gap-4 text-neutral-300 hover:text-white font-semibold transition cursor-pointer'>
                    <BiSolidHome className='text-2xl text-white' />
                    <span>Home</span>
                </Link>
                <div className='flex items-center gap-4 text-neutral-300 hover:text-white font-semibold transition cursor-pointer'>
                    <FiSearch className='text-2xl' />
                    <span>Search</span>
                </div>
            </div>

            {/* Library Section */}
            <div className="secondary_bg rounded-xl p-3 flex-1 flex flex-col overflow-hidden">
                <div className='flex justify-between items-center px-3 py-2'>
                    <div className="flex gap-3 items-center text-neutral-400 hover:text-white transition font-semibold cursor-pointer">
                        <BiLibrary className='text-2xl' />
                        <span>Your Library</span>
                    </div>
                    <button className='hover:bg-white/10 rounded-full p-2 text-neutral-400 hover:text-white transition' title="Create playlist">
                        <FaPlus className='text-sm' />
                    </button>
                </div>

                {/* Playlist & Podcast promos */}
                <div className="your_library flex-1 overflow-y-auto space-y-3 mt-2 pr-1">
                    <div className="bg-[#242424] rounded-xl p-4">
                        <p className='font-bold text-sm'>Create your first playlist</p>
                        <p className='text-xs text-neutral-400 mt-1'>It's easy, we'll help you</p>
                        <button className="rounded-full px-4 py-1.5 bg-white text-black mt-3 text-xs font-bold hover:scale-105 active:scale-95 transition">
                            Create Playlist
                        </button>
                    </div>

                    <div className="bg-[#242424] rounded-xl p-4">
                        <p className='font-bold text-sm'>Follow your favorite podcasts</p>
                        <p className='text-xs text-neutral-400 mt-1'>We'll keep you updated on new episodes</p>
                        <button className="rounded-full px-4 py-1.5 bg-white text-black mt-3 text-xs font-bold hover:scale-105 active:scale-95 transition">
                            Browse Podcasts
                        </button>
                    </div>

                    <div className="p-3 border border-white/5 rounded-xl bg-white/[0.02]">
                        <p className="text-xs text-neutral-400 font-medium">
                            🎵 Spotify Clone Project
                        </p>
                        <p className="text-[11px] text-[#1ed760] font-semibold mt-0.5">
                            Developed by Dhruv
                        </p>
                        <p className="text-[10px] text-neutral-500 mt-1.5 leading-tight">
                            Educational & portfolio showcase only. Not affiliated with Spotify AB. All music and trademarks belong to their respective owners.
                        </p>
                    </div>
                </div>

                {/* Legal and Language */}
                <div className="pt-3 border-t border-white/10 mt-auto">
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-neutral-400 px-2 mb-3">
                        <a href="#" className="hover:underline">Legal</a>
                        <a href="#" className="hover:underline">Privacy</a>
                        <a href="#" className="hover:underline">Cookies</a>
                        <a href="#" className="hover:underline">About</a>
                    </div>
                    <button className="text-white text-xs flex items-center border border-neutral-600 hover:border-white gap-2 rounded-full py-1.5 px-3 transition font-semibold">
                        <TbWorld className="text-sm" />
                        <span>English</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar