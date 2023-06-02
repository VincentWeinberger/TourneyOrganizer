export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="text-violet-700 text-center text-5xl">TOURNEY</h1>
      <div className="mainMenu flex flex-col w-2/3 h-1/2 bg-slate-100 mt-20 rounded-xl shadow-lg shadow-slate-500">
        <ul>
          <li>New Tournament</li>
          <li>Saved Tournaments</li>
        </ul>
      </div>
    </main>
  )
}
