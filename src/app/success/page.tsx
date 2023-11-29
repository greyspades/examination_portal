"use client";
import React, { useState, useContext } from "react";
import { CustomInput } from "../components/customInput";
import { useFormik } from "formik";
import { Button, TextareaAutosize, TextField } from "@mui/material";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import { Navbar } from "../components/navbar";
import { ComponentContext } from "../../../context/component.context";
import { NotifierContext } from "../../../context/notifier.context";
import { useRouter } from "next/navigation";

const Success = (props) => {
  const { state, dispatch } = useContext(ComponentContext);
  const { notifierState, notifierDispatch } = useContext(NotifierContext);
  const router = useRouter()

  
  return (
    <div className="h-screen bg-white flex justify-center">
      <Navbar />
        <div className="mt-[100px] text-black flex flex-col place-items-center">
            <div className="bg-[#107F07] w-[70px] h-[70px] rounded-full flex justify-center items-center">
                <img src="/group.svg" className="w-[50px] h-[50px]" alt="/" />
            </div>
            <div className="mt-[20px] flex flex-col justify-center">
                <p className="text-[28px] font-medium text-center">Success!</p>
                <p className="text-[16px] font-medium text-center mt-[30px]">Your application has been submited and is pending review </p>
            </div>
            <div className="mt-[60px]">
                <img src="/success.svg" className="h-[250px] w-[650px]" alt="/" />
            </div>
        </div>
    </div>
  );
};


export default Success;
