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

export const Personal = ({
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
        title: "surname",
        value: "surname",
        type: "text"
    },
    {
        title: "firstName",
        value: "firstName",
        type: "text"
    },
    {
        title: "middleName",
        value: "middleName",
        type: "text"
    },
    {
        title: "date of birth",
        value: "dob",
        type: "date"
    },
    {
        title: "place of birth",
        value: "pob",
        type: "text"
    },
    {
        title: "who do you live with",
        value: "livesWith",
        type: "text"
    },
    {
        title: "email",
        value: "email",
        type: "email"
    },
    {
        title: "gender",
        value: "gender",
        type: "text",
        options: ["male", "female"]
    },
    {
        title: "current school",
        value: "currSchool",
        type: "text"
    },
    {
        title: "last school attended",
        value: "lastSchool",
        type: "text"
    },
    {
        title: "phone",
        value: "phone",
        type: "text"
    },
    {
        title: "religion",
        value: "religion",
        type: "text",
        options: ["christian", "muslim", "other"]
    }
  ];

  const renderFields = () => {
    return fields.map((item: Field, idx: number) => (
      <div key={idx} className="grid col-span-1">
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
    <div className="h-screen w-[100%] grid grid-cols-2 p-6 ml-[20px]">
    {renderFields()}
    <div className="flex justify-between w-[190%]">
        <Button onClick={() => switchIndex(--currIndex)} className="bg-[#267F29] text-white rounded-lg w-[100px] h-[40px]">
            Prev
        </Button>
        <Button onClick={() => switchIndex(++currIndex)} className="bg-[#267F29] text-white rounded-lg w-[150px] h-[40px]">
            Next
        </Button>
    </div>
    </div>
  )
};
