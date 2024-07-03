import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

// 매개변수 onAdd는 TodoList.jsx에서 구조분해하여 들고온거기 때문에 {} 에 넣어야 한다.
function AddTodo({onAdd}) {
        // 기본적으로 useState에 값이 없도록 비워놓는다.
        const [text,setText]=useState('');
        // 🌟 사용자가 적은 값(14번줄, input의 value={text}값)을 통해 불러온다.
        const handleChange=(e)=>setText(e.target.value);

        // 🌟 데이터를 전송하는 버튼을 눌렀을때 새로고침을 막는다.
        const handleSubmit=(e)=>{
            e.preventDefault();

            // : 글자를 적지 않고, 빈칸만 적는것을 방지(trim : 빈칸을 포함한 글자의 길이가 0일때)
            if(text.trim().length === 0){
                //함수 실행 멈추기
                return;
            }

            // text값은 text(value:input의 value인 text값을 의미)한다.
            // text:text, 즉 text라는 글자가 중복되기 때문에 하나로 줄일 수 있다.
            onAdd({id:uuidv4(),text, status:"active"})
            // 🌟 input에 적은 값을 버튼을 통해 전송할때, input의 값이 비워지지 않는것을 비울 수 있다.
            setText("")
        }

  return (
    // 아래 버튼을 클릭했을때 form의 값들을 onSubit(handleSubmit:함수)을 통해 전송한다.
    <form className='form' onSubmit={handleSubmit}>
        {/* onChange는 함수 불러오는 방법 */}
        <input className='input' type="text" placeholder='Add Todo' value={text} onChange={handleChange} />
        <button className='button'>Add</button>
    </form>
  )
}

export default AddTodo
