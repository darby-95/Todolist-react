import { createContext, useContext, useState, useEffect } from "react";

export const DarkModeContext = createContext();

export function DarkModeProvider({children}){ // 인자값을 자식노드로 받아왔다.
    // DarkModeContext에 있는 Provider를 이용하여 자식노드를 감싸주어 
    // 자식요소에게 값을 전달해 줄 수 있는 영역을 감쌈.

    // 처음에는 lightMode로 사용
    const [darkMode,setDarkMode]=useState(false);
    const toggleDarkMode=()=>{
        setDarkMode(prev=>!prev);
        updateDarkMode(!darkMode);
    };

    // useEffect(()=>{},[]) 
    // 배열이 비어있다면, componenet(함수)가 실행될 때 한번만 실행 된다.
    // 만약 배열에 변수가 들어있다면 componenet(함수)가 한번은 실행되고 darkMode값이 바뀔때마다 함수가 실행된다.
    // useEffect(()=>{},[darkMode]) 
    // useEffect(()=>{},[darkMode,변수2]) : 만약 2개 이상이여도, 2번 실행되는게 아닌 1번만 실행된다. 

    useEffect(()=>{
        // 테마중 "dark"가 있니?
        const isDark=localStorage.theme==="dark";
        
        // dark가 있다면, 아래를 실행한다.
        setDarkMode(isDark)
        updateDarkMode(isDark);
    },[])

    // 내 자식들이 언제든지 darkMode,toggleDarkMode를 쓸 수 있도록 만듦.
    return (<DarkModeContext.Provider value={{darkMode,toggleDarkMode}}>{children}</DarkModeContext.Provider>);
}

export const useDarkMode=()=>{
    // Hook, useContext에서 DarkModeContext를 사용할 수 있게 한다.
    return useContext(DarkModeContext); 
};

function updateDarkMode(darkMode){
    if(darkMode){
        document.documentElement.classList.add("dark");
        // documentElement : 최상위 태그인 html tag 부르기
        // : localStorage에 키 값(theme)에 value(dark)값을 넣겠다.
        localStorage.theme="dark";

    }else{
        document.documentElement.classList.remove("dark");
        // : localStorage에 키 값(theme)에 value(light)값을 넣겠다.
        localStorage.theme="light";
    }
}