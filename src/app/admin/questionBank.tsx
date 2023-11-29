import React, { useContext } from "react";
import { CustomInput } from "../components/customInput";
import { useFormik } from "formik";
import {
  Button,
  TextareaAutosize,
  TextField,
  Paper,
  Switch,
} from "@mui/material";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { ApplicantTable } from "./applicantTable";
import { api } from "../../../helpers/connection";
import { AxiosError, AxiosResponse } from "axios";
import { ComponentContext } from "../../../context/component.context";
import { NotifierContext } from "../../../context/notifier.context";
import { AddQuestionbank } from "../../../helpers/validation";

export const QuestionBank = () => {
const { notifierState, notifierDispatch } = useContext(NotifierContext);
const { state, dispatch } = useContext(ComponentContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      isDefault: false,
    },
    validationSchema:AddQuestionbank,
    onSubmit: (values) => {
        api.post("/createBank", values)
        .then((res: AxiosResponse) => {
            if(res.status >= 200 && res.status < 300) {
                notifierDispatch({type:"CREATE", payload: {code: res.data.code, content: res.data.message, open: true, title: "Successfull"}})
            }
        })
        .catch((err: AxiosError) => {
            notifierDispatch({type:"CREATE", payload: {code: 400, content: err.message, open: true, title: err.name}})
        })
    },
  });

  return (
    <div className="text-black p-6">
      <div>
        <p>Create question bank</p>
      </div>
      <form className="flex flex-col mt-[50px]" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <p className="text-gray-300 text-[11px] mb-[-12px]">
            Please name this question bank
          </p>
          <CustomInput
            value={formik.values.name}
            onChange={(e: any) => formik.setFieldValue("name", e.target.value)}
            component="text"
            classes="w-[400px] bg-[#F7FCF7] rounded-full px-4"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-gray-300 text-[11px] mb-[-12px]">
            Write a short note on this question bank
          </p>
          <TextField
            value={formik.values.description}
            onChange={(e: any) =>
              formik.setFieldValue("description", e.target.value)
            }
            className="bg-[#F7FCF7] rounded-xl mt-[40px]"
            minRows={6}
            multiline
            sx={{
              "& fieldset": { border: "none" },
            }}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-gray-300 text-[11px] mb-[-12px]">
            Make this question bank Active
          </p>
          <Switch
            value={formik.values.isDefault}
            onChange={(e: any) => formik.setFieldValue("isDefault", !formik.values.isDefault)}
          />
        </div>
        <div>
            <button type="submit" className="text-white mt-[70px] bg-[#267F29] h-[40px] w-[30%] rounded-full">
                Submit
            </button>
        </div>
      </form>
    </div>
  );
};
