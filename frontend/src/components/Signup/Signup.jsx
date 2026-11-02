import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userActor } from '../../states/actors/userActor'

const Signup = () => {
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector((state) => state.account)
    const [userDetails, setUserDetails] = useState({ email: "", password: "", gender: "Male", username: "" })
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

    const registerUser = async (e) => {
        e.preventDefault()
        const { email, password, gender, username } = userDetails
        if (!email || !password || !username) {
            toast.error("Please fill in all required fields")
            return
        }

        try {
            setLoading(true)
            const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000"
            const res = await fetch(`${apiUrl}/api/user/register`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ email, password, gender, username }),
            })

            const d = await res.json()
            if (d.success) {
                toast.success(d.message || "Account created successfully!");
                localStorage.setItem("token", JSON.stringify(d.token))
                if (d.user) {
                    dispatch(userActor(d.user))
                }
                navigate('/')
            } else {
                toast.error(d.message || "Registration failed");
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
            <div className="container mx-auto py-10 px-4">
                <div className='bg-[#121212] border border-white/10 text-center max-w-lg mx-auto py-10 px-8 rounded-2xl shadow-2xl'>
                    <h1 className='text-3xl md:text-4xl font-extrabold mb-4 text-white tracking-tight'>
                        Sign up to start listening
                    </h1>
                    <p className='text-neutral-400 text-sm mb-6'>Join millions of music lovers today.</p>
                    <div className="border-b border-white/10 w-full mx-auto my-6"></div>

                    <form onSubmit={registerUser} className='text-left w-full space-y-4'>
                        <div>
                            <label className='font-semibold text-sm text-gray-200 block mb-2'>Email address</label>
                            <input
                                type="email"
                                id='email'
                                name='email'
                                value={userDetails.email}
                                onChange={onChange}
                                placeholder='name@domain.com'
                                required
                                className='w-full rounded-md text-white shadow-sm ring-1 ring-inset ring-neutral-700 placeholder:text-neutral-500 focus:ring-2 focus:ring-green-500 outline-none p-3.5 bg-[#242424] transition'
                            />
                        </div>

                        <div>
                            <label className='font-semibold text-sm text-gray-200 block mb-2'>Create a password</label>
                            <input
                                type="password"
                                id='password'
                                name='password'
                                value={userDetails.password}
                                onChange={onChange}
                                placeholder='Create a strong password'
                                required
                                className='w-full rounded-md text-white shadow-sm ring-1 ring-inset ring-neutral-700 placeholder:text-neutral-500 focus:ring-2 focus:ring-green-500 outline-none p-3.5 bg-[#242424] transition'
                            />
                        </div>

                        <div>
                            <label className='font-semibold text-sm text-gray-200 block mb-2'>What should we call you?</label>
                            <input
                                type="text"
                                id='username'
                                name='username'
                                value={userDetails.username}
                                onChange={onChange}
                                placeholder='Profile name / username'
                                required
                                className='w-full rounded-md text-white shadow-sm ring-1 ring-inset ring-neutral-700 placeholder:text-neutral-500 focus:ring-2 focus:ring-green-500 outline-none p-3.5 bg-[#242424] transition'
                            />
                            <span className='text-xs text-neutral-400 mt-1 block'>This appears on your profile.</span>
                        </div>

                        <div className='pt-2'>
                            <label className='font-semibold text-sm text-gray-200 block mb-2'>What's your gender?</label>
                            <div className="flex flex-wrap gap-4 text-sm text-neutral-300">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" id='m' name='gender' value='Male' checked={userDetails.gender === 'Male'} onChange={onChange} className="accent-[#1ed760]" />
                                    Male
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" id='f' name='gender' value='Female' checked={userDetails.gender === 'Female'} onChange={onChange} className="accent-[#1ed760]" />
                                    Female
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" id='g' name='gender' value='Rather not say' checked={userDetails.gender === 'Rather not say'} onChange={onChange} className="accent-[#1ed760]" />
                                    Rather not say
                                </label>
                            </div>
                        </div>

                        <div className='pt-4'>
                            <button
                                type="submit"
                                disabled={loading}
                                className='w-full outline-none py-3.5 px-4 font-bold text-black bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 rounded-full shadow-lg disabled:opacity-50'
                            >
                                {loading ? "Creating account..." : "Sign Up"}
                            </button>
                        </div>
                    </form>

                    <div className="border-b border-white/10 w-full mx-auto my-8"></div>
                    <p className='text-sm text-neutral-400'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-white font-semibold underline hover:text-[#1ed760] transition ml-1'>
                            Log in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup