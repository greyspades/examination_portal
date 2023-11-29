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
import { Personal } from "./personal";
import { Parents } from "./parents";
import { Education } from "./education";
import { EducationType } from "./types";
import { Banking } from "./banking";
import { Attachments } from "./attachments";
import { api } from "../../../helpers/connection";
import axios, { AxiosResponse } from "axios";

type Step = { title: string; index: number };

const Client = (props) => {
  const { state, dispatch } = useContext(ComponentContext);
  const { notifierState, notifierDispatch } = useContext(NotifierContext);
  const [index, setIndex] = useState<number>(1);
  const router = useRouter();
  const [education, setEducation] = useState<EducationType[]>(state?.user?.education ?? []);
  const formik = useFormik({
    initialValues: {
      surname: state?.user?.surname ?? "",
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
      referenceByPrincipal: File,
      firstResult: File,
      secondResult: File,
      thirdResult: File,
      accountCard: File,
      passport: File,
      membershipCard: File,
      birthCert: File,
      attestation: File,
    },
    onSubmit: (values) => {
      // console.log(values)
      var documents = {
        firstResult: values.firstResult,
        secondResult: values.secondResult,
        thirdResult: values.thirdResult,
        accountCard: values.accountCard,
        passport: values.passport,
        membershipCard: values.membershipCard,
        birthCert: values.birthCert,
        attestation: values.attestation,
        referenceByPrincipal: values.referenceByPrincipal
      }
      const formData = new FormData()

      Object.keys(documents).forEach((item) => {formData.append(item, documents[item])})
      
      var body = {
        scope: "DOCUMENTS",
        documents: {
          docs: formData
        }
      }
      const docs = {
        docs: formData
      }
      // console.log(formData)
      console.log(documents)
      console.log(Object.keys(documents))

      axios.post("http://localhost:5049/Student/documents", formData, { headers: {
        "Content-Type": "multipart/form-data"
      }})
      .then((res: AxiosResponse) => {
        console.log(res.data)
      })
      // router.push("success");
    },
  });

  const updateEdu = (field: string, index: number, value: string) => {
    let update = education.map((item: EducationType, idx: number) => {
      if (idx == index) {
        item[field] = value;
      }
      return item;
    });
    setEducation(update);
  };

  const steps: Step[] = [
    {
      title: "Personal Information",
      index: 1,
    },
    {
      title: "Parents Information",
      index: 2,
    },
    {
      title: "Educational Information",
      index: 3,
    },
    {
      title: "Banking Information",
      index: 4,
    },
    {
      title: "Attachments",
      index: 5,
    },
  ];

  const handleFieldSet = (field: string, value: string) => {
    formik.setFieldValue(field, value);
    dispatch({
      type: "SET_FIELD_VALUE",
      payload: { title: field, meta: value },
    });
  };

  const addEducation = () => {
    let update = {
      school: "",
      address: "",
      from: "",
      to: "",
      cert: "",
    };
    setEducation([...education, update]);
  };

  const removeEducation = (index: number) => {
    let update = education.filter((item: EducationType) => education.indexOf(item) != index)
    setEducation(update);
  };

  const switchIndex = (idx: number) => {
    setIndex(idx);
  };

  const renderScreen = () => {
    switch (index) {
      case 1:
        return (
          <Personal
            currIndex={index}
            switchIndex={switchIndex}
            formik={formik}
            setField={handleFieldSet}
          />
        );
      case 2:
        return (
          <Parents
            currIndex={index}
            switchIndex={switchIndex}
            formik={formik}
            setField={handleFieldSet}
          />
        );
      case 3:
        return (
          <Education
            currIndex={index}
            switchIndex={switchIndex}
            formik={formik}
            setField={updateEdu}
            addEdu={addEducation}
            edu={education}
            remove={removeEducation}
          />
        );
      case 4:
        return (
          <Banking
            currIndex={index}
            switchIndex={switchIndex}
            formik={formik}
            setField={handleFieldSet}
          />
      );
      case 5:
        return (
          <Attachments
            currIndex={index}
            switchIndex={switchIndex}
            formik={formik}
            setField={handleFieldSet}
          />
      );
      default:
        return (
          <Personal
            currIndex={index}
            switchIndex={switchIndex}
            formik={formik}
            setField={handleFieldSet}
          />
        );
    }
  };

  const renderSteps = () => {
    return steps.map((item: Step, idx: number) => (
      <div className="flex flex-row place-items-center gap-2" key={idx}>
        <div
          className={
            index == item.index
              ? "w-[60px] h-[60px] rounded-full bg-[#107F07] flex justify-center items-center text-white"
              : "w-[60px] h-[60px] rounded-full bg-[#DAF9DA] flex justify-center items-center text-black"
          }
        >
          {item.index}
        </div>
        <p className="text-black text-[14px]">{item.title}</p>
      </div>
    ));
  };
  return (
    <div className="h-screen bg-white fixed w-screen">
      <Navbar />
      <div className="mt-[60px] grid grid-cols-12 p-6">
        <div className="grid col-span-4 border-r-4 border-r-[#CBE6C8] p-6">
          <div className="fixed">
            <p className="text-black text-[20px] font-semibold">
              Applicant Onboarding
            </p>
            <div className="flex flex-col gap-8 mt-[40px]">{renderSteps()}</div>
          </div>
        </div>
        <div className="grid col-span-8 static overflow-y-scroll overflow-x-auto h-[90vh]">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
};

export default Client;
