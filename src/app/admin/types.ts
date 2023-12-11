export type Subject = {
    id: string,
    name: string,
    questions: number,
    scope: "JUNIOR" | "SENIOR"
  }

export type Options = {
  id?: string,
  character: string,
  value: string
}

export type Question = {
  id?: string,
  bank: string,
  instructions: string,
  question: string,
  subject: string,
  answer: string,
  options?: Options[],
  characters?: string
}

export type EducationType = {
  id?: string,
  school: string,
  address: string,
  startDate: string,
  endDate: string,
  cert: string
}

export type Student = {
  sn: string,
  id: string,
  firstName: string,
  lastName: string,
  email?: string,
  clientId: string,
  phone: string,
  productType: string,
  zone: string,
  branch: string,
  bUnion: string,
  verified?: boolean,
  passport?: string
}

export type PersonalInfo = {
  id: string,
  firstName: string,
  lastName: string,
  middleName: string,
  dob: string,
  pob: string,
  livesWith: string,
  email: string,
  gender: string,
  currSchool: string,
  lastSchool: string,
  phone: string,
  religion: string
}