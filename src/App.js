import React, { useState } from 'react';

function App(props) {
    const [count, setCount] = useState(0);
    return <div>
        <h1>{props.greeting} kaikeba {count}</h1>
        <button onClick={() => { setCount(prev => prev + 1) }}>increase</button>
        </div>
}

export default <App greeting="hello"/>;