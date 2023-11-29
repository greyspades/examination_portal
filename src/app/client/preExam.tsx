import React, { useState } from "react";
import { Button, Paper } from "@mui/material";
import { Exam } from "./exam";
import { useFormik } from "formik";
import { CustomInput } from "../components/customInput";

export const PreExam = () => {
  const [validated, setValidated] = useState<boolean>(true);
  const [startExam, setStartExam] = useState<boolean>(true);
  const formik = useFormik({
    initialValues: {
      token: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setValidated(true)
    },
  });

  return (
    <div className="p-8">
      {validated && startExam ? (
        <div className="text-black">
          <Exam />
        </div>
      ) : validated && !startExam ? (
        <div>
          <Paper className="p-4 rounded-xl bg-[#F9F9F9] text-[#107F07] font-semibold h-[20vh]">
            <div>Exam Date</div>
            <div className="mt-[40px] flex flex-row justify-center mb-[70px]">
              Wednesday, 24th October, 2023, 10:00 AM
            </div>
          </Paper>
          <div className="flex justify-center mt-[60px]">
            <p className="text-black text-center font-medium">
              You're not due to take your exams today. <br /> Plenty of time to
              prepare! Take breaks and stay organized.
            </p>
          </div>
          <div className="flex justify-center mt-[40px]">
            <img
              src="/waiting.svg"
              alt="waiting"
              className="w-[458px] h-[228px]"
            />
          </div>
        </div>
      ) : !validated && !startExam ? (
        <div className="text-black text-[24px] mt-[40px]">
          <div>
            <p className="font-semibold">Token Validation</p>
          </div>
          <div className="flex justify-center">
            <form onSubmit={formik.handleSubmit} className="flex flex-col mt-[120px]">
              <p className="text-[14px] mb-[-10px]">Please enter your id</p>
              <CustomInput
                value={formik.values.token}
                onChange={(e: any) =>
                  formik.setFieldValue("token", e.target.value)
                }
                component={"text"}
                placeHolder="4109570-878590485958-545987489"
                type={"text"}
                classes="bg-[#F7FCF7] w-[65vw] rounded-2xl no-underline h-[50px] px-4"
                error={formik.errors?.token}
              />
              <Button type="submit" className="text-white bg-[#328E36] h-[50px] rounded-xl mt-[100px]">
                Start Exam
              </Button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};
