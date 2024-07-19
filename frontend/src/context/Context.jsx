import React, { useState } from 'react'
export const Context = React.createContext();

const ContextProvider = (Props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");


    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index)
    }
    const onSent = async (prompt, x = 1) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        if (x) setPrevPrompts(prev => [prompt, ...prev])
        setRecentPrompt(prompt);
        const Response = await fetch('https://new-gemini-api.vercel.app/ask', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });
        const content = await Response.json();
        const outputText = content.text;
        console.log(outputText);

        let responseArray = outputText.split(" ");
        for (let i = 0; i < responseArray.length; i++) {
            const nextWord = responseArray[i];
            delayPara(i, nextWord + " ");
        }

        setLoading(false);
        setInput("")
    }

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent
    }




    return (
        <Context.Provider value={contextValue}>
            {Props.children}
        </Context.Provider>
    )
}

export default ContextProvider