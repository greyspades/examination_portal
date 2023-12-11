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
        code: "createArticleView",
        url: process.env.CREATE_ARTICLE_VIEW
    }
]

export async function POST(request: NextRequest) {
  try {
    const headers = request.headers.get("authorization")
    const body = await request.json()
    const response = await Axios.get(`${process.env.GET_APPLICANTS}/${body.page}/${body.take}`, {
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
  }
}

export {}