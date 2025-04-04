import { useState } from 'react'
import './App.css'
import Ai_textProcessor from './ai_textProcessor'
import Textprocessor from './Text_processor'
import TexttProcessor from './Components/TexttProcessor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='font-semibold'>
        {/* <Ai_textProcessor /> */}
        {/* <Textprocessor /> */}
        <TexttProcessor />
      </div>
    </>
  )
}

export default App
