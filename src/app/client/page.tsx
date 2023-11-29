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
import { SideNav } from "./sideNav";
import { PreExam } from "./preExam";


const Client = (props) => {
  const { state, dispatch } = useContext(ComponentContext);
  const { notifierState, notifierDispatch } = useContext(NotifierContext);
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      token: "",
    },
    onSubmit: (values) => {
        router.push("onboarding")
    },
  });

  const renderView = () => {
    switch(state?.index) {
        case "1.0" :
            return <PreExam />
        default :
        return 
    }
  }
  return (
    <div className="h-screen bg-white">
      <Navbar />
      <div className="grid grid-cols-8 mt-[50px]">
        <div className="col-span-1">
            <SideNav />
        </div>
        <div className="col-span-7">
            {renderView()}
        </div>
      </div>
    </div>
  );
};

export default Client;
