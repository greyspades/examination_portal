import React from "react";
import { CustomInput } from "../components/customInput";
import { useFormik } from "formik";
import {
    Paper,
    Avatar,
    Divider
} from "@mui/material";

export const Dashboard = () => {

    return (
        <div className="text-black p-6">
            <div className="flex flex-row gap-6 ">
                <Paper className="bg-[#F9F9F9] w-[230px] h-[100px] flex flex-col justify-center place-items-center gap-6">
                    <p className="text-[14px]">Total Applicants</p>
                    <p className="text-[28px] text-[#107F07] font-semibold">100</p>
                </Paper>
                <Paper className="bg-[#F9F9F9] w-[230px] h-[100px] flex flex-col justify-center place-items-center gap-6">
                    <p className="text-[14px]">New Applicants</p>
                    <p className="text-[28px] text-[#107F07] font-semibold">100</p>
                </Paper>
                <Paper className="bg-[#F9F9F9] w-[230px] h-[100px] flex flex-col justify-center place-items-center gap-6">
                    <p className="text-[14px]">Ongoing Verifications</p>
                    <p className="text-[28px] text-[#107F07] font-semibold">100</p>
                </Paper>
                <Paper className="bg-[#F9F9F9] w-[230px] h-[100px] flex flex-col justify-center place-items-center gap-6">
                    <p className="text-[14px]">Top performing candidates</p>
                    <p className="text-[28px] text-[#107F07] font-semibold">100</p>
                </Paper>
            </div>

            <div className="grid grid-cols-5 mt-[40px]">
                <div className="col-span-3">
                    <img src="/graph.svg" className="w-[100%] h-[100%]" alt="/"/>
                </div>
                <div className="col-span-2">
                    <div className="flex justify-between"><p className="text-[18px] font-medium">Pending Verifications</p>
                    <p className="text-[12px]">Sort by Newest</p>
                    </div>
                    <div className="flex flex-row place-items-center gap-4 mt-[20px] p-2">
                        <Avatar />
                        <div className="flex flex-col gap-1">
                            <p>charles something</p>
                            <p className="text-gray-400 text-[11px]">charles something</p>
                        </div>
                    </div>
                    <div className="flex flex-row place-items-center gap-4 mt-[20px] p-2 bg-green-100 rounded-lg">
                        <Avatar />
                        <div className="flex flex-col gap-1">
                            <p>charles something</p>
                            <p className="text-gray-400 text-[11px]">charles something</p>
                        </div>
                    </div>
                    <div className="flex flex-row place-items-center gap-4 mt-[20px] p-2">
                        <Avatar />
                        <div className="flex flex-col gap-1">
                            <p>charles something</p>
                            <p className="text-gray-400 text-[11px]">charles something</p>
                        </div>
                    </div>
                    <Divider className="h-[2px] bg-gray-300" />

                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-[#F9F9F9] flex flex-col h-[100px] rounded-lg p-3">
                            <p className="text-gray-500 font-medium">Top Scorer</p>
                            <p className="text-[#FFA500] text-[24px] font-medium">90</p>
                            <p className="text-[#107F07]">Ali Husain</p>
                        </div>
                        <div className="bg-[#F9F9F9] flex flex-col h-[100px] rounded-lg p-3">
                        <p className="text-gray-500 text-[10px] font-medium">Zone with the most no. of applicants</p>
                            <p className="text-[#FFA500] text-[18px] font-medium">FCT zone</p>
                        </div>
                        <div className="bg-[#F9F9F9] flex flex-col h-[100px] rounded-lg p-3">
                        <p className="text-gray-500 text-[10px] font-medium">Average Age</p>
                            <p className="text-[#FFA500] text-[24px] font-medium">11 yrs</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}