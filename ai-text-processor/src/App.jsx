import { useState } from 'react'
import './App.css'
import Ai_textProcessor from './ai_textProcessor'
import Textprocessor from './Text_processor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='font-semibold'>
        {/* <Ai_textProcessor /> */}
        <Textprocessor />
      </div>
    </>
  )
}

export default App
