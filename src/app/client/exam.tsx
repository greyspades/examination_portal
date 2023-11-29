import React, { useState } from "react";
import { Button, Paper, IconButton } from "@mui/material";

export const Exam = () => {
  const [validated, setValidated] = useState<boolean>(false);

  const options = [
    {
        option: "A.",
        text: "Paris"
    },
    {
        option: "B.",
        text: "Istanbul"
    },
    {
        option: "C.",
        text: "Cairo"
    },
    {
        option: "D.",
        text: "Abuja"
    }
  ]

  const renderOptions = () => {
    return options.map((item: {[key: string]: any}, idx: number) => (
        <Paper key={idx} className="flex flex-row h-[40px] mt-[20px] px-6 place-items-center justify-between">
            <div className="flex flex-row text-[#008000] font-medium gap-10">
            <div>
                {item.option}
            </div>
            <div>
                {item.text}
            </div>
            </div>
            <IconButton className="w-[20px] h-[20px] bg-[#CBE6C8] rounded-full">
                
            </IconButton>
        </Paper>
    ))
  }
  
  return (
    <div className="text-black">
        <div>
            <p className="font-semibold text-[24px]">Question 1 / 50</p>
        </div>
        <div className="bg-[#F7FCF7] w-[100%] p-8 py-10 rounded-lg mt-[20px] font-medium">
            What is the capital of Turkey? 
        </div>
        <div>
            {renderOptions()}
        </div>
        <div className="flex flex-row justify-between mt-[40px] text-[14px] ">
            <Button className="text-white bg-[#267F29] h-[40px] w-[100px]">
                Prev
            </Button>
            <Button className="text-white bg-[#267F29] h-[40px] w-[150px]">
                Next
            </Button>
        </div>
    </div>
  )
};
