"use client";
import React, { useState, useContext } from "react";
import { CustomInput } from "../../components/customInput";
import { FormikProps, useFormik } from "formik";
import { Button, CircularProgress, TextareaAutosize, TextField } from "@mui/material";
import { ComponentContext } from "../../../../context/component.context";
import { NotifierContext } from "../../../../context/notifier.context";
import { useRouter } from "next/navigation";
import { AxiosResponse, AxiosError } from "axios";
import { api } from "../../../../helpers/connection";

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
    options?: string[]
}

export const Parents = ({
  switchIndex,
  currIndex,
  id
}: OnboardingProps) => {
  const { state, dispatch } = useContext(ComponentContext);
  const { notifierState, notifierDispatch } = useContext(NotifierContext);
  const [index, setIndex] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      nameOfFather: state?.user?.nameOffather ?? "",
      nameOfMother: state?.user?.nameOfMother ?? "",
      fathersOccupation: state?.user?.fathersOccupation ?? "",
      mothersOccupation: state?.user?.mothersOccupation ?? "",
      fathersWorkAddress: state?.user?.fathersWorkAddress ?? "",
      mothersWorkAddress: state?.user?.mothersWorkAddress ?? "",
      mothersHomeAddress: state?.user?.mothersHomeAddress ?? "",
      fathersHomeAddress: state?.user?.fathersHomeAddress ?? "",
      numberOfWives: state?.user?.numberOfWives ?? "",
      numberOfChildren: state?.user?.numberOfChildren ?? "",
    },
    onSubmit:((values) => {
      setLoading(true)
      const body = {...values, action: "parents", id}
      api.post("onboard", body)
      .then((res: AxiosResponse) => {
        setLoading(false)
        if(res.data.code == 200) {
          localStorage.setItem("onboarding", "3")
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
        title: "name of father",
        value: "nameOfFather",
        type: "text"
    },
    {
        title: "name of mother",
        value: "nameOfMother",
        type: "text"
    },
    {
        title: "fathers occupation",
        value: "fathersOccupation",
        type: "text"
    },
    {
        title: "mothers occupation",
        value: "mothersOccupation",
        type: "text"
    },
    {
        title: "fathers work address",
        value: "fathersWorkAddress",
        type: "text"
    },
    {
        title: "mothers work address",
        value: "mothersWorkAddress",
        type: "text"
    },
    // {
    //     title: "mothers work address",
    //     value: "mothersHomeAddress",
    //     type: "email"
    // },
    {
        title: "fathers home address",
        value: "fathersHomeAddress",
        type: "text",
    },
    {
        title: "mothers home address",
        value: "mothersHomeAddress",
        type: "text"
    },
    {
        title: "number of wives",
        value: "numberOfWives",
        type: "text"
    },
    {
        title: "number of children",
        value: "numberOfChildren",
        type: "text"
    },
  ];

  const setField = (field: string, value: string) => {
    if(field == "numberOfWives" || field == "numberOfChildren") {
      value = value.replace(/[^0-9]/g, '')
    }
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
          inputProps={item.type == "number" ? {inputMode: 'numeric', pattern: '[0-9]*'} : {}}
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
