import React from 'react'
import Sidebar from './components/Sidebar'

export default function DefaultLayout(props: { children: React.ReactNode }) {
    return (
        <div className='w-full h-screen flex items-center bg-[#111820] '>
            <Sidebar />
            <div className='flex-1 h-screen bg-slate-40 overflow-scroll'>{props.children}</div>
        </div>
    )
}
