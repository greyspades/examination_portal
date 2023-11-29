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

const TokenValidaton = (props) => {
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
  return (
    <div className="h-screen bg-white">
      <Navbar />
      <div className="mt-[60px]">
        <div className="p-4 h-screen">
          <div>
            <h2 className="text-[24px] font-medium text-black mt-[40px] ml-[40px] text-center">
              Token Validation
            </h2>
          </div>
          <div className="flex justify-center items-center mt-[140px]">
            <div className="w-[50vw]">
                <p className="text-[14px] text-gray-400 mb-[-15px]">Please enter your token</p>
              <form onSubmit={formik.handleSubmit}>
              <CustomInput
                value={formik.values.token}
                onChange={(e: any) =>
                  formik.setFieldValue("token", e.target.value)
                }
                component={"text"}
                type={"text"}
                classes="bg-[#F7FCF7] rounded-full no-underline h-[50px] px-4"
                error={formik.errors.token}
              />

              <Button type="submit" className="text-white bg-[#328E36] rounded-xl h-[50px] w-[100%] mt-[100px]">
                    Submit
              </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TokenValidaton.propTypes = {};

export default TokenValidaton;
