import { CircularProgress } from '@mui/material'
import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { ComponentContext } from '../../../context/component.context';
import { NotifierContext } from '../../../context/notifier.context';
import { api } from '../../../helpers/connection';
import { CustomInput } from '../components/customInput'

interface PageProps {
    index: number,
    switchIndex: (idx: number) => void
}

export const  ValidateId = ({index, switchIndex}: PageProps) => {
    const [id, setId] = useState<string>();
    const { state, dispatch } = useContext(ComponentContext);
    const { notifierState, notifierDispatch } = useContext(NotifierContext);
    const [loading, setLoading] = useState<boolean>(false);
    // const router = useRouter();
  
    const submit = () => {
      if (id) {
        setLoading(true);
        const body = {
          id,
        };
        api
          .post("getStudentById", body)
          .then((res: AxiosResponse) => {
            if (res.data.code == 200) {
              setLoading(false);
              switchIndex(2)
            } else {
              setLoading(false);
              notifierDispatch({
                type: "CREATE",
                payload: {
                  code: res.data.code,
                  title: "Unsuccessfull",
                  open: true,
                  content: res.data.message,
                },
              });
            }
          })
          .catch((err: AxiosError) => {
            console.log(err.message);
            setLoading(false);
            notifierDispatch({
              type: "CREATE",
              payload: {
                code: 500,
                title: "Unsuccessfull",
                open: true,
                content: err.message,
              },
            });
          });
      } else {
        console.log("nothing dey");
        notifierDispatch({
          type: "CREATE",
          payload: {
            code: 500,
            title: "Error",
            open: true,
            content: "Please input your Id to begin",
          },
        });
      }
    };

const handleIdChange = (id: string) => {
    setId(id)
    dispatch({type: "SET_ID", payload: {id: id}})
}
    
  return (
    <div className='mt-[250px]'>
        <div className="flex flex-col justify-center place-items-center">
            <p className="text-[#107F07] text-[16px] font-medium mt-[-40px] mb-[30px]">
              Enter your ID to begin
            </p>
            <CustomInput
              value={id}
              onChange={(e: any) => handleIdChange(e.target.value)}
              component={"text"}
              placeHolder="Your ID"
              type={"text"}
              classes="bg-[#F7FCF7] w-[500px] rounded-full no-underline h-[60px] px-4 row-span-1 mt-[40px]"
              // error={formik.errors?.[item.value]}
              // selValues={item?.options ? item?.options : null}
            />
            <button
              onClick={submit}
              className="bg-[#107F07] text-white w-[500px] h-[60px] rounded-2xl text-[16px] mt-[60px]"
            >
              {loading ? (
                <CircularProgress thickness={6} className="w-[50px] text-white h-[50px]" />
              ) : (
                <p>Submit</p>
              )}
            </button>
            <p className="text-black mt-[20px] text-[14px]">
              Please look in your mailbox for the provided ID
            </p>
          </div>
    </div>
  )
}
