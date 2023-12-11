"use client";
import React, { useState, useContext } from "react";
import { CustomInput } from "../../components/customInput";
import { FormikProps, useFormik } from "formik";
import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { ComponentContext } from "../../../../context/component.context";
import { NotifierContext } from "../../../../context/notifier.context";
import { useRouter } from "next/navigation";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from '@mui/icons-material/Add';
import { EducationType } from "@/app/admin/types";
import { api } from "../../../../helpers/connection";
import { AxiosError, AxiosResponse } from "axios";

type Step = { title: string; index: number };

interface OnboardingProps {
  switchIndex: (idx: number) => void;
  currIndex: number;
  id: string
}

type Field = {
  title: string;
  value: string;
  type: string;
  options?: string[];
};

export const Education = ({
  switchIndex,
  currIndex,
  id
}: OnboardingProps) => {
  const { state, dispatch } = useContext(ComponentContext);
  const { notifierState, notifierDispatch } = useContext(NotifierContext);
  const [fields, setFields] = useState<{ [key: string]: any }[]>();
  const [index, setIndex] = useState<number>(1);
  const [education, setEducation] = useState<EducationType[]>(state?.user?.education ?? []);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

 const submitEducation = () => {
  setLoading(true)
  const body = {
    action: "education",
    data: education
  }
  api.post("onboard", body)
  .then((res: AxiosResponse) => {
    setLoading(false)
    if(res.data.code == 200) {
      localStorage.setItem("onboarding", "4")
      switchIndex(++currIndex)
    }
  })
  .catch((err: AxiosError) => {
    setLoading(false)
    console.log(err.message)
  })
 }

  const updateEducation = (field: string, index: number, value: string) => {
    let update = education.map((item: EducationType, idx: number) => {
      if (idx == index) {
        item[field] = value;
      }
      return item;
    });
    setEducation(update);
  };

  const addEducation = () => {
    let update = {
      id: id,
      school: "",
      address: "",
      startDate: "",
      endDate: "",
      cert: "",
    };
    setEducation([...education, update]);
  };

  const removeEducation = (index: number) => {
    let update = education.filter((item: EducationType) => education.indexOf(item) != index)
    setEducation(update);
  };

  const renderFields = () => {
    return education?.map((item: { [key: string]: any }, idx: number) => (
      <div key={idx} className="mt-6">
        <div className="flex flex-row">
          <div className="grid grid-cols-2 gap-8">
            <div className="grid col-span-1 grid-rows-2 justify-between gap-6">
              <div className="grid row-span-1">
                <CustomInput
                  value={item?.school}
                  onChange={(e: any) => updateEducation("school", idx, e.target.value)}
                  component={"text"}
                  placeHolder="school attended"
                  type={"text"}
                  classes="bg-[#F7FCF7] w-[350px] rounded-2xl no-underline h-[40px] px-4"
                  // error={formik.errors?.[item.value]}
                  // selValues={item?.options ? item?.options : null}
                />
              </div>

              <div className="grid row-span-1 grid-cols-2 gap-4">
                <CustomInput
                  value={item?.startDate}
                  onChange={(e: any) => updateEducation("startDate", idx, e.target.value)}
                  component={"text"}
                  placeHolder="start date"
                  type={"date"}
                  classes="bg-[#F7FCF7] w-[170px] rounded-2xl no-underline h-[40px] px-4 col-span-1"
                  // error={formik.errors?.[item.value]}
                  // selValues={item?.options ? item?.options : null}
                />
                <CustomInput
                  value={item?.endDate}
                  onChange={(e: any) => updateEducation("endDate", idx, e.target.value)}
                  component={"text"}
                  placeHolder="end date"
                  type={"date"}
                  classes="bg-[#F7FCF7] w-[170px] rounded-2xl no-underline h-[40px] px-4 col-span-1"
                  // error={formik.errors?.[item.value]}
                  // selValues={item?.options ? item?.options : null}
                />
              </div>
            </div>

            <div className="grid col-span-1 grid-rows-2 gap-6">
              <CustomInput
                value={item?.address}
                onChange={(e: any) => updateEducation("address", idx, e.target.value)}
                component={"text"}
                placeHolder="school address"
                type={"text"}
                classes="bg-[#F7FCF7] w-[350px] rounded-2xl no-underline h-[40px] px-4 row-span-1"
                // error={formik.errors?.[item.value]}
                // selValues={item?.options ? item?.options : null}
              />

              <CustomInput
                value={item?.cert}
                onChange={(e: any) => updateEducation("cert", idx, e.target.value)}
                component={"text"}
                placeHolder="certificate/last class attained"
                type={"text"}
                classes="bg-[#F7FCF7] w-[350px] rounded-2xl no-underline h-[40px] px-4 row-span-1"
                // error={formik.errors?.[item.value]}
                // selValues={item?.options ? item?.options : null}
              />
            </div>
          </div>
          <IconButton onClick={() => removeEducation(idx)} className="bg-[#CBE6C8] w-[35px] h-[35px] ml-[40px]">
            <DeleteOutlineIcon className="text-gray-400" />
          </IconButton>
        </div>
        <Divider className="h-1 bg-[#CBE6C8] mt-4" />
      </div>
    ));
  };

  const goToNextScreen = () => {
    switchIndex(++currIndex)
    dispatch({type: "SET_EDUCATION", payload: {user: {...state?.user, education: education}}})
  }

  return (
    <div className="h-screen w-[100%] relative p-6">
      {/* <div className="w-[100%]">
        <Button
          onClick={addEdu}
          className="bg-[#267F29] text-white rounded-lg w-[200px] h-[35px] ml-auto"
        >
          Add new Education
        </Button>
        <Divider className="bg-gray-500 h-0.5 mt-4" />
      </div> */}
      <div className="">{renderFields()}</div>
      <div className="flex justify-end mt-[30px]">
        <IconButton onClick={addEducation} className="w-[35px] h-[35px] bg-[#CBE6C8]">
          <AddIcon className="text-gray-500" />
        </IconButton>
      </div>
      <div className="flex justify-between w-[90%] mt-[50px] mb-[50px]">
        <Button
          onClick={() => switchIndex(--currIndex)}
          className="bg-[#267F29] text-white rounded-lg w-[100px] h-[40px]"
        >
          Prev
        </Button>
        <Button
          onClick={submitEducation}
          className="bg-[#267F29] text-white rounded-lg w-[150px] h-[40px]"
        >
            {loading ? <CircularProgress thickness={6} className="text-white w-[50px] h-[50px]" /> : <p>Next</p>}
        </Button>
      </div>
    </div>
  );
};
