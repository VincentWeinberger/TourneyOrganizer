"use client"

import { useState } from "react"
import Link from "next/link"
const page = () => {
  const [singleChecked, setSingleChecked] = useState(true)
  const [doubleChecked, setDoubleChecked] = useState(false)

  const singleCheckHandler = () => {
    console.log("singleHandler firing")

    if (singleChecked === true) return
    setSingleChecked(true)
    setDoubleChecked(false)
  }

  const doubleCheckHandler = () => {
    console.log("doubleHandler firing")
    if (doubleChecked === true) return
    setDoubleChecked(true)
    setSingleChecked(false)
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className="absolute top-0 left-0 p-5">
        <Link href="/">
          <i className="fa-solid fa-circle-left text-6xl text-violet-700 bg-white rounded-full"></i>
        </Link>
      </div>
      <h2 className="heading text-violet-400 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
        NEW TOURNAMENT
      </h2>
      <div className="menu flex justify-center items-center w-fit h-fit bg-slate-100 mt-20 rounded-xl p-10">
        <form className="flex flex-col gap-20 justify-center items-center text-xl md:text-2xl xl:text-3xl text-slate-600">
          <div className="flex flex-col justify-center items-center">
            <label className="pb-3"># of Players?</label>
            <input
              className="rounded-xl border-4 border-slate-500 text-center text-xs p-2 focus:outline-none focus:border-violet-700"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <label className="pb-3">Knockout System?</label>
            <div className="text-sm pl-6 flex flex-col gap-5">
              <label className="labelContainer relative hover:cursor-pointer">
                <input
                  className="hidden"
                  type="radio"
                  name="elimType"
                  checked={singleChecked}
                  onChange={singleCheckHandler}
                />
                <span className="customCheck border-2 border-slate-500"></span>
                <i
                  className={`${
                    singleChecked === false && "!hidden"
                  } fa-solid fa-check absolute`}
                ></i>
                Single Elimination
              </label>
              <label className="labelContainer relative hover:cursor-pointer">
                <input
                  className="hidden"
                  type="radio"
                  name="elimType"
                  checked={doubleChecked}
                  onChange={doubleCheckHandler}
                />
                <span className="customCheck border-2 border-slate-500"></span>
                <i
                  className={`${
                    doubleChecked === false ? "!hidden" : ""
                  } fa-solid fa-check absolute`}
                ></i>
                Double Elimination
              </label>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <label className="pb-3">Seeded?</label>
            <input type="checkbox" />
          </div>
          <div className="flex flex-col justify-center items-center">
            <label className="pb-3">Which Sport?</label>
            <input
              list="sports"
              className="rounded-xl border-4 border-slate-500 text-center text-xs p-2 focus:outline-none focus:border-violet-700"
            />
            <datalist id="sports">
              <option value="Football" />
            </datalist>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page
