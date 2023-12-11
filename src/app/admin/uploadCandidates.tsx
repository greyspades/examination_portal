import React, { useState, useRef, useContext } from "react";
import { CustomInput } from "../components/customInput";
import { useFormik } from "formik";
import {
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import { api } from "../../../helpers/connection";
import { AxiosError, AxiosResponse } from "axios";
import { ComponentContext } from "../../../context/component.context";
import { NotifierContext } from "../../../context/notifier.context";

export const UploadCandidates = () => {
  const [file, setFile] = useState<File>()
  const [loading, setLoading] = useState<boolean>(false)
  const {state, dispatch} = useContext(ComponentContext)
  const {notifierState, notifierDispatch} = useContext(NotifierContext)


  const formik = useFormik({
    initialValues: {
      file: File
    },
    onSubmit: ((values) => {
      api.post("uploadCandidates", values.file, {headers: {
        "Content-Type": "multipart/form-data",
    }})
    .then((res: AxiosResponse) => {
      console.log(res.data)
    })
    .catch((err: AxiosError) => {
      console.log(err.message)
    })
    })
  })

  const fileInputRef = useRef(null);

  const currentDate = new Date().toLocaleDateString();

  const handleButtonClick = () => {
    // Trigger click event on the hidden file input
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    // Handle the selected file here
    const selectedFile = event.target.files[0];
    setFile(selectedFile)
    setLoading(true)
    api.post("uploadStudents", {file: selectedFile}, {headers: {
      "Content-Type": "multipart/form-data",
  }})
  .then((res: AxiosResponse) => {
    console.log(res.data)
    if(res.data.code == 200) {
      notifierDispatch({type:"CREATE", payload: {code: res.data.code, title: "Successfull", open: true, content: res.data.message}})
    }
    setLoading(false)
  })
  .catch((err: AxiosError) => {
    console.log(err.message)
    setLoading(false)
  })
  };

  return (
    <div className="text-black p-4 h-screen">
      <div className="flex flex-row justify-between">
        <p className="text-[28px] font-medium">Upload Screened Applicants</p>
        <div className="flex gap-6">
          <button onClick={handleButtonClick} className="text-[12px] bg-[#267F29] h-[35px] w-[170px] text-white rounded-md">
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
            {/* <td className="w-[200px] ml-4">Actions</td> */}
          </tr>
        </thead>
        <tbody className="bg-white w-[100%]">
          <tr>
            <td className="w-[200px]">{file?.name}</td>
            <td className="w-[200px]">{file?.name?.split(".")[1]}</td>
            <td className="w-[200px]">{file ? currentDate : null}</td>
            {/* <td className="w-[200px]">Actions</td> */}
          </tr>
        </tbody>
      </table>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {loading && (
        <div className="flex justify-center mt-[50px]">
        <CircularProgress thickness={8} className="w-[100px] h-[100px] text-green-700" />
      </div>
      )}
    </div>
  );
};
