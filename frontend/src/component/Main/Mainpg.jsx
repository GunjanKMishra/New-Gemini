import React, { useContext } from 'react'
import Markdown from "react-markdown"
import { assets } from '../../assets'
import Suggestion from './Suggestion'
import { Context } from '../../context/Context'
import './scrollbar-hide.css'
import './loader.css'
const Mainpg = () => {
    const { input, setInput, onSent, recentPrompt, showResult, loading, resultData } = useContext(Context)
    return (
        <div className='w-screen md:w-full'>
            <div className='flex justify-between p-4'>
                <h1 className='text-2xl'>Gemini</h1>
                <img src={assets.user_icon} alt="user icon" title='user icon' className='w-6 h-6 my-auto' />
            </div>
            {!showResult ?
                <div className='w-3/5 m-auto'>
                    <div className='text-5xl tracking-wider mt-10 leading-snug text-center md:text-start'>
                        <p className='bg-[linear-gradient(16deg,#4b90ff,#ff5546)] text-transparent inline-block bg-clip-text font-semibold'> Hello, Gunjan </p>
                        <p className='text-[#444746] font-bold'> How can I help you today?</p>
                    </div>
                    <div className='mt-24 flex justify-center gap-3 flex-col md:flex-row items-center md:items-start'>
                        <Suggestion text="Explain the following code step-by-step in detail" logo={assets.code_icon} />
                        <Suggestion text="Suggest beautiful places to see on an upcoming road trip" logo={assets.compass_icon} />
                        <Suggestion text="Briefly summarize this concept: urban planning" logo={assets.bulb_icon} />
                        <Suggestion text="Brainstorm team bonding activities for our work retreat" logo={assets.message_icon} />
                    </div>
                </div>
                :
                <div className='w-3/5 m-auto text-base overflow-y-auto scroll p-4 scrollbar-hide h-[70vh]'>
                    <div className='flex gap-5 p-4 py-2 w-full rounded-full justify-start align-top mb-5'>
                        <img src={assets.user_icon} alt="User icon" className='w-8 h-8' title='User icon' />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className='flex gap-5 p-4 py-2 w-full rounded-full justify-start align-top'>
                        <img src={assets.gemini_icon} alt="Gemini icon" className='w-8 h-8' title='Gemini icon' />
                        {loading ?
                            <div className='loader'>
                                <hr />
                                <hr />
                                <hr />
                            </div>
                            :
                            <div>
                                <Markdown children={resultData} />
                            </div>
                        }

                    </div>
                </div>
            }

            <div className='md:w-3/5 m-auto mt-3 md:mt-0'>
                <div className='md:absolute md:bottom-0 w-[70%] md:w-[56%] m-auto'>
                    <div className='flex bg-sec py-3 pl-8 pr-4 rounded-full justify-between w-full'>
                        <input type="text" placeholder='Enter a prompt here' className='bg-sec outline-none border-none focus:outline-none focus:border-none w-3/4' value={input} onChange={(e) => setInput(e.target.value)} />
                        <div className='flex justify-center gap-2'>
                            <img src={assets.gallery_icon} alt="upload image" title="upload image" className='w-5 h-5 cursor-pointer my-3 hidden md:block' />
                            <img src={assets.mic_icon} alt="use mic" title="use mic" className='w-5 h-5 cursor-pointer ml-3 my-3 hidden md:block' />
                            {input !== "" ?
                                <div className='p-3 hover:bg-hov w-fit rounded-full cursor-pointer' onClick={() => { onSent(input) }}>
                                    <img src={assets.send_icon} alt="send question" title="send question" className='w-5 h-5' />
                                </div>
                                : null}
                        </div>
                    </div>
                    <p className='text-xs text-center my-3'>Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
                </div>
            </div>
        </div>
    )
}

export default Mainpg