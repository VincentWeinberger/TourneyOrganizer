import React, { useState } from "react"
import { Tourney, Inconsolata } from "next/font/google"

const tourney = Tourney({ subsets: ["latin"] })
const incFont = Inconsolata({ subsets: ["latin"] })

type Props = {
  currentMenu: string
}

const newTourneySettings = () => {
  const [numPlayers, setNumPlayers] = useState(2)
  const [singleChecked, setSingleChecked] = useState(true)
  const [doubleChecked, setDoubleChecked] = useState(false)
  const [seededChecked, setSeededChecked] = useState(false)
  const [sportSelected, setSportSelected] = useState("")
  const [showNumPlayerErrors, setShowNumPlayerErrors] = useState(false)
  const [showSportErrors, setShowSportErrors] = useState(false)
  const [modalConfirmed, setModalconfirmed] = useState(false)
  const [tournamentObj, setTournamentObj] = useState({})

  return (
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
            <option value="" selected>
              Pick a sport...
            </option>
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
          type="submit"
          className={
            tourney.className +
            " btn text-slate-600 hover:text-white bg-violet-400 p-1"
          }
          onSubmit={(e) => handleNextPage(e)}
        >
          NEXT
        </button>
      </form>
      <dialog ref={sportDialog}>
        <div className={incFont.className + " text-sm flex flex-col"}>
          <p>
            You have selected "Other" for your sport of choice, so Scorekeeper
            will not be available. Are you sure?
          </p>
          <div>
            <button type="button" onClick={() => confirmSport(true)}>
              Yes
            </button>
            <button type="button" onClick={() => confirmSport(false)}>
              No
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default newTourneySettings
