"use client"

import React, {
  useState,
  useRef,
  useEffect,
  FormEvent,
  ChangeEvent,
  KeyboardEvent,
} from "react"
import { Tourney, Inconsolata } from "next/font/google"
import { JsxElement } from "typescript"

const tourney = Tourney({ subsets: ["latin"] })
const incFont = Inconsolata({ subsets: ["latin"] })

type Player = {
  defaultName: string
  manualName: string
  seed: number
}

type Tournament = {
  numPlayers: number
  knockoutChoice: string
  seeded: boolean
  sportChoice: string
  participants: Array<Player>
}

const PreliminarySettings = () => {
  const [numPlayers, setNumPlayers] = useState(2)
  const [singleChecked, setSingleChecked] = useState(true)
  const [doubleChecked, setDoubleChecked] = useState(false)
  const [seededChecked, setSeededChecked] = useState(false)
  const [sportSelected, setSportSelected] = useState("")
  const [showNumPlayerErrors, setShowNumPlayerErrors] = useState(false)
  const [showSportErrors, setShowSportErrors] = useState(false)
  const [menuShowing, setMenuShowing] = useState("prelim")
  const [tournamentObj, setTournamentObj] = useState<any | Tournament>(null)
  const [defaultNaming, setDefaultNaming] = useState(true)
  const [manualNaming, setManualNaming] = useState(false)
  const [currNamingIndex, setCurrNamingIndex] = useState(-1)

  const sportDialog = useRef<HTMLDialogElement>(null)
  const manualInputRefs = useRef(new Array<HTMLInputElement>())

  useEffect(() => {
    if (manualInputRefs.current[currNamingIndex]) {
      manualInputRefs.current[currNamingIndex].focus()
      console.log(
        "SHOULD ABE FOCUSED ON THIS ELEMENT: ",
        manualInputRefs.current[currNamingIndex]
      )
    }
  }, [currNamingIndex])

  const defaultNamingHandler = () => {
    if (defaultNaming === true) return
    if (currNamingIndex > -1) setCurrNamingIndex((prev) => prev - 1)
    setDefaultNaming(true)
    setManualNaming(false)
  }

  const manualNamingHandler = () => {
    if (manualNaming === true) return
    if (currNamingIndex < 0) setCurrNamingIndex((prev) => prev + 1)
    setManualNaming(true)
    setDefaultNaming(false)
  }

  const singleCheckHandler = (): void => {
    if (singleChecked === true) return
    setSingleChecked(true)
    setDoubleChecked(false)
  }

  //Onchange handler called when user clicks the 'Double Elimination' radio button.
  const doubleCheckHandler = (): void => {
    if (doubleChecked === true) return
    setDoubleChecked(true)
    setSingleChecked(false)
  }

  //Onchange handler to call when user clicks the 'Seeded' checkbox.
  const seededCheckHandler = (): void => {
    setSeededChecked((prev) => !prev)
  }

  const populateGenericNames = (): Array<Player> => {
    const newParticipantsArr = new Array<Player>()

    for (let i = 1; i <= numPlayers; i++) {
      newParticipantsArr.push({
        defaultName: `Team/Player ${i}`,
        manualName: "",
        seed: 0,
      })
    }

    return newParticipantsArr
  }

  const createTournamentObj = () => {
    const newTournamentObj: Tournament = {
      numPlayers: numPlayers,
      knockoutChoice: singleChecked === true ? "single" : "double",
      seeded: seededChecked,
      sportChoice: sportSelected,
      participants: populateGenericNames(),
    }

    setTournamentObj({ ...newTournamentObj })
    // manualInputRefs.current = newTournamentObj["participants"].map(
    //   (playerObj: Player, index: number) => (
    //     <input
    //       key={index}
    //       className={`${
    //         currNamingIndex === index ? "" : "hidden"
    //       } text-xs md:text-sm lg:text-base text-violet-500 focus:outline-violet-700 text-center w-3/4`}
    //       type="text"
    //       name="playerNames"
    //       value={playerObj.manualName}
    //       placeholder={playerObj.defaultName}
    //       onChange={(e) => handleManualPlayerEntry(e)}
    //       onKeyDown={(e) => manualFieldKeyPressHandler(e)}
    //       autoFocus={true}
    //     />
    //   )
    // )
  }

  const validateNewTourneyForm = (): boolean => {
    let playerErrors = true
    let sportErrors = true
    if (!numPlayers || numPlayers < 2 || numPlayers > 128) {
      setShowNumPlayerErrors(true)
    } else playerErrors = false
    if (sportSelected === "") {
      setShowSportErrors(true)
    } else sportErrors = false

    if (playerErrors === true || sportErrors === true) return false
    setShowNumPlayerErrors(false)
    setShowSportErrors(false)
    return true
  }

  const handleNextMenu = (e: FormEvent): void => {
    e.preventDefault()
    if (!validateNewTourneyForm()) return
    if (sportSelected === "other") {
      if (sportDialog.current) sportDialog.current.showModal()
      return
    }
    console.log("CREATING TOURNAMENT OBJ")
    createTournamentObj()
    console.log("TOURNAMENT OBJECT COMPLETED: ", tournamentObj)
    setMenuShowing("signups")
  }

  const handleDialogSubmit = (e: FormEvent): void => {
    e.preventDefault()
    createTournamentObj()
    setMenuShowing("signups")
    if (sportDialog.current) sportDialog.current.close()
  }

  const handleManualPlayerEntry = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    let index = currNamingIndex
    const newParticipantsArr: Player[] = [...tournamentObj.participants]
    newParticipantsArr[index].manualName = value
    const newTournamentObj: Tournament = {
      ...tournamentObj,
      participants: newParticipantsArr,
    }
    setTournamentObj(newTournamentObj)
  }

  const manualFieldKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCurrNamingIndex((prev) => prev + 1)
    }
  }

  const manualNameingBackBtnHandler = () => {
    if (currNamingIndex === 0) return
    setCurrNamingIndex((prev) => prev - 1)
  }

  const manualNamingNextBtnHandler = () => {
    if (currNamingIndex === tournamentObj["participants"].length - 1) return
    setCurrNamingIndex((prev) => prev + 1)
  }

  return (
    <>
      <form
        className={`${
          menuShowing === "prelim" ? "flex" : "hidden"
        } flex-col gap-20 justify-center items-center text-xl md:text-2xl xl:text-3xl text-slate-600`}
        onSubmit={(e) => handleNextMenu(e)}
      >
        <div className="flex flex-col justify-center items-center">
          <label>Number of Players?</label>
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
            defaultValue=""
            onChange={(e) => setSportSelected(e.target.value)}
          >
            <option value="">Pick a sport...</option>
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
        >
          NEXT
        </button>
      </form>
      <dialog
        className="absolute m-auto w-1/4 border-4 border-slate-800"
        ref={sportDialog}
      >
        <form
          className={
            incFont.className +
            " text-sm flex flex-col justify-center items-center text-center"
          }
          onSubmit={(e) => handleDialogSubmit(e)}
        >
          <p>
            You have selected "Other" for your sport of choice, so Scorekeeper
            will not be available. Are you sure?
          </p>
          <div>
            <button className="dialogBtn border-slate-500" type="submit">
              Yes
            </button>
            <button
              className="dialogBtn border-slate-500"
              type="submit"
              formMethod="dialog"
            >
              No
            </button>
          </div>
        </form>
      </dialog>
      <form
        className={`${
          menuShowing === "signups" ? "flex" : "hidden"
        } flex-col gap-16 justify-center items-center text-xl md:text-2xl xl:text-3xl text-slate-600`}
      >
        <div className="flex flex-col justify-center items-center">
          <label className="pb-3">Name Teams/Players?</label>
          <div className="text-sm pl-6 flex flex-col gap-5">
            <label className="labelContainer relative hover:cursor-pointer">
              <input
                className="hidden"
                type="radio"
                name="elimType"
                checked={defaultNaming}
                onChange={defaultNamingHandler}
              />
              <span className="customKnockoutCheckbox border-2 border-slate-500"></span>
              <i
                className={`${
                  defaultNaming === false && "!hidden"
                } knockoutCheck text-violet-500 fa-solid fa-check absolute`}
              ></i>
              Default Team/Player Names
            </label>
            <label className="labelContainer relative hover:cursor-pointer">
              <input
                className="hidden"
                type="radio"
                name="elimType"
                checked={manualNaming}
                onChange={manualNamingHandler}
              />
              <span className="customKnockoutCheckbox border-2 border-slate-500"></span>
              <i
                className={`${
                  manualNaming === false ? "!hidden" : ""
                } knockoutCheck text-violet-500 fa-solid fa-check absolute`}
              ></i>
              Manual Naming
            </label>
          </div>
        </div>
        <div
          className={`${
            manualNaming === true ? "flex" : "hidden"
          } flex-col justify-center items-center gap-5`}
        >
          <label htmlFor="manualNameEntry">Enter Team/Player Names:</label>
          {tournamentObj
            ? tournamentObj["participants"].map(
                (playerObj: Player, index: number) => (
                  <div
                    className={`${
                      currNamingIndex === index ? "flex" : "hidden"
                    } gap-5`}
                  >
                    <button type="button" onClick={manualNameingBackBtnHandler}>
                      <i className="fa-solid fa-circle-left text-3xl text-violet-700 bg-white rounded-full"></i>
                    </button>
                    <input
                      key={index}
                      ref={(element: HTMLInputElement) =>
                        manualInputRefs.current.push(element)
                      }
                      className="text-xs md:text-sm lg:text-base text-violet-500 focus:outline-violet-700 text-center w-3/4"
                      type="text"
                      name="playerNames"
                      value={playerObj.manualName}
                      placeholder={playerObj.defaultName}
                      onChange={(e) => handleManualPlayerEntry(e)}
                      onKeyDown={(e) => manualFieldKeyPressHandler(e)}
                    />
                    <button type="button" onClick={manualNamingNextBtnHandler}>
                      <i className="fa-solid fa-circle-right text-3xl text-violet-700 bg-white rounded-full"></i>
                    </button>
                  </div>
                )
              )
            : console.log(tournamentObj)}
          {/* {tournamentObj &&
            manualInputRefs.current.map(
              (inputElement: React.JSX.Element, index: number) => inputElement
            )} */}
        </div>
        <button
          type="submit"
          className={
            tourney.className +
            " btn text-slate-600 hover:text-white bg-violet-400 p-1 flex flex-col items-center text-2xl"
          }
        >
          Confirm
        </button>
      </form>
    </>
  )
}

export default PreliminarySettings
