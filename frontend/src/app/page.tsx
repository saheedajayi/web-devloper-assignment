// "use client"
// import dynamic from "next/dynamic"
//
// const MainPage = dynamic(() => import("@/components/main-page"), {
//   ssr: false,
//   loading: () => <div className="min-h-screen flex justify-center items-center">Loading...</div>,
// })


import MainPage from "@/components/main-page";

export default function Home() {
  return <MainPage />
}
