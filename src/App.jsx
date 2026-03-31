import { useState, useCallback, useEffect } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const [upperAllowed, setUpperAllowed] = useState(false)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'abcdefghijklmnopqrstuvwxyz'
    let upp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    if (numberAllowed) str += '0123456789'
    if (charAllowed) str += '!@#$%^&*()_+~`|}{[]:;?><,./-='
    if (upperAllowed) str += upp

    for (let i = 1; i <= length; i++) {
      const index = Math.floor(Math.random() * str.length)
      pass += str.charAt(index)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed, upperAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, upperAllowed, passwordGenerator])

  return (
    <div className="bg-gray-500 w-full justify-center px-4 mx-auto my-1.5">
      <h1>Password Generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden">
        <input
          type="text"
          value={password}
          placeholder="password"
          readOnly
          className="outline-none rounded w-fit py-1 px-80 bg-white"
        />
        <button className="bg-blue-500 mx-1 text-gray-500 px-4 py-1 rounded hover:bg-blue-600">
          Copy
        </button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="number"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="number">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={upperAllowed}
            id="upper"
            onChange={() => setUpperAllowed((prev) => !prev)}
          />
          <label htmlFor="upper">Upper case</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={charAllowed}
            id="char"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="char">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App