import React, { useEffect, useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { userActor } from '../../states/actors/userActor'

const Login = () => {
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector((state) => state.account)
    const [userDetails, setUserDetails] = useState({ password: "", username: "" })
    const [loading, setLoading] = useState(false)

    const onChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    const loginUser = async (e) => {
        e.preventDefault()
        const { username, password } = userDetails
        if (!username || !password) {
            toast.error("Please fill in all fields")
            return
        }

        try {
            setLoading(true)
            const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000"
            const res = await fetch(`${apiUrl}/api/user/login`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ username, password }),
            })

            const d = await res.json()
            if (d.success) {
                toast.success(d.message || "Logged in successfully!");
                localStorage.setItem("token", JSON.stringify(d.token))
                dispatch(userActor(d.user))
                navigate('/')
            } else {
                toast.error(d.message || "Invalid credentials");
            }
        } catch (error) {
            toast.error("Unable to connect to server");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <header className='px-10 py-6 border-b border-white/10'>
                <div className="logo">
                    <Link to='/' className="flex items-center gap-2">
                        <img src="/assets/white_logo.png" width={130} alt="Spotify" />
                    </Link>
                </div>
            </header>
            <div className="container mx-auto py-12 px-4">
                <div className='bg-[#121212] border border-white/10 text-center max-w-lg mx-auto py-10 px-8 rounded-2xl shadow-2xl'>
                    <h1 className='text-3xl md:text-4xl font-extrabold mb-8 text-white tracking-tight'>Log in to Spotify</h1>
                    <div className="border-b border-white/10 w-full mx-auto my-6"></div>
                    <form onSubmit={loginUser} className='text-left w-full space-y-5'>
                        <div>
                            <label className='font-semibold text-sm text-gray-200 block mb-2'>Email or username</label>
                            <input
                                type="text"
                                id='username'
                                name='username'
                                value={userDetails.username}
                                onChange={onChange}
                                placeholder='Email or username'
                                required
                                className='w-full rounded-md text-white shadow-sm ring-1 ring-inset ring-neutral-700 placeholder:text-neutral-500 focus:ring-2 focus:ring-green-500 outline-none p-3.5 bg-[#242424] transition'
                            />
                        </div>
                        <div>
                            <label className='font-semibold text-sm text-gray-200 block mb-2'>Password</label>
                            <input
                                type="password"
                                id='password'
                                name='password'
                                value={userDetails.password}
                                onChange={onChange}
                                placeholder='Enter your password'
                                required
                                className='w-full rounded-md text-white shadow-sm ring-1 ring-inset ring-neutral-700 placeholder:text-neutral-500 focus:ring-2 focus:ring-green-500 outline-none p-3.5 bg-[#242424] transition'
                            />
                        </div>
                        <div className='pt-2'>
                            <button
                                type="submit"
                                disabled={loading}
                                className='w-full outline-none py-3.5 px-4 font-bold text-black bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 rounded-full shadow-lg disabled:opacity-50'
                            >
                                {loading ? "Logging in..." : "Log In"}
                            </button>
                        </div>
                        <div className='text-center pt-2'>
                            <Link to="/" className='text-sm text-gray-400 hover:text-white transition underline'>Back to Home</Link>
                        </div>
                    </form>
                    <div className="border-b border-white/10 w-full mx-auto my-8"></div>
                    <p className='text-sm text-neutral-400'>
                        Don't have an account?{' '}
                        <Link to="/signup" className='text-white font-semibold underline hover:text-[#1ed760] transition ml-1'>
                            Sign up for Spotify
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login