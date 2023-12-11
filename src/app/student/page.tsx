"use client";
import React, { useContext, useState } from "react";
import { CustomInput } from "../components/customInput";
import { api } from "../../../helpers/connection";
import { AxiosError, AxiosResponse } from "axios";
import { ComponentContext } from "../../../context/component.context";
import { NotifierContext } from "../../../context/notifier.context";
import { Notifier } from "../components/notifier";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { ValidateId } from "./validate";
import { Signup } from "./signup";
import { Login } from "./login";

const Student = () => {
  const [index, setIndex] = useState<number>(1);
  const { state, dispatch } = useContext(ComponentContext);
  const { notifierState, notifierDispatch } = useContext(NotifierContext);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const switchIndex = (idx: number) => {
    setIndex(idx)
  }

  const renderConponent = () => {
    switch(index) {
      case 1 :
        return <ValidateId index={index} switchIndex={switchIndex} />
      case 2 :
        return <Signup index={index} switchIndex={switchIndex} />
      case 3 :
        return <Login index={index} switchIndex={switchIndex} />
      default :
      return <ValidateId index={index} switchIndex={switchIndex} />
    }
  }

  return (
    <div>
      <Notifier
        title={notifierState?.title}
        content={notifierState?.content}
        open={notifierState?.open}
        next={notifierState.next}
        code={notifierState?.code}
      />
      <div className="grid grid-cols-2">
        <div className="grid col-span-1 relative">
          <img
            src="/login.jpg"
            alt="/login"
            className="w-[100%] h-[100vh] object-cover"
          />
          <div className="absolute top-[326px] left-[274px] border-l-8 border-l-[#D48B05] pl-1">
            <p className="text-[#107F07] text-[42px] font-semibold">
              Scholarship <br /> Examination <br /> Portal
            </p>
          </div>
        </div>
        <div className="grid col-span-1 bg-white justify-center p-6">
            <div className="">
            {renderConponent()}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
