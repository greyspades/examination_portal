'use client'
import React, { useContext, useEffect, useState } from "react";
import { CustomInput } from "../components/customInput";
import { useFormik } from "formik";
import { Button, Switch, TextField } from "@mui/material";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { Subject } from "./types";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import { ComponentContext } from "../../../context/component.context";
import { NotifierContext } from "../../../context/notifier.context";
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

type Answer = "A" | "B" | "C" | "D"

type Option = {
  value: string,
  character: Answer
}

export const AddQuestion = ({ subject, close }: AddQuestionProps) => {
  const { state, dispatch } = useContext(ComponentContext);
  const { notifierState, notifierDispatch } = useContext(NotifierContext);
  const [hasInstructions, setHasInstructions] = useState<boolean>(false)
  const [answer, setAnswer] = useState<Answer>("A")
  const [imagePrev, setImagePrev] = useState<string>()
  const [merge, setMerge] = useState<boolean>(false)
  const [options, setOptions] = useState<Option[]>([
        {character: "A", value: ""},
        {character: "B", value: ""},
        {character: "C", value: ""},
        {character: "D", value: ""}
  ])

  const handleOptionsChange = (e: any, char: string) => {
    var value = e.target.value
    var result = options.map((item: Option, idx: number) => {
      if(item.character == char) {
        item.value = value
      }
      return item
    })
    setOptions(result)
    formik.setFieldValue("options", result)
  }

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
      ? convertPlainTextToEditorState(null)
      : EditorState.createEmpty();
  const [editorState, setEditorState] = useState(initialEditorState);
  const formik = useFormik({
    initialValues: {
      question: editorState,
      options: options,
      answer: "",
      instructions: "",
      questionBank: "",
      image: "",
      subject: subject.id
    },
    onSubmit: (values) => {
      console.log(values)
      console.log(options)
    },
  });

  useEffect(() => {
    // let htmlText = convertToHTML(editorState?.getCurrentContent());
    let htmlText = editorState?.getCurrentContent()
    let plainText = editorState.getCurrentContent().getPlainText();

    formik.setFieldValue("question", htmlText);
  }, [editorState]);

  const optionsArr = [{title:"option1", option: "A"}, {title:"option2", option: "B"}, {title:"option3", option: "C"}, {title:"option4", option: "D"}];

  const renderOptions = () => {
    return optionsArr.map((item: {[key: string]: string}, idx: number) => (
      <div key={idx}>
        <div className="flex flex-row justify-between place-items-center mb-[-15px]">
          <p className="text-gray-400 text-[14px]">{item.title}</p>
          <span className="text-gray-400 text-[14px]">
            Mark as Answer
            <Checkbox
              checked={
                formik.values.answer == item.option ? true : false
              }
              onChange={() =>
                formik.setFieldValue("answer", item.option)
              }
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
          error={formik.errors?.[item.title]}
        />
      </div>
    ));
  };

  const handleImageUpload = (e: any) => {
    const file: File = e.target.files[0]
    formik.setFieldValue("image", file)
    setImagePrev(URL.createObjectURL(file))
  }

  return (
    <div className="text-black mt-[20px]">
      <div>
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
          <div className="mt-[20px]">
                <div className="flex gap-6 place-items-center">
                <Switch value={hasInstructions} onChange={() => setHasInstructions(!hasInstructions)} />
                <p>Provide instructions</p>
                </div>
                {hasInstructions && (
                    <TextField multiline rows={4} value={formik.values.instructions} onChange={(e: any) => formik.setFieldValue("instructions", e.target.value)} className="bg-[#F7FCF7] w-[100%] rounded-lg" />
                )}
          </div>
          <p className="text-gray-500 text-[18px] mt-[20px]">Question</p>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="h-[35vh] max-w-[47vw]"
            editorClassName="bg-[#F7FCF7] p-2 overflow-auto"
            toolbarClassName="toolbar-class"
          />
          <div className="mt-[80px]">
            <p className="text-gray-400 text-[14px]">Select Question Bank</p>
            <CustomInput
              value={formik.values.questionBank}
              onChange={(e: any) =>
                formik.setFieldValue("questionBank", e.target.value)
              }
              component={"select"}
              type={"text"}
              classes="bg-[#F7FCF7] w-[100%] rounded-full no-underline mt-2"
              selValues={["1", "2", "3"]}
              error={formik.errors.questionBank}
            />
          </div>
          <div className="mt-[20px]">
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
          </div>
          <Button type="submit" className="text-white mt-[30px] bg-[#267F29] h-[50px] w-[100%] rounded-full">
            Submit
          </Button>
        </form>
        <div className="grid col-span-5 px-4 border-l-4 border-l-[#CBE6C8]">
        {imagePrev && (
              <img src={imagePrev} className="w-[100%] h-[35vh]" alt="/" />
            )}
          <div className="flex flex-col gap-6">{renderOptions()}</div>
        </div>
      </div>
    </div>
  );
};
