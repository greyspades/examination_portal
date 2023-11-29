import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { ComponentContext } from '../../../context/component.context'

export const SideNav = () => {
    const { state, dispatch } = useContext(ComponentContext)
    const pages = [
        {
            name: "Take Exam", 
            index: "1.0"
        },
        {
            name: "Practice", 
            index: "2.0"
        },
        {
            name: "Results", 
            index: "3.0"
        }
    ]

    const switchIndex = (index: string, title: string) => {
        dispatch({type: "SWITCH_INDEX", payload: {index: index, title: title}})
    }

    const renderNavLinks = () => {
        return pages.map((item: {[key: string]: any}, idx: number) => (
            <button key={idx} onClick={() => switchIndex(item.index, item.name)} className={state?.index == item.index ? "mt-[40px] bg-[#469143] h-[60px] pl-4 flex items-center w-[100%] text-[#FFFFFF] border-l-white border-l-4" : "mt-[40px] h-[60px] pl-4 flex items-center w-[100%]"}>
                {item.name}
            </button>
        ))
    }
  return (
    <div className='h-screen bg-[#689b68] py-4 text-white'>
        {renderNavLinks()}
    </div>
  )
}
