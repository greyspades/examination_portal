import React, { useContext, useEffect, useState } from "react";
import { CustomInput } from "../components/customInput";
import { useFormik } from "formik";
import { Button, TextareaAutosize, TextField, RadioGroup, Radio, FormControlLabel, Divider } from "@mui/material";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { api } from "../../../helpers/connection";
import { AxiosError, AxiosResponse } from "axios";
import { AddQuestion } from "./addQuestion";
import { Question, Subject } from "./types";
import { Questions } from "./questions";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { title } from "process";
import { ComponentContext } from "../../../context/component.context";
import { NotifierContext } from "../../../context/notifier.context";


export const SetExam = () => {
  const { state, dispatch } = useContext(ComponentContext);
  const { notifierState, notifierDispatch } = useContext(NotifierContext);
  const [subjects, setSubjects] = useState<Subject[]>()
  const [scope, setScope] = useState<string>("JUNIOR")
  const [creating, setCreating] = useState<boolean>(false)
  const [selSubject, setSelSubject] = useState<Subject>()
  const [view, setView] = useState<boolean>(false)
  

  const getSubjects = () => {
    const body = {
      scope
    }
    api.post("/getSubjects", body)
    .then((res: AxiosResponse) => {
      if(res.data.code == 200) {
        setSubjects(res.data.data)
      }
    })
    .catch((err: AxiosError) => {
      console.log(err.message)
    })
  }

  const handleScopeChange = (e: any) => {
    setScope(e.target.value)
  }

  useEffect(() => {
    getSubjects()
  },[scope])

  const formik = useFormik({
    initialValues: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      questionBank: "",
    },
    onSubmit: (values) => {},
  });

  const renderSubjects = () => {
    return subjects?.map((item: Subject, idx: number) =>(
      <div key={idx} className="bg-[#F9F9F9] w-[18vw] h-[20vh] rounded-md p-4 flex justify-center text-[#107F07] text-[22px] font-bold items-center">
        {item.name}
      </div>
    ))
  }

  const handleCreate = (item: Subject) => {
    setSelSubject(item)
    setCreating(true)
  }

  const handleView = (item: Subject) => {
    setSelSubject(item)
    setView(true)
  }

  const renderSubjectDetails = () => {
    return subjects?.map((item: Subject, idx: number) => (
      <div key={idx}>
        <div className="flex gap-10 p-4">
        <div className="flex flex-col">
          <p>{item.name}</p>
          <p className="text-[11px] text-gray-300">{`You have set ${item.questions} out of 20 questions`}</p>
        </div>
        <button onClick={() => handleView(item)} className="text-[#107F07] text-[14px]">
          Questions
        </button>
        <button onClick={() => handleCreate(item)} className="text-[#107F07] text-[14px]">
          Continue
        </button>
        </div>
        <Divider className="h-[2px] bg-gray-200" />
      </div>
    ))
  }

  const editQuestion = (question: Question) => {
    dispatch({type: "EDIT_QUESTION", payload: {title: "EDIT", question}})
    setCreating(true)
  }

  return (
    <div className="text-black p-4 mt-[20px] min-h-screen">
      {creating ?
       <AddQuestion subject={selSubject} close={() => setCreating(false)} />
      :
      view ? 
        <Questions subject={selSubject} close={() => setView(false)} edit={editQuestion} />
      :
      <div>
        <div>
        <p className="text-[28px] font-medium">Set Exam</p>
      </div>
      <RadioGroup className="flex flex-row" value={scope} onChange={handleScopeChange}>
        <FormControlLabel value="JUNIOR" control={<Radio />} defaultChecked label="Junior secondary examination" />
        <FormControlLabel value="SENIOR" control={<Radio />} label="Senior secondary examination" />
      </RadioGroup>

      <div className="mt-[40px] flex flex-row gap-4">
        {renderSubjects()}
      </div>
      <div className="flex flex-col mt-[20px]">
        {renderSubjectDetails()}
      </div>
      </div>}
    </div>
  );
};
