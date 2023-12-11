import type { NextApiRequest, NextApiResponse } from "next";
import Axios, { AxiosError } from "axios";
import CryptoJS from "crypto-js";
import { NextRequest, NextResponse } from "next/server";
// import formidable from 'express-formidable';

  var key = CryptoJS.enc.Utf8.parse(process.env.AES_KEY as string);
  var iv = CryptoJS.enc.Utf8.parse(process.env.AES_IV as string);

  let reqToken = CryptoJS.AES.encrypt(
    process.env.AUTH_TOKEN as string,
    key,
    {iv: iv}
  ).toString();

  type UrlData = {
    code: string,
    url: string
  }

const urls: UrlData[] = [
    {
      code: "personal",
      url: process.env.SAVE_PERSONAL
    },
    {
      code: "parents",
      url: process.env.SAVE_PARENTS
    },
    {
      code: "education",
      url: process.env.SAVE_EDUCATION
    },
    {
      code: "banking",
      url: process.env.SAVE_BANKING
    }
]

export async function POST(request: NextRequest) {
  try {
    const headers = request.headers.get("authorization")
    const body = await request.json()
    const url = urls.find((item: UrlData) => item.code == body.action).url
    delete body.action
    console.log(body)
    const response = await Axios.post(url, body, {
      headers: {
          "Content-Type": "application/json",
          "Authorization" : headers
      }
  })
  .then((res) => {
      return res.data
  })
  .catch((err: AxiosError) => {
      console.log(err.message)
  })
    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json({status: false, message: "an Error occured"})

  }
}