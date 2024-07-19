import React, { useContext, useState } from 'react'
import { assets } from '../../assets'
import { Context } from '../../context/Context';
const Sidebar = () => {
  const { prevPrompts, onSent, setRecentPrompt, setShowResult, setLoading } = useContext(Context)
  const [extended, setExtended] = useState(false);
  const handleMenu = () => {
    setExtended(!extended);
  }

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt, 0)
  }

  const handleNewChat = () => {
    setLoading(false);
    setShowResult(false);
  }

  return (
    <div className={`bg-sec ${extended ? "md:w-1/5" : ""} p-4 hidden md:block`}>
      <div className='p-2 hover:bg-hov w-fit rounded-full' onClick={handleMenu}>
        <img src={assets.menu_icon} alt="menu icon" className='w-6' title='Menu' />
      </div>

      <div className={`flex gap-2 bg-[#282B2D] p-2 px-4 hover:bg-hov w-fit rounded-full justify-between mt-11 cursor-pointer`} title='New chat' onClick={handleNewChat}>
        <img src={assets.plus_icon} alt="Plus icon" className="w-4 h-4 my-auto ml-0" />
        {extended ?
          <p className='text-[#505050] font-bold'>New chat</p>
          : null}
      </div >
      {
        extended
          ?
          <div title='Recent chats' className='mt-4 mb-2'>
            < p className='ml-4 mb-2' > Recent</p >
            {prevPrompts.map((prompt, index) => {
              return (
                <div key={index} className='flex gap-2 p-4 py-1 hover:bg-hov w-full rounded-full justify-start' onClick={() => loadPrompt(prompt)}>
                  <img src={assets.message_icon} alt="message icon" className='w-4 h-4 my-auto' />
                  <p>{prompt.slice(0, 18)} ...</p>
                </div>
              )
            })}
          </div >

          : null
      }

      <div className={`absolute bottom-0 mb-4 flex flex-col mt-8 ${extended ? "w-1/6" : null}`}>
        <div className='flex gap-4 p-2 px-4 hover:bg-hov rounded-full justify-start w-full' title='Help'>
          <img src={assets.question_icon} alt="Help icon" className='w-4 h-4 my-auto' />
          {extended ? <p>Help</p> : null}
        </div>
        <div className='flex gap-4 p-2 px-4 hover:bg-hov rounded-full justify-start' title='Activity'>
          <img src={assets.history_icon} alt="Activity icon" className='w-4 h-4 my-auto' />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className='flex gap-4 p-2 px-4 hover:bg-hov rounded-full justify-start' title='Settings'>
          <img src={assets.setting_icon} alt="Settings icon" className='w-4 h-4 my-auto' />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div >
  )
}

export default Sidebar