"use client"

import { Tourney } from "next/font/google"
import { MouseEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const tourney = Tourney({ subsets: ["latin"] })

export default function Home() {
  const [clicked, setClicked] = useState("none")
  const router = useRouter()

  const handleLinkEventAndEffect = (
    buttonClicked: string,
    e: MouseEvent<HTMLAnchorElement>
  ): void => {
    e.preventDefault()
    setClicked(buttonClicked)
    setTimeout(() => {
      router.push(`/${buttonClicked}`)
      setClicked("none")
    }, 150)
  }

  return (
    <main className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="heading text-violet-400 text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
        TOURNEY
      </h1>
      <div className="menu w-2/3 md:w-1/3 xl:w-1/4 h-1/2 bg-slate-100 mt-20 rounded-xl">
        <ul
          className={
            tourney.className +
            " text-slate-500 text-center text-lg sm:text-xl md:text-2xl lg:text-3xl h-full divide-y divide-slate-200"
          }
        >
          <li
            className={
              (clicked === "new-tourney"
                ? "hover:bg-violet-600 text-white"
                : "") + " h-1/4 rounded-xl hover:bg-slate-200"
            }
          >
            <Link
              className="w-full h-full flex items-center justify-center"
              onClick={(e) => handleLinkEventAndEffect("new-tourney", e)}
              href="/new-tourney"
            >
              New Tournament
            </Link>
          </li>
          <li
            className={
              (clicked === "saved-tourneys"
                ? "hover:bg-violet-600 text-white"
                : "") + " h-1/4 rounded-xl hover:bg-slate-200"
            }
          >
            <Link
              className="w-full h-full flex items-center justify-center"
              onClick={(e) => handleLinkEventAndEffect("saved-tourneys", e)}
              href="/"
            >
              Saved Tournaments
            </Link>
          </li>
          <li
            className={
              (clicked === "scorekeeper"
                ? "hover:bg-violet-600 text-white"
                : "") + " h-1/4 rounded-xl hover:bg-slate-200"
            }
          >
            <Link
              className="w-full h-full flex items-center justify-center"
              onClick={(e) => handleLinkEventAndEffect("scorekeeper", e)}
              href="/"
            >
              Scorekeeper
            </Link>
          </li>
          <li
            className={
              (clicked === "how-to-use"
                ? "hover:bg-violet-600 text-white"
                : "") + " h-1/4 rounded-xl hover:bg-slate-200"
            }
          >
            <Link
              className="w-full h-full flex items-center justify-center"
              onClick={(e) => handleLinkEventAndEffect("how-to-use", e)}
              href="/"
            >
              How to Use
            </Link>
          </li>
        </ul>
      </div>
    </main>
  )
}
