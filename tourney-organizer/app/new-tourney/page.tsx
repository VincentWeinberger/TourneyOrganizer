"use client"

import { useState } from "react"
import Link from "next/link"
import { Tourney, Inconsolata } from "next/font/google"
import { useRouter } from "next/navigation"

const tourney = Tourney({ subsets: ["latin"] })
const incFont = Inconsolata({ subsets: ["latin"] })

const page = () => {
  const defaultSportsMessage = "Pick a sport..."

  const [numPlayers, setNumPlayers] = useState(2)
  const [singleChecked, setSingleChecked] = useState(true)
  const [doubleChecked, setDoubleChecked] = useState(false)
  const [seededChecked, setSeededChecked] = useState(false)
  const [sportSelected, setSportSelected] = useState("")
  const [showNumPlayerErrors, setShowNumPlayerErrors] = useState(false)
  const [showSportErrors, setShowSportErrors] = useState(false)

  //Onchange handler called when user clicks the 'Single Elimination' radio button.
  const singleCheckHandler = (): void => {
    console.log("singleHandler firing")

    if (singleChecked === true) return
    setSingleChecked(true)
    setDoubleChecked(false)
  }

  //Onchange handler called when user clicks the 'Double Elimination' radio button.
  const doubleCheckHandler = (): void => {
    console.log("doubleHandler firing")
    if (doubleChecked === true) return
    setDoubleChecked(true)
    setSingleChecked(false)
  }

  //Onchange handler to call when user clicks the 'Seeded' checkbox.
  const seededCheckHandler = (): void => {
    setSeededChecked((prev) => !prev)
  }

  //Validates the form for a New Tournament. Specifically, it checks the following conditions:
  //1 < Number of players < 129
  //Select option is not the default message.
  const validateNewTourneyForm = (): boolean => {
    if (!numPlayers || numPlayers < 2 || numPlayers > 128) {
      setShowNumPlayerErrors(true)
    }
    console.log("SPORT SELECTED: ", sportSelected)
    if (sportSelected === "") {
      setShowSportErrors(true)
    }
    return true
  }

  //Validates the form via 'validateNewTourneyForm' function, saves the current Tournament settings, and then routes to next page.
  const handleNextPage = (): void => {
    if (!validateNewTourneyForm()) return
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
      <div className="menu flex justify-center items-center w-1/3 h-4/5 bg-slate-100 mt-20 rounded-xl p-10">
        <form className="flex flex-col gap-20 justify-center items-center text-xl md:text-2xl xl:text-3xl text-slate-600">
          <div className="flex flex-col justify-center items-center">
            <label># of Players?</label>
            <span className="text-sm pb-3">(Max 128 Players)</span>
            <input
              className="rounded-xl border-4 w-3/4 border-slate-500 text-center text-xs md:text-sm lg:text-base text-violet-500 focus:outline-none focus:border-violet-700"
              type="number"
              value={numPlayers}
              onChange={(e) => {
                setNumPlayers(+e.target.value)
              }}
            />
            <span
              className={
                incFont.className +
                " text-xs lg:text-sm text-red-500 " +
                (showNumPlayerErrors === true ? "opacity-100" : "opacity-0")
              }
            >
              Please choose a value within the range of 2 - 128
            </span>
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
                <span className="customKnockoutCheckbox border-2 border-slate-500"></span>
                <i
                  className={`${
                    singleChecked === false && "!hidden"
                  } knockoutCheck text-violet-500 fa-solid fa-check absolute`}
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
                <span className="customKnockoutCheckbox border-2 border-slate-500"></span>
                <i
                  className={`${
                    doubleChecked === false ? "!hidden" : ""
                  } knockoutCheck text-violet-500 fa-solid fa-check absolute`}
                ></i>
                Double Elimination
              </label>
            </div>
          </div>

          <label className="flex flex-col justify-center items-center hover:cursor-pointer">
            Seeded?
            <input
              className="seededInput hidden"
              type="checkbox"
              name="seededBoolean"
              checked={seededChecked}
              onChange={seededCheckHandler}
            />
            <span className="customSeededCheckbox border-2 border-slate-500"></span>
            <i
              className={`${
                seededChecked === false ? "!hidden" : ""
              } seededCheck text-violet-500 fa-solid fa-check absolute`}
            ></i>
          </label>

          <div className="flex flex-col justify-center items-center">
            <label htmlFor="sports">Which Sport?</label>
            <span className="text-sm pb-3">(For Scorekeeper)</span>
            <select
              className="text-xs md:text-sm lg:text-base text-violet-500 focus:outline-violet-700 text-center w-3/4"
              name="sports"
              id="sports"
              onChange={(e) => setSportSelected(e.target.value)}
            >
              <option value="">{defaultSportsMessage}</option>
              <option value="football">Football</option>
              <option value="basketball">Basketball</option>
              <option value="baseball">Baseball</option>
              <option value="soccer">Soccer</option>
              <option value="tennis">Tennis</option>
              <option value="hockey">Hockey</option>
              <option value="volleyball">Volleyball</option>
              <option value="pickleball">Pickleball</option>
              <option value="tabletennis">Table Tennis</option>
              <option value="other">Other</option>
            </select>
            <span
              className={
                incFont.className +
                " text-xs lg:text-sm text-red-500 " +
                (showSportErrors === true ? "opacity-100" : "opacity-0")
              }
            >
              Please select a sport
            </span>
          </div>
          <button
            type="button"
            className={
              tourney.className +
              " btn text-slate-600 hover:text-white bg-violet-400 p-1"
            }
            onClick={handleNextPage}
          >
            NEXT
          </button>
        </form>
      </div>
    </div>
  )
}

export default page
