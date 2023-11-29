import React, { useState, useContext } from 'react'
import { Button } from '@mui/material'
import { ComponentContext } from '../../../context/component.context'

type MenuItem = {
    index: string,
    title: string,
}

export const SideBar = () => {
    const { state, dispatch } = useContext(ComponentContext)

    const menuItems: MenuItem[] = [
        {
            index: "1.0",
            title: "Dashboard"
        },
        {
            index: "2.0",
            title: "Set Exam"
        },
        {
            index: "3.0",
            title: "Applicants"
        },
        {
            index: "4.0",
            title: "Upload Applicants"
        },
        {
            index: "5.0",
            title: "Question bank"
        },
        // {
        //     index: "5.0",
        //     title: "Applicants"
        // },
    ]

    const switchIndex = (index: string, title: string) => {
        dispatch({type: "SWITCH_INDEX", payload: {index: index, title: title}})
    }

    const renderMenuItems = () => {
        return menuItems.map((item: MenuItem, idx: number) => (
            <button onClick={() => switchIndex(item.index, item.title)} className={state?.index == item.index ? "bg-[#599c56] h-[70px] flex items-center p-4 border-l-4 border-l-white text-gray-300 w-[100%]" : "h-[70px] flex items-center p-4 text-white"} key={idx}>
                <p>{item.title}</p>
            </button>
        ))
    }

  return (
    <div className='flex flex-col bg-[#88ae87] gap-[20px] h-screen fixed'>
        <div className='mt-[80px]'>
        {renderMenuItems()}
        </div>
    </div>
  )
}
