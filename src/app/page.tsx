"use client";
import React, { useState, useContext} from "react"
import { CustomInput } from "./components/customInput";
import { Button, Paper } from "@mui/material";
import Image from "next/image";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { SetExam } from "./admin/setExam";
import { NotifierContext } from "../../context/notifier.context";
import { ComponentContext } from "../../context/component.context";
import { EducationType } from "./onboarding/types";


export default function Home() {
  const {state, dispatch} = useContext(ComponentContext)
  const {notifierState, notifierDispatch} = useContext(NotifierContext)

  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      id: "",
      password: "",
    },
    onSubmit: (values) => {
      router.push("admin")
    },
  });

  const renderView = () => {
    switch(state?.index) {
      case "1.0":
        return 
      default :
      return 
    }
  }
  return (
    <main className="min-h-screen grid grid-cols-4">
      <div className="grid col-span-2 relative">
        <img src="/login.jpg" alt="/login" className="w-[100%] h-[100vh] object-cover" />
        <div className="absolute top-[326px] left-[274px]">
          <p className="text-[#107F07] text-[42px] font-semibold">Scholarship <br/> Examination <br/> Portal</p>
        </div>
      </div>
      <div className="grid col-span-2 bg-white">
        <div className="flex flex-col mt-[100px] place-items-center">
        <div>
          <h2 className="text-[#107F07] text-[32px] font-semibold">Sign In</h2>
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-10 place-items-center mt-[80px] justify-center">
          <CustomInput
            value={formik.values.id}
            onChange={(e: any) => formik.setFieldValue("id", e.target.value)}
            component={"text"}
            placeHolder="Staff Id"
            classes="h-[50px] w-[400px] bg-[#F7FCF7] no-underline px-4 rounded-full"
            // icon={<SubtitlesIcon className="text-green-700" />}
            // error={error.display}
          />

          <CustomInput
            value={formik.values.password}
            type="password"
            onChange={(e: any) => formik.setFieldValue("password", e.target.value)}
            component={"text"}
            placeHolder="Password"
            classes="h-[50px] w-[400px] bg-[#F7FCF7] no-underline px-4 rounded-full"
            // icon={<SubtitlesIcon className="text-green-700" />}
            // error={error.display}
          />
          <Button type="submit" className="mt-[70px] h-[50px] w-[100%] text-white rounded-full bg-[#107F07]">
              Submit
          </Button>
        </form>
        </div>
      </div>
    </main>
  );
}
