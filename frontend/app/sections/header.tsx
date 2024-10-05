"use client"

import { Button } from '@/components/ui/button'
import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { useRouter } from 'next/navigation'

interface HeaderProps {
    cookieStore: ReadonlyRequestCookies
}

export default function Header({ cookieStore }: HeaderProps) {
    const router = useRouter()
    const isAuth = true;

    return (
    <header className="bg-gray-100 inset-0 flex min-h-[80dvh] h-screen w-full flex-col items-center justify-center bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] ">
      <div className="mx-auto w-container max-w-full px-5 py-[110px] text-center lg:py-[150px]">
        <h1 className="drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.8) mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
          CommitWise: The best way to learn how to code
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.8)">
          Generate AI-powered tutorials from the commits in a repository.
        </p>
        <div className="flex flex-row align-center justify-center p-4">
  {isAuth ? (
    <Button
      size="lg"
      className="h-12 text-base font-heading md:text-lg lg:h-14 lg:text-xl bg-red-500 text-white border-2 border-white hover:bg-red-700 cursor-pointer border-black border-2"
      onClick={() => router.push('/dashboard')}>
      Go to Dashboard
    </Button>
  ) : (
    <>
      <Button
        size="lg"
        className="h-12 text-base font-heading md:text-lg lg:h-14 lg:text-xl bg-amber-400 text-black border-2 border-white hover:bg-red-200 cursor-pointer"
      >
        Sign up for free
      </Button>
      <Button
        size="lg"
        className="h-12 text-base font-heading md:text-lg lg:h-14 lg:text-xl b-2 b-gray-300 cursor-pointer border-2 border-white bg-green-500 hover:bg-gray-200 p-4"
      >
        Login
      </Button>
    </>
)}        </div>
      </div>
    </header>
  )
}
