import { CircularProgress } from '@mui/material'
import { AxiosResponse, AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { ComponentContext } from '../../../context/component.context';
import { NotifierContext } from '../../../context/notifier.context';
import { api } from '../../../helpers/connection';
import { CustomInput } from '../components/customInput'
import { useFormik } from 'formik';
import { LoginValidation } from '../../../helpers/validation';

interface PageProps {
    index: number,
    switchIndex: (idx: number) => void
}

export const  Login = ({index, switchIndex}: PageProps) => {
    const [id, setId] = useState<string>();
    const { state, dispatch } = useContext(ComponentContext);
    const { notifierState, notifierDispatch } = useContext(NotifierContext);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginValidation,
        onSubmit:((values) => {
            const body = {
                email: values.email,
                password: values.password,
                id: state?.id
            }
            // console.log(body)
            api.post("loginStudent", body)
            .then((res: AxiosResponse) => {
               if(res.data.code == 200) {
                    router.replace(`onboarding/${state?.id}`)
               } else {
                notifierDispatch({type: "CREATE", payload: {code: res.data.code, title: "Unsuccessfull", open: true, content: res.data.message}})
               }
            })
            .catch((err: AxiosError) => {
                console.log(err.message)
                notifierDispatch({type: "CREATE", payload: {code: parseInt(err.code), title: "Unsuccessfull", open: true, content: err.message}})

            })
        })
    })
    
  return (
    <div className='mt-[150px]'>
        <div className="flex flex-col justify-center place-items-center">
            <p className="text-[#107F07] text-[24px] font-medium mt-[-40px] mb-[30px]">
              Sign In
            </p>
             <div className='flex flex-col gap-6'>
             <CustomInput
              value={formik.values.email}
              onChange={(e: any) => formik.setFieldValue("email", e.target.value)}
              component={"text"}
              placeHolder="Email"
              type={"email"}
              classes="bg-[#F7FCF7] w-[500px] rounded-full no-underline h-[60px] px-4 row-span-1 mt-[40px]"
              error={formik.errors?.email}
              // selValues={item?.options ? item?.options : null}
            />
            <CustomInput
              value={formik.values.password}
              onChange={(e: any) => formik.setFieldValue("password", e.target.value)}
              component={"text"}
              placeHolder="Password"
              type={"password"}
              classes="bg-[#F7FCF7] w-[500px] rounded-full no-underline h-[60px] px-4 row-span-1 mt-[40px]"
              error={formik.errors?.password}
              // selValues={item?.options ? item?.options : null}
            />
             </div>
            <button
              onClick={() => formik.handleSubmit()}
              className="bg-[#107F07] text-white w-[500px] h-[60px] rounded-2xl text-[16px] mt-[60px]"
            >
              {loading ? (
                <CircularProgress thickness={6} className="w-[50px] text-white h-[50px]" />
              ) : (
                <p>Submit</p>
              )}
            </button>
            <p className="text-black mt-[20px] text-[14px]">
                Don’t have an account ? <button onClick={() => switchIndex(2)} className='text-green-700'>Sign Up</button>
            </p>
          </div>
    </div>
  )
}
