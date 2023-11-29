import React from "react";
import { CustomInput } from "../components/customInput";
import { useFormik } from "formik";
import { Button, TextareaAutosize, TextField, Paper } from "@mui/material";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { ApplicantTable } from "./applicantTable";

export const Applicants = () => {
    const formik = useFormik({
        initialValues: {
            searchVal: "",
            sortType: "",
            searchType: ""
        },
        onSubmit: ((values) => {
            console.log(values)
        })
    })
    return (
        <div className="text-black p-4">
            <div>
                <p className="text-[28px] font-medium">
                    Applicants
                </p>
            </div>
            <div className="mt-[20px]">
                <form onSubmit={formik.handleSubmit} className="flex flex-row place-items-center gap-8">
                    <div className="flex gap-2 place-items-center w-[50%]">
                    <p className="text-[11px] w-[100px]">Search by</p>
                    <CustomInput
                        value={formik.values.searchType}
                        onChange={(e: any) => formik.setFieldValue("searchType", e.target.value)}
                        classes="bg-[#F9F9F9] h-[35px] w-[200px]"
                        component="select"
                        selValues={["name", "branch"]}
                    />
                    </div>
                    <div className="flex gap-2 place-items-center w-[50%]">
                    <p className="text-[11px] w-[100px]">Sort by</p>
                    <CustomInput
                        value={formik.values.searchType}
                        onChange={(e: any) => formik.setFieldValue("sortType", e.target.value)}
                        classes="bg-[#F9F9F9] h-[35px] w-[200px]"
                        component="select"
                        selValues={["name", "branch"]}
                    />
                    </div>
                </form>

                <div className="mt-[50px]">
                    <ApplicantTable />
                </div>
            </div>
        </div>
    )
}