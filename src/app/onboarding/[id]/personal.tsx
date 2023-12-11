"use client";
import React, { useState, useContext, useEffect } from "react";
import { CustomInput } from "../../components/customInput";
import { FormikProps, useFormik } from "formik";
import { Button, TextareaAutosize, TextField, CircularProgress } from "@mui/material";
import { ComponentContext } from "../../../../context/component.context";
import { NotifierContext } from "../../../../context/notifier.context";
import { useRouter } from "next/router";
import { api } from "../../../../helpers/connection";
import { AxiosError, AxiosResponse } from "axios";

type Step = { title: string; index: number };

interface OnboardingProps {
  switchIndex: (idx: number) => void;
  currIndex: number;
  id: string
}

type Field = {
    title: string,
    value: string,
    type: string,
    options?: string[],
}

export const Personal = ({
  switchIndex,
  currIndex,
  id
}: OnboardingProps) => {
  const { state, dispatch } = useContext(ComponentContext);
  const { notifierState, notifierDispatch } = useContext(NotifierContext);
  const [index, setIndex] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      lastname: state?.user?.lastname ?? "",
      firstName: state?.user?.firstName ?? "",
      middleName: state?.user?.middleName ?? "",
      dob: state?.user?.middleName ?? "",
      pob: state?.user?.pob ?? "",
      livesWith: state?.user?.livesWith ?? "",
      email: state?.user?.email ?? "",
      gender: state?.user?.gender ?? "",
      currSchool: state?.user?.currSchool ?? "",
      lastSchool: state?.user?.lastSchool ?? "",
      phone: state?.user?.phone ?? "",
      religion: state?.user?.religion ?? "",
    },
    onSubmit:((values) => {
      setLoading(true)
      const body = {...values, action: "personal", id}
      api.post("onboard", body)
      .then((res: AxiosResponse) => {
        setLoading(false)
        if(res.data.code == 200) {
          localStorage.setItem("onboarding", "2")
          switchIndex(++currIndex)
        }
      })
      .catch((err: AxiosError) => {
        setLoading(false)
        console.log(err.message)
      })
    })
  })

  const fields: Field[] = [
    {
        title: "lastname",
        value: "lastname",
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

  const setField = (field: string, value: string) => {
    formik.setFieldValue(field, value);
    dispatch({
      type: "SET_FIELD_VALUE",
      payload: { title: field, meta: value },
    });
  };

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
        <Button onClick={() => formik.handleSubmit()} className="bg-[#267F29] text-white rounded-lg w-[150px] h-[40px]">
            {loading ? <CircularProgress thickness={6} className="text-white w-[50px] h-[50px]" /> : <p>Next</p>}
        </Button>
    </div>
    </div>
  )
};
