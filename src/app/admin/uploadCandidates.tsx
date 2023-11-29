import React from "react";
import { CustomInput } from "../components/customInput";
import { useFormik } from "formik";
import {
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TablePagination,
} from "@mui/material";

export const UploadCandidates = () => {
  return (
    <div className="text-black p-4">
      <div className="flex flex-row justify-between">
        <p className="text-[28px] font-medium">Upload Screened Applicants</p>
        <div className="flex gap-6">
          <button className="text-[12px] bg-[#267F29] h-[35px] w-[170px] text-white rounded-md">
            Batch Upload
          </button>
          <button className="text-[12px] bg-[#267F29] h-[35px] w-[170px] text-white rounded-md">
            Single Upload
          </button>
        </div>
      </div>

      <table className="mt-[20px] w-[100%]">
        <thead className="bg-gray-200 h-[40px] rounded-md">
          <tr className="w-[100%]">
            <td className="w-[200px] ml-4">File Name</td>
            <td className="w-[200px] ml-4">File Type</td>
            <td className="w-[200px] ml-4">Upload Date</td>
            <td className="w-[200px] ml-4">Actions</td>
          </tr>
        </thead>
        <tbody className="bg-white w-[100%]">
          <tr>
            <td className="w-[200px]">File Name</td>
            <td className="w-[200px]">File Type</td>
            <td className="w-[200px]">Upload Date</td>
            <td className="w-[200px]">Actions</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
