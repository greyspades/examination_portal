"use client";

import React, { Dispatch, createContext, useReducer } from "react";
import { EducationType } from "@/app/onboarding/types";

type Student = {
    surname: string,
    firstName: string,
    middleName: string,
    dob: string,
    pob: string,
    livesWith: string,
    email: string,
    gender: string,
    currSchool: string,
    lastSchool: string,
    phone: string,
    religion: string,
    nameOffather: string,
    nameOfMother: string,
    fathersOccupation: string,
    mothersOccupation: string,
    fathersWorkAddress: string,
    mothersWorkAddress: string,
    mothersHomeAddress: string,
    fathersHomeAddress: string,
    numberOfWives: string,
    numberOfChildren: string,
    education: EducationType[]
}

type ComponentProps = {
  index?: string;
  title?: string;
  user?: Student,
//   slide?: Slide;
//   article?: Article;
//   articles?: ArticleSections;
//   context?: Slide | Article;
  meta?: any;
};

type ActionType = {
  type: string;
  payload: ComponentProps;
};

const initialState: ComponentProps = {
  index: "1.0",
  title: "",
  meta: null,
  user: null,
};

const reducer = (state: ComponentProps, action?: ActionType) => {
  switch (action.type) {
    case "SWITCH_INDEX" :
        return { ...state, index: action.payload.index, title: action.payload.title }
    case "SET_FIELD_VALUE" :
        return { ...state, index: action.payload.index, user: { ...state.user, [action.payload?.title]: action?.payload?.meta}}
    case "SET_EDUCATION" :
        return { ...state, user: { ...state?.user, education: action.payload.user.education}}
    default:
      return state;
  }
};

export const ComponentContext = createContext<{
  state: ComponentProps;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const ComponentContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ComponentContext.Provider value={{ state, dispatch }}>
      {children}
    </ComponentContext.Provider>
  );
};
