import { useState } from 'react'
import './App.css'



function App() {
 let [counter,setCounter]= useState(10)
  //let counter = 10
  
const addValue = () => {
  
  setCounter(counter + 1)
  console.log("counter value:", counter);
  
}
const substractValue = ()=>{
  setCounter(counter - 1)
  console.log("counter value:", counter);
}

  return (
    <>
      <h1>Ajeet comes to learn react js</h1>
      <h1>counter: {counter}</h1>
       <h1>counter: {counter}</h1>
        <h1>counter: {counter}</h1>
         <h1>counter: {counter}</h1>
         <p>counter: {counter}</p>
      <button onClick={addValue}>increment by 1</button>
      <button onClick={substractValue}>decrement by 1</button>
    </>
  )
}

export default App
