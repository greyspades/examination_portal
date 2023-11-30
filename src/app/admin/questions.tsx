import React, { useEffect, useState } from "react";
import { CustomInput } from "../components/customInput";
import { useFormik } from "formik";
import { Button, TextareaAutosize, TextField, Paper } from "@mui/material";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { ApplicantTable } from "./applicantTable";
import { api } from "../../../helpers/connection";
import { AxiosError, AxiosResponse } from "axios";
import { Question } from "./types";

interface QuestionProps {
    subject: string
}
export const Questions = ({subject}: QuestionProps) => {
    const [questions, setQuestions] = useState<Question[]>()
    
    const getQuestions = () => {
        api.post("/getQuestions", {subject})
        .then((res: AxiosResponse) => {
            if(res.data.code == 200) {
                setQuestions(res.data.data)
            }
        })
        .catch((err: AxiosError) => {
            console.log(err.message)
        })
    }
    useEffect(() => {
        getQuestions()
    },[])

    const renderQuestions = () => {
        return questions?.map((item: Question, idx: number) => (
            <Button key={idx} className=" bg-[#F7FCF7] rounded-lg p-4 text-black">
                <div dangerouslySetInnerHTML={{ __html: item.question }} />
            </Button>
        ))
    }

    return (
        <div className="min-h-screen">
            <div className="flex flex-col gap-2 flex-wrap">
            {renderQuestions()}
            </div>
        </div>
    )
}