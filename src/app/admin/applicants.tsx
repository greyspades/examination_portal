import Avatar from "@mui/material/Avatar";
import { AxiosError, AxiosResponse } from "axios";
import React, { useContext, useEffect, useState, use } from "react";
import { ComponentContext } from "../../../context/component.context";
import { NotifierContext } from "../../../context/notifier.context";
import { api } from "../../../helpers/connection";
import { Student, PersonalInfo } from "./types";
import { Input } from "@mui/material";
import { CustomInput } from "../components/customInput";
import { StudentAvatar } from "./avatar";
import { CircularProgress } from "@mui/material";

export const Applicants = () => {
  const { state, dispatch } = useContext(ComponentContext);
  const { notifierState, notifierDispatch } = useContext(NotifierContext);
  const [page, setPage] = useState<number>(0);
  const [take, setTake] = useState<number>(10);
  const [students, setStudents] = useState<Student[]>([]);
  const [activeIdx, setActiveIdx] = useState<number>();
  const [activeStudent, setActiveStudent] = useState<PersonalInfo>();
  const [searchVal, setSearchVal] = useState<string>();
  const [sortVal, setSortVal] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  // const avatar = use(StudentAvatar())

  // const fetchData = () => {
  //     axios.post("url", body, {header: {}})
  //     .then((res) => {
  //         console.log(res.data)
  //     })
  //     .catch((err) => {
  //         console.log(err.message)
  //     })
  // }

  const getApplicants = () => {
    let body = {
      page,
      take,
    };
    api
      .post("getApplicants", body)
      .then((res: AxiosResponse) => {
        if (res.data.code == 200) {
          setStudents(res.data.data);
        }
      })
      .catch((err: AxiosError) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getApplicants();
  }, [page, take]);

  const toggleActive = (stud: Student, idx: number) => {
    // setActiveStudent(stud)
    setActiveStudent(null);
    getInfo(stud.id);
    setActiveIdx(idx);
  };

  const getInfo = (id: string) => {
    setLoading(true);
    let body = {
      id,
      field: "PERSONAL",
    };
    api
      .post("getStudentInfo", body)
      .then((res: AxiosResponse) => {
        setLoading(false);
        setActiveStudent(res.data.data);
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        console.log(err.message);
      });
  };

  const renderApplicants = () => {
    return students?.map((item: Student, idx: number) => (
      <button
        onClick={() => toggleActive(item, idx)}
        className={
          activeIdx == idx ? "p-4 rounded-2xl bg-[#DAF9DA]" : "p-4 rounded-2xl"
        }
        key={idx}
      >
        <div className="flex place-items-center gap-4">
          <Avatar
            src={`${process.env.NEXT_PUBLIC_GET_PASSPORT}/${item.passport}`}
          />
          <div className="flex flex-col gap-2 place-items-start text-[12px]">
            <p className="text-black">{item?.firstName ?? "James doe"}</p>
            <p>
              {item?.branch} {item?.zone}
            </p>
          </div>
        </div>
      </button>
    ));
  };

  const handleSearch = (value: string) => {};

  const renderActiveStudent = () => {
    return (
      <div className="px-4 flex flex-col gap-4">
        <div>
          <p className="font-semibold text-[16px]">Personal Information</p>
        </div>
        <div className="bg-gray-100 flex flex-col gap-6 p-4 rounded-md">
          <div className="flex gap-8">
            <div className="flex gap-2">
              Surname:{" "}
              <p className="border-b-2 border-b-black">
                {activeStudent.lastName}
              </p>
            </div>
            <div className="flex gap-2">
              Other names:{" "}
              <p className="border-b-2 border-b-black">
                {activeStudent.firstName}
              </p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex gap-2">
              Date of birth:{" "}
              <p className="border-b-2 border-b-black">{activeStudent.email}</p>
            </div>
            <div className="flex gap-2">
              Place of birth:{" "}
              <p className="border-b-2 border-b-black">
                {activeStudent.firstName}
              </p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex gap-2">
              Sex:{" "}
              <p className="border-b-2 border-b-black">
                {activeStudent.gender}
              </p>
            </div>
            <div className="flex gap-2">
              Who do you live with:{" "}
              <p className="border-b-2 border-b-black">
                {activeStudent.livesWith}
              </p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex gap-2">
              Email:{" "}
              <p className="border-b-2 border-b-black">{activeStudent.email}</p>
            </div>
            <div className="flex gap-2">
              Phone number:{" "}
              <p className="border-b-2 border-b-black">{activeStudent.phone}</p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex gap-2">
              Current school:{" "}
              <p className="border-b-2 border-b-black">
                {activeStudent.currSchool}
              </p>
            </div>
            <div className="flex gap-2">
              Last school attended:{" "}
              <p className="border-b-2 border-b-black">
                {activeStudent.lastSchool}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="rounded-xl bg-[#267F29] h-[40px] w-[100px] text-white">
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen text-black">
      <div className="mt-[40px]">
        <p className="text-[24px] font-semibold">Applicants</p>
      </div>
      <div className="flex gap-20">
        <div className="flex gap-2 place-items-center">
          <p className="text-[12px] w-[80px]">Search By</p>
          <CustomInput
            value={searchVal}
            onChange={(e: any) => setSearchVal(e.target.value)}
            classes="bg-[#F9F9F9] h-[35px] w-[200px]"
            component="select"
            selValues={["firstname", "lastname", "branch"]}
          />
        </div>
        <div className="flex gap-2 place-items-center">
          <p className="text-[12px] w-[80px]">Search</p>v
          <CustomInput
            value={searchVal}
            onChange={(e: any) => handleSearch(e.target.value)}
            classes="bg-[#F9F9F9] h-[35px] w-[200px]"
            component="text"
          />
        </div>
        <div className="flex gap-2 place-items-center">
          <p className="text-[12px] w-[80px]">Sort By</p>
          <CustomInput
            value={searchVal}
            onChange={(e: any) => setSearchVal(e.target.value)}
            classes="bg-[#F9F9F9] h-[35px] w-[200px]"
            component="select"
            selValues={["firstname", "lastname", "branch"]}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 mt-[30px] gap-8">
        <div className="grid col-span-1 gap-2">{renderApplicants()}</div>
        <div className="grid col-span-1">
          {activeStudent != null && !loading ? (
            <div>{renderActiveStudent()}</div>
          ) : !activeStudent && loading ? (
            <CircularProgress
              thickness={6}
              className="w-[60px] h-[60px] text-green-700"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
