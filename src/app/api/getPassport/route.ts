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

export async function GET(request: NextRequest) {
  try {
    const headers = request.headers.get("authorization")
    const url = new URL(request.url)
  const id = url.searchParams.get("id")
  console.log(`${process.env.GET_PASSPORT}/${id}`)
    const response = await Axios.get(`${process.env.GET_PASSPORT}/${id}`, {
      headers: {
          "Content-Type": "image/jpeg",
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
    return NextResponse.json({message: "An error occured"})
  }
}