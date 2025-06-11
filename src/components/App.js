import React, { useState } from 'react';
import './App.css'

export default function App () {
    const [count, setCount] = useState(0)
    const [lang, setLang] = useState('zh');
  
    return (
      <>
        <button onClick={() =>setLang('zh')}>ZH</button>
        <button onClick={() => setLang('en')}>EN</button>
        <h1>{languageContent[lang].title}</h1>
        <p>{languageContent[lang].content}</p>
      </>
    )
  }
  