"use client"
import React, { useContext } from 'react'
import { Navbar } from '../components/navbar';
import { SideBar } from '../components/sidebar';
import { ComponentContext } from '../../../context/component.context';
import { NotifierContext } from '../../../context/notifier.context';
import { SetExam } from './setExam';
import { Applicants } from './applicants';
import { UploadCandidates } from './uploadCandidates';
import { Dashboard } from './dashboard';
import { QuestionBank } from './questionBank';

const Admin = () => {
    const {state, dispatch} = useContext(ComponentContext)
    const {notifierState, notifierDispatch} = useContext(NotifierContext)

    const renderView = () => {
        switch(state?.index) {
          case "1.0" :
            return <Dashboard />
          case "2.0":
            return <SetExam />
          case "3.0":
            return <Applicants />
          case "4.0":
            return <UploadCandidates />
          case "5.0":
            return <QuestionBank />
          default :
          return 
        }
      }

  return (
    <div className='bg-white h-auto'>
        <Navbar />
        <div className='grid grid-cols-12 mt-[60px]'>
            <div className='grid col-span-2'>
                <SideBar />
            </div>
            <div className='grid col-span-10 overflow-y-scroll'>
                {renderView()}
            </div>
        </div>
    </div>
  )
}

export default Admin