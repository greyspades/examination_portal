"use client";
import React, { useState, useContext } from "react";
import { CustomInput } from "../../components/customInput";
import { FormikProps, useFormik } from "formik";
import { Button, TextareaAutosize, TextField } from "@mui/material";
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

export const Attachments = ({
  switchIndex,
  currIndex,
  id
}: OnboardingProps) => {
  const { state, dispatch } = useContext(ComponentContext);
  const { notifierState, notifierDispatch } = useContext(NotifierContext);
  const [index, setIndex] = useState<number>(1);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      referenceByPrincipal: File,
      firstResult: File,
      secondResult: File,
      thirdResult: File,
      accountCard: File,
      passport: File,
      membershipCard: File,
      birthCert: File,
      attestation: File,
      id: id
    },
    onSubmit:((values) => {
      const formData = new FormData()
      Object.keys(values).forEach((item) => {
        formData.append(item, values[item])
      })
      api.post("saveDocuments", formData, {headers: {
        "Content-Type": "multipart/form-data"
      }})
      .then((res: AxiosResponse) => {
        if(res.data.code == 200) {
          router.push("/success")
        }
      })
      .catch((err: AxiosError) => {
        console.log(err.message)
      })
    })
  })

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


  const fields: Field[] = [
    {
        title: "Reference by Principal",
        value: "referenceByPrincipal",
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
          onChange={(e: any) => setField(item.value, e.target.files[0])}
          component={item?.options ? "select" : "text"}
          placeHolder={item.title}
          type={item.type}
          classes="bg-[#F7FCF7] w-[350px] rounded-2xl no-underline h-[40px] px-4"
          error={formik.errors?.[item.value]}
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
