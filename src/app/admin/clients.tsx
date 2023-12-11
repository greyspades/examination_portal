import React, { useEffect, useState } from "react";
import { CustomInput } from "../components/customInput";
import { useFormik } from "formik";
import { Button, TextareaAutosize, TextField, Paper, IconButton } from "@mui/material";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { ApplicantTable } from "./applicantTable";
import { api } from "../../../helpers/connection";
import { AxiosError, AxiosResponse } from "axios";
import { Student } from "./types";
import RefreshIcon from '@mui/icons-material/Refresh';


export const Clients = () => {
    const [page, setPage] = useState<number>(0)
    const [take, setTake] = useState<number>(10)
    const [students, setStudents] = useState<Student[]>()
    const [field, setField] = useState<string>("firstname")
    const [searchVal, setSearchVal] = useState<string>()
    const [sortType, setSortType] = useState<string>()

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

    const searchStudents = () => {
        const body = {
            field,
            value: searchVal
        }
        api.post("searchStudents", body)
        .then((res: AxiosResponse) => {
            setStudents(res.data.data)
        })
        .catch((err: AxiosError) => {
            console.log(err.message)
        })
    }

    const getStudents = () => {
        const body = {
            page,
            take
        }
        api.post("getStudents", body)
        .then((res: AxiosResponse) => {
            setStudents(res.data.data)
        })
        .catch((err: AxiosError) => {
            console.log(err.message)
        })
    }

    useEffect(() => {
        if(searchVal) {
            searchStudents()
        } else {
            getStudents()
        }
    }, [searchVal])

    useEffect(() => {
        getStudents()
    },[])
    return (
        <div className="text-black p-4 h-screen">
            <div>
                <p className="text-[28px] font-medium">
                    Candidates
                </p>
            </div>
            <div className="mt-[20px]">
                <form onSubmit={formik.handleSubmit} className="flex flex-row place-items-center gap-6">
                    <div className="flex gap-2 place-items-center w-[50%]">
                    <p className="text-[11px] w-[100px]">Search by</p>
                    <CustomInput
                        value={field}
                        onChange={(e: any) => setField(e.target.value)}
                        classes="bg-[#F9F9F9] h-[35px] w-[200px]"
                        component="select"
                        selValues={["firstname", "lastname", "branch"]}
                    />
                    </div>
                    <div className="flex gap-2 place-items-center w-[50%]">
                    <p className="text-[11px] w-[100px]">Search</p>
                    <CustomInput
                        value={searchVal}
                        onChange={(e: any) => setSearchVal(e.target.value)}
                        classes="bg-[#F9F9F9] h-[35px] w-[200px]"
                        component="text"
                    />
                    </div>
                    <div className="flex gap-2 place-items-center w-[50%]">
                    <p className="text-[11px] w-[100px]">Sort by</p>
                    <CustomInput
                        value={sortType}
                        onChange={(e: any) => setSortType(e.target.value)}
                        classes="bg-[#F9F9F9] h-[35px] w-[200px]"
                        component="select"
                        selValues={["name", "branch"]}
                    />
                    </div>
                    <IconButton onClick={getStudents} className="ml-[-50px]">
                        <RefreshIcon />
                    </IconButton>
                </form>

                <div className="mt-[50px]">
                    <ApplicantTable students={students} sort={sortType} />
                </div>
            </div>
        </div>
    )
}