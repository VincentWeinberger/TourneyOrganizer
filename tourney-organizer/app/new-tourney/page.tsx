"use client"

import { useState, useRef, FormEvent } from "react"
import Link from "next/link"
import { Tourney, Inconsolata } from "next/font/google"
import { useRouter } from "next/navigation"
import PreliminarySettings from "../../components/newTournament/PreliminarySettings"

const tourney = Tourney({ subsets: ["latin"] })
const incFont = Inconsolata({ subsets: ["latin"] })

type Tournament = {
  numPlayers: number
  knockoutChoice: string
  seeded: boolean
  sportChoice: string
  participants: Array<string>
}

const page = () => {
  const [currentMenu, setCurrentMenu] = useState<string>("preliminarySettings")

  // const [numPlayers, setNumPlayers] = useState(2)
  // const [singleChecked, setSingleChecked] = useState(true)
  // const [doubleChecked, setDoubleChecked] = useState(false)
  // const [seededChecked, setSeededChecked] = useState(false)
  // const [sportSelected, setSportSelected] = useState("")
  // const [showNumPlayerErrors, setShowNumPlayerErrors] = useState(false)
  // const [showSportErrors, setShowSportErrors] = useState(false)
  // const [modalConfirmed, setModalconfirmed] = useState(false)
  // const [tournamentObj, setTournamentObj] = useState({})
  // const [showSignups, setShowSignups] = useState(false)
  // const [autoSignups, setAutoSignups] = useState(true)
  // const [manualSignups, setManualSignups] = useState(false)
  // const [submittedSignupsChoice, setSubmittedSignupsChoice] = useState(false)

  const sportDialog = useRef<HTMLDialogElement>(null)

  const router = useRouter()

  //Onchange handler called when user clicks the 'Single Elimination' radio button.
  // const singleCheckHandler = (): void => {
  //   if (singleChecked === true) return
  //   setSingleChecked(true)
  //   setDoubleChecked(false)
  // }

  //Onchange handler called when user clicks the 'Double Elimination' radio button.
  // const doubleCheckHandler = (): void => {
  //   if (doubleChecked === true) return
  //   setDoubleChecked(true)
  //   setSingleChecked(false)
  // }

  //Onchange handler to call when user clicks the 'Seeded' checkbox.
  // const seededCheckHandler = (): void => {
  //   setSeededChecked((prev) => !prev)
  // }

  // const autoCheckHandler = () => {
  //   if (autoSignups === true) return
  //   setAutoSignups(true)
  //   setManualSignups(false)
  // }

  // const manualCheckHandler = () => {
  //   if (manualSignups === true) return
  //   setManualSignups(true)
  //   setAutoSignups(false)
  // }

  //Validates the form for a New Tournament. Specifically, it checks the following conditions:
  //1 < Number of players < 129
  //Select option is not the default message.
  // const validateNewTourneyForm = (): boolean => {
  //   let playerErrors = true
  //   let sportErrors = true
  //   if (!numPlayers || numPlayers < 2 || numPlayers > 128) {
  //     setShowNumPlayerErrors(true)
  //   } else playerErrors = false
  //   if (sportSelected === "") {
  //     setShowSportErrors(true)
  //   } else sportErrors = false

  //   if (playerErrors === true || sportErrors === true) return false
  //   setShowNumPlayerErrors(false)
  //   setShowSportErrors(false)
  //   return true
  // }

  // const confirmSport = (choice: boolean): void => {
  //   if (choice === true) {
  //     setModalconfirmed(true)
  //     if (sportDialog.current) sportDialog.current.close()
  //   }
  //   if (sportDialog.current) sportDialog.current.close()
  // }

  // const populateGenericNames = (): Array<string> => {
  //   const newParticipantsArr = new Array<string>()

  //   for (let i = 1; i <= numPlayers; i++) {
  //     newParticipantsArr.push(`Player ${i}`)
  //   }

  //   return newParticipantsArr
  // }

  // const createTournamentObj = () => {
  //   const newTournamentObj: Tournament = {
  //     numPlayers: numPlayers,
  //     knockoutChoice: singleChecked === true ? "single" : "double",
  //     seeded: seededChecked,
  //     sportChoice: sportSelected,
  //     participants: populateGenericNames(),
  //   }

  //   setTournamentObj(newTournamentObj)
  // }

  //Validates the form via 'validateNewTourneyForm' function, saves the current Tournament settings, and then routes to next page.
  // const handleNextPage = (e: FormEvent): void => {
  //   e.preventDefault()
  //   if (!validateNewTourneyForm()) return
  //   if (sportSelected === "other") {
  //     if (sportDialog.current) sportDialog.current.showModal()
  //     //NEED TO CONFIRM THAT SHOWING MODAL HALTS THE RUNNING OF CURRENT BLOCK SCOPE
  //     if (modalConfirmed === false) return
  //     createTournamentObj()
  //     setShowSignups(true)
  //   }
  //   createTournamentObj()
  //   setShowSignups(true)
  // }

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
      <div
        className={`menu preliminarySettingsMenu w-1/2 h-fit bg-slate-100 mt-10 rounded-xl p-10 ${
          currentMenu !== "preliminarySettings" && "hidden"
        }`}
      >
        <PreliminarySettings />
      </div>
      {/* <div
        className={`menu choosePlayerGeneratorMenu ${
          currentMenu !== "choosePlayerGenerator" && "hidden"
        }`}
      >
        <ChoosePlayerSignup />
      </div> */}
      {/* <div
        className={`menu manualPlayerEntryMenu ${
          currentMenu !== "manualPlayerEntry" && "hidden"
        }`}
      >
        <ManualPlayerEntry />
      </div> */}
      {/* <div
        className={`menu reviewAndConfirmMenu ${
          currentMenu !== "reviewAndConfirm" && "hidden"
        }`}
      >
        <ReviewAndConfirm />
      </div> */}
      {/* <div
        className={
          (showSignups === true ? "hidden " : "") +
          "menu flex justify-center items-center w-1/3 h-4/5 bg-slate-100 mt-20 rounded-xl p-10"
        }
      >
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
          </div>*/}
      {/* <div className={(showSignups === true ? "" : "hidden ") + "menu"}>
        <form
          className={
            (submittedSignupsChoice === true ? "hidden " : "") + "flex flex-col"
          }
        >
          <label className="pb-3">Manual or Automatic Player Name Entry?</label>
          <div className="text-sm pl-6 flex flex-col gap-5">
            <label className="labelContainer relative hover:cursor-pointer">
              <input
                className="hidden"
                type="radio"
                name="playerNames"
                checked={autoSignups}
                onChange={autoCheckHandler}
              />
              <span className="customKnockoutCheckbox border-2 border-slate-500"></span>
              <i
                className={`${
                  autoSignups === false && "!hidden"
                } knockoutCheck text-violet-500 fa-solid fa-check absolute`}
              ></i>
              AUTOMATIC (Ex. Player 1, Player 2, Player 3...)
            </label>
            <label className="labelContainer relative hover:cursor-pointer">
              <input
                className="hidden"
                type="radio"
                name="playerNames"
                checked={manualSignups}
                onChange={manualCheckHandler}
              />
              <span className="customKnockoutCheckbox border-2 border-slate-500"></span>
              <i
                className={`${
                  manualSignups === false && "!hidden"
                } knockoutCheck text-violet-500 fa-solid fa-check absolute`}
              ></i>
              MANUAL (You will be prompted to enter player names.)
            </label>
          </div>
          <button
            className={autoSignups === false ? "hidden" : ""}
            type="submit"
            // onSubmit={(e) => handleSignupSubmit(e)}
          >
            CONFIRM
          </button>
          <button
            className={manualSignups === false ? "hidden" : ""}
            type="button"
          >
            NEXT
          </button>
        </form>
        <div
          className={
            (submittedSignupsChoice === true ? "" : "hidden ") +
            "confirmationDisplay flex flex-col"
          }
        ></div>
      </div> */}
    </div>
  )
}

export default page
