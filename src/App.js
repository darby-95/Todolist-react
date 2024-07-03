import React, { useState } from 'react'
import TodoList from './components/TodoList/TodoList';
import Header from './components/Header/Header';
import "./App.css";
import {DarkModeProvider} from "./context/DarkModeContext"

function App() {
  const filters=["all","active","completed"];
  const [filter,setFilter]=useState(filters[0])

  return (
    <>
    <DarkModeProvider>
    <Header filters={filters} filter={filter}
    // onFilterChange={(filter)=>{setFilter(filter)} 을 아래와같이 줄일 수 있다.
    onFilterChange={setFilter}
    />
    <TodoList filter={filter}/>
    </DarkModeProvider>
    </>

  )
}

export default App
