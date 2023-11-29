"use client";
import React, { useState, useContext } from "react";
import { CustomInput } from "../components/customInput";
import { FormikProps, useFormik } from "formik";
import { Button, TextareaAutosize, TextField } from "@mui/material";
import { ComponentContext } from "../../../context/component.context";
import { NotifierContext } from "../../../context/notifier.context";
import { useRouter } from "next/navigation";

type Step = { title: string; index: number };

interface OnboardingProps {
  formik: FormikProps<any>;
  switchIndex: (idx: number) => void;
  currIndex: number;
  setField: (field: string, value: any) => void
}

type Field = {
    title: string,
    value: string,
    type: string,
    options?: string[]
}

export const Attachments = ({
  formik,
  switchIndex,
  currIndex,
  setField
}: OnboardingProps) => {
  const { state, dispatch } = useContext(ComponentContext);
  const { notifierState, notifierDispatch } = useContext(NotifierContext);
  const [index, setIndex] = useState<number>(1);
  const router = useRouter();

  const fields: Field[] = [
    {
        title: "Reference by Principal",
        value: "referenceByPrincip",
        type: "file"
    },
    {
        title: "First Term Result",
        value: "firstResult",
        type: "file"
    },
    {
        title: "Second Term Result",
        value: "secondResult",
        type: "file"
    },
    {
        title: "Third Term Result",
        value: "thirdResult",
        type: "file"
    },
    {
        title: "“My child” Savings Account Card",
        value: "accountCard",
        type: "file"
    },
    {
        title: "Passport Photograph",
        value: "passport",
        type: "file"
    },
    {
        title: "Photocopy of LAPO Membership Card",
        value: "membershipCard",
        type: "file"
    },
    {
        title: "Birth Certificate of Student",
        value: "birthCert",
        type: "file"
    },
    {
        title: "Letter of attestation from school principal",
        value: "attestation",
        type: "file"
    },
  ];

  const renderFields = () => {
    return fields.map((item: Field, idx: number) => (
      <div key={idx} className="grid col-span-1">
        <p className="text-[12px] text-gray-400 mb-[-10px]">{item.title}</p>
        <CustomInput
          value={formik.values?.[item.value]}
          onChange={(e: any) => setField(item.value, e.target.value)}
          component={item?.options ? "select" : "text"}
          placeHolder={item.title}
          type={item.type}
          classes="bg-[#F7FCF7] w-[350px] rounded-2xl no-underline h-[40px] px-4"
          error={formik.errors?.[item.value]}
          selValues={item?.options ? item?.options : null}
        />
      </div>
    ));
  };

  return (
    <div className="h-screen w-[100%] p-6 ml-[20px]">
    <div className="grid grid-cols-2 gap-6">
    {renderFields()}
    </div>
    <div className="flex justify-between w-[100%] mt-[100px] mb-[50px]">
        <Button onClick={() => switchIndex(--currIndex)} className="bg-[#267F29] text-white rounded-lg w-[100px] h-[40px]">
            Prev
        </Button>
        <Button onClick={() => formik.handleSubmit()} className="bg-[#267F29] text-white rounded-lg w-[150px] h-[40px]">
            Finish
        </Button>
    </div>
    </div>
  )
};
