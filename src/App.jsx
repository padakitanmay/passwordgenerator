import { useState, useCallback, useEffect, useRef } from "react";

function App() {
    const [length, setLength] = useState(8);
    const [numAllowed, setNumAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");

    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (numAllowed) str += "0123456789";
        if (charAllowed) str += "!@#$%^&*()~?";

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }
        setPassword(pass);
    }, [length, numAllowed, charAllowed, setPassword]);

    const copyToClipborad = useCallback(() => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
    }, [password]);

    useEffect(() => {
        passwordGenerator();
    }, [length, numAllowed, charAllowed, passwordGenerator]);

    return (
        <>
            <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700 font-sans'>
                <h1 className='text-white text-center my-2 text-3xl font-bold'>
                    Password Generator
                </h1>
                <div className='flex shadow rounded-lg overflow-hidden mb-4'>
                    <input
                        type='text'
                        value={password}
                        className='outline-none w-full py-1 px-3 font-mono text-lg'
                        placeholder='Password'
                        readOnly
                        ref={passwordRef}
                    />
                    <button
                        className='outline-none bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 font-semibold transition-colors duration-300'
                        onClick={(e) => {
                            copyToClipborad();
                            e.target.textContent = "Copied!";
                        }}
                    >
                        Copy
                    </button>
                </div>
                <div className='flex text-sm gap-x-2 text-white'>
                    <div className='flex items-center gap-x-1'>
                        <input
                            type='range'
                            min={6}
                            max={100}
                            value={length}
                            className='cursor-pointer'
                            onChange={(eve) => setLength(eve.target.value)}
                        />
                        <label className='font-semibold'>
                            Length: {length}
                        </label>
                    </div>
                    <div className='flex items-center gap-x-1'>
                        <input
                            type='checkbox'
                            defaultChecked={numAllowed}
                            id='numInput'
                            onChange={() => setNumAllowed((prev) => !prev)}
                        />
                        <label className='font-semibold'>Numbers</label>
                    </div>
                    <div className='flex items-center gap-x-1'>
                        <input
                            type='checkbox'
                            defaultChecked={charAllowed}
                            id='charInput'
                            onChange={() => setCharAllowed((prev) => !prev)}
                        />
                        <label className='font-semibold'>Characters</label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
