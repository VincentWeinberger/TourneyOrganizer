import React from "react"

const signups = () => {
  return (
    <div className={(showSignups === true ? "" : "hidden ") + "menu"}>
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
    </div>
  )
}

export default signups
