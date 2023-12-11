"use client";
import React, { useState, useContext } from "react";
import { CustomInput } from "../../components/customInput";
import { useFormik } from "formik";
import { Button, CircularProgress, TextareaAutosize, TextField } from "@mui/material";
import { ComponentContext } from "../../../../context/component.context";
import { NotifierContext } from "../../../../context/notifier.context";
import { useRouter } from "next/navigation";
import { api } from "../../../../helpers/connection";
import { AxiosResponse, AxiosError } from "axios";

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

export const Banking = ({
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
      mpkAccNo: state?.user?.mpkAccNo ?? "",
      branch: state?.user?.branch ?? "",
      accountName: state?.user?.accountName ?? "",
      area: state?.user?.area ?? "",
      union: state?.user?.union ?? "",
      branchManager: state?.user?.branchManager ?? "",
    },
    onSubmit:((values) => {
      setLoading(true)
      const body = {...values, action: "banking", id}
      api.post("onboard", body)
      .then((res: AxiosResponse) => {
        setLoading(false)
        if(res.data.code == 200) {
          console.log(res.data)
          localStorage.setItem("onboarding", "5")
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
        title: "MPK Account No. *",
        value: "mpkAccNo",
        type: "text"
    },
    {
        title: "Account Name*",
        value: "accountName",
        type: "text"
    },
    {
        title: "Branch *",
        value: "branch",
        type: "text"
    },
    {
        title: "Branch Manager*",
        value: "branchManager",
        type: "text"
    },
    {
        title: "Area *",
        value: "area",
        type: "text"
    },
    {
        title: "Union *",
        value: "union",
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
