import React, { useContext, useEffect, useState } from "react";
import { CustomInput } from "../components/customInput";
import { useFormik } from "formik";
import {
  Button,
  TextareaAutosize,
  TextField,
  Paper,
  IconButton,
} from "@mui/material";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { ApplicantTable } from "./applicantTable";
import { api } from "../../../helpers/connection";
import { AxiosError, AxiosResponse } from "axios";
import { Question } from "./types";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Subject } from "./types";
import { ComponentContext } from "../../../context/component.context";
import { NotifierContext } from "../../../context/notifier.context";
import EditIcon from '@mui/icons-material/Edit';
import { Options } from "./types";


interface QuestionProps {
  subject: Subject;
  close: () => void;
  edit:(item: Question) => void
}
export const Questions = ({ subject, close, edit }: QuestionProps) => {
  const [questions, setQuestions] = useState<Question[]>();
  const { state, dispatch } = useContext(ComponentContext);
  const { notifierState, notifierDispatch } = useContext(NotifierContext);

  const getQuestions = () => {
    api
      .post("/getQuestions", { subject: subject.id })
      .then((res: AxiosResponse) => {
        if (res.data.code == 200) {
          setQuestions(res.data.data);
        }
      })
      .catch((err: AxiosError) => {
        console.log(err.message);
        notifierDispatch({type: "CREATE", payload: {code: 500, title: "Unsuccessfull", open: true, content: err.message}})
      });
  };
  useEffect(() => {
    getQuestions();
  }, []);

  const renderOptions= (options: Options[]) => {
    return options?.map((item: Options, idx: number) => (
        <div className="flex bg-gray-100 p-2 h-[35px] rounded-lg text-black flex-row gap-4" key={idx}>
            <p>{item.character}</p><p>{item.value}</p>
        </div>
    ))
  }

  const renderQuestions = () => {
    return questions?.map((item: Question, idx: number) => (
      <Paper key={idx} className="bg-[#F7FCF7] flex flex-col h-[350px] rounded-lg p-4 text-black">
            <div className="grid grid-cols-2 gap-4 h-[250px]">
            <div className="bg-white grid col-span-1 p-4" dangerouslySetInnerHTML={{ __html: item.question }} />
            <div className="grid col-span-1 overflow-ellipsis ...">{renderOptions(item?.options)}</div>
            </div>
            <div className="bg-gray-400 place-items-center h-[50px] mt-[20px] justify-between text-white flex px-4">
                <div className="flex w-[90%] gap-8"><p>Question {idx+1}</p> <p>Instructions: {item?.instructions}</p><p>Answer: {item?.answer}</p></div>
                <IconButton onClick={() => edit(item)} className="bg-white w-[40px] h-[40px] rounded-full">
                    <EditIcon />
                </IconButton>
            </div>
      </Paper>
    ));
  };

  return (
    <div className="min-h-screen">
      <div className="flex gap-8">
        <IconButton onClick={close}>
          <KeyboardBackspaceIcon className="w-[30px] h-[30px]" />
        </IconButton>
        <h2 className="text-[32px] font-medium">Questions for {subject.name}</h2>
      </div>
      <div className="flex flex-col gap-2 flex-wrap">{renderQuestions()}</div>
    </div>
  );
};
