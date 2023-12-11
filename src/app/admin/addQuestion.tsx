"use client";
import React, { useContext, useEffect, useState } from "react";
import { CustomInput } from "../components/customInput";
import { useFormik } from "formik";
import { Button, Switch, TextField, IconButton, CircularProgress } from "@mui/material";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { Subject } from "./types";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  ContentState,
  RichUtils,
  AtomicBlockUtils,
  convertToRaw,
} from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import { ComponentContext } from "../../../context/component.context";
import { NotifierContext } from "../../../context/notifier.context";
import { api } from "../../../helpers/connection";
import { AxiosError, AxiosResponse } from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import draftToHtml from "draftjs-to-html";
// import Editor from '@draft-js-plugins/editor';
import { ValidateQuestion } from "../../../helpers/validation";
import createImagePlugin from "@draft-js-plugins/image";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

interface AddQuestionProps {
  subject: Subject;
  close: () => void;
}

type Answer = "A" | "B" | "C" | "D";

type Option = {
  value: string;
  character: Answer;
};

export const AddQuestion = ({ subject, close }: AddQuestionProps) => {
  const { state, dispatch } = useContext(ComponentContext);
  const { notifierState, notifierDispatch } = useContext(NotifierContext);
  const [hasInstructions, setHasInstructions] = useState<boolean>(false);
  const [answer, setAnswer] = useState<Answer>("A");
  const [imagePrev, setImagePrev] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  var optArr:Option[] = [
    { character: "A", value: "" },
    { character: "B", value: "" },
    { character: "C", value: "" },
    { character: "D", value: "" },
  ]
  const [options, setOptions] = useState<Option[]>(state?.question?.options as Option[] ?? optArr);

  const handleOptionsChange = (e: any, char: string) => {
    var value = e.target.value;
    var result = options.map((item: Option, idx: number) => {
      if (item.character == char) {
        item.value = value;
      }
      return item;
    });
    setOptions(result);
    formik.setFieldValue("options", result);
  };

  const imagePlugin = createImagePlugin();

  const convertHtmlToPlainText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const convertPlainTextToEditorState = (plainText: string) => {
    if (plainText) {
      const contentState = ContentState.createFromText(
        convertHtmlToPlainText(plainText)
      );
      return EditorState.createWithContent(contentState);
    }
  };
  const initialEditorState =
    state.title == "EDIT"
      ? convertPlainTextToEditorState(state?.question?.question)
      : EditorState.createEmpty();
  const [editorState, setEditorState] = useState(initialEditorState);
  const formik = useFormik({
    initialValues: {
      question: editorState,
      options: state?.question?.options ?? options,
      answer: state?.question?.answer ?? "",
      instructions: state?.question?.instructions ?? "",
      bank: "",
      subject: subject.id,
    },
    validationSchema: ValidateQuestion,
    onSubmit: (values) => {
      setLoading(true)
      api
        .post("/createQuestion", values, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res: AxiosResponse) => {
          setLoading(false)
          if (res.status >= 200 && res.status < 300) {
            notifierDispatch({
              type: "CREATE",
              payload: {
                code: res.data.code,
                content: res.data.message,
                open: true,
                title: "Successful",
              },
            });
            setEditorState(EditorState.createEmpty());
            setOptions([
              { character: "A", value: "" },
              { character: "B", value: "" },
              { character: "C", value: "" },
              { character: "D", value: "" },
            ]);
            formik.handleReset();
          }
        })
        .catch((err: AxiosError) => {
          setLoading(false)
          notifierDispatch({
            type: "CREATE",
            payload: {
              code: parseInt(err.code),
              content: err.message,
              open: true,
              title: err.cause.name,
            },
          });
        });
    },
  });

  useEffect(() => {
    // let htmlText = convertToHTML(editorState?.getCurrentContent());
    // let plainText = editorState.getCurrentContent();
    let mainHtml = draftToHtml(convertToRaw(editorState?.getCurrentContent()));

    formik.setFieldValue("question", mainHtml);
  }, [editorState]);

  const optionsArr = [
    { title: "option1", option: "A" },
    { title: "option2", option: "B" },
    { title: "option3", option: "C" },
    { title: "option4", option: "D" },
  ];

  const renderOptions = () => {
    return optionsArr.map((item: { [key: string]: string }, idx: number) => (
      <div key={idx}>
        <div className="flex flex-row justify-between place-items-center mb-[-15px]">
          <p className="text-gray-400 text-[14px]">{item.title}</p>
          <span className="text-gray-400 text-[14px]">
            Mark as Answer
            <Checkbox
              checked={formik.values.answer == item.option ? true : false}
              onChange={() => formik.setFieldValue("answer", item.option)}
              sx={{
                [`&, &.${checkboxClasses.checked}`]: {
                  color: "#CBE6C8",
                },
              }}
            />
          </span>
        </div>
        <CustomInput
          value={options[idx].value}
          onChange={(e: any) => handleOptionsChange(e, item.option)}
          component={"text"}
          type={"text"}
          classes="bg-[#F7FCF7] w-[100%] rounded-full no-underline p-2"
          error={formik.errors?.options?.[idx]?.value}
        />
      </div>
    ));
  };

  //   const insertImage = ( url) => {
  //     const contentState = editorState.getCurrentContent();
  //     const contentStateWithEntity = contentState.createEntity(
  //         "IMAGE",
  //         "IMMUTABLE",
  //         { src: url })
  // const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
  // const newEditorState = EditorState.set( editorState, { currentContent: contentStateWithEntity });
  // return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey);
  // };

  // const convertToBase64 = (file: File) => {
  //   const reader = new FileReader();
  //     reader.onload = () => {
  //       const base64 = reader.result;
  //       insertImage(base64)
  //     };

  //     reader.readAsDataURL(file);
  // };

  const handleImageUpload = (e: any) => {
    const file: File = e.target.files[0];
    formik.setFieldValue("image", file);
    setImagePrev(URL.createObjectURL(file));
  };

  // const handleSubmit = () => {
  //   if(!formik.errors.options && formik.errors) {

  //   }
  // }

  return (
    <div className="text-black mt-[20px] pb-[40px]">
      <div className="flex gap-8">
        <IconButton onClick={close}>
          <KeyboardBackspaceIcon className="w-[30px] h-[30px]" />
        </IconButton>
        <h2 className="text-[32px] font-medium">Set Exam</h2>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <form onSubmit={formik.handleSubmit} className="grid col-span-7">
          <div>
            <p className="text-gray-500 text-[18px] mt-[20px]">Subject</p>
            <CustomInput
              value={subject.name}
              readonly
              onChange={(e: any) => null}
              component={"text"}
              type={"text"}
              classes="bg-[#F7FCF7] px-2 h-[40px] w-[100%] rounded-full no-underline mt-2"
            />
          </div>
          <div className="">
            <div className="flex gap-6 place-items-center">
              <Switch
                value={hasInstructions}
                onChange={() => setHasInstructions(!hasInstructions)}
              />
              <p>Provide instructions</p>
            </div>
            {hasInstructions && (
              <TextField
                multiline
                rows={4}
                value={formik.values.instructions}
                onChange={(e: any) =>
                  formik.setFieldValue("instructions", e.target.value)
                }
                className="bg-[#F7FCF7] w-[100%] rounded-lg"
              />
            )}
          </div>
          <p className="text-gray-500 text-[18px] mt-[10px]">Question</p>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="h-[35vh] max-w-[47vw] mb-[40px]"
            editorClassName="bg-[#F7FCF7] p-2 overflow-auto"
            toolbarClassName="toolbar-class"
            plugins={[imagePlugin]}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: {
                previewImage: true,
                uploadCallback: (file) => {
                  return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      resolve({
                        data: {
                          url: reader.result,
                        },
                      });
                    };

                    reader.onerror = (reason) => reject(reason);

                    reader.readAsDataURL(file);
                  });
                },
                alt: { present: true, mandatory: true },
              },
            }}
          />
          {/* <div className="mt-[80px]">
            <p className="text-gray-400 text-[14px]">Select Question Bank</p>
            <CustomInput
              value={formik.values.bank}
              onChange={(e: any) =>
                formik.setFieldValue("questionBank", e.target.value)
              }
              component={"select"}
              type={"text"}
              classes="bg-[#F7FCF7] w-[100%] rounded-full no-underline mt-2"
              selValues={["1", "2", "3"]}
              error={formik.errors.bank}
            />
          </div> */}
          {/* <div className="mt-[20px]">
            <p className="text-gray-400 text-[14px]">Upload question snippet</p>
            <Switch value={merge} onChange={() => setMerge(!merge)} />
            {merge && (
              <CustomInput
              onChange={(e: any) => handleImageUpload(e)}
              component={"text"}
              type={"file"}
              classes="bg-[#F7FCF7] w-[100%] rounded-full no-underline mt-2"
              error={formik.errors.image}
            />
            )}
          </div> */}
        </form>
        <div className="grid col-span-5 px-4 border-l-4 border-l-[#CBE6C8]">
          {imagePrev && (
            <img src={imagePrev} className="w-[100%] h-[35vh]" alt="/" />
          )}
          <div className="flex flex-col gap-6">{renderOptions()}</div>
          {formik.errors.answer && (
            <p className="text-[12px] text-red-600 mt-[20px] mb-[-40px] ml-[20px]">
              {formik.errors.answer}
            </p>
          )}
          <Button
            onClick={() => formik.handleSubmit()}
            className="text-white mt-[150px] bg-[#267F29] h-[50px] w-[100%] rounded-full"
          >
            {loading ? <CircularProgress thickness={5} className="text-white w-[50px] h-[50px]" /> : <p>Submit</p>}
          </Button>
        </div>
      </div>
    </div>
  );
};
