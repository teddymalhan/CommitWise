import Features from '@/app/sections/features'
import Header from '@/app/sections/header'
import Faq from '@/app/sections/faq'
import Footer from '@/components/footer'
import {cookies} from "next/headers";
import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";

export default function Home() {
    const cookieStore: ReadonlyRequestCookies = cookies()
  return (
    <>
      <Header cookieStore={cookieStore}/>
      <Features />
      <Faq />
      <Footer />
    </>
  )
}