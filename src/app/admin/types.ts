export type Subject = {
    id: string,
    name: string,
    questions: number,
    scope: "JUNIOR" | "SENIOR"
  }

export type Question = {
  id: string,
  bank: string,
  instructions: string,
  question: string,
  subject: string,
  answer: string
}