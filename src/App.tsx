import React, {useCallback, useMemo} from 'react';
import { List } from './components/List'
import './App.css';

function App() {
    const data = ['0']

    for (let i = 1; i < 200; i++) {
        data.push(String(i))
    }

  return (
    <div className="App">
      <List data={data}/>
    </div>
  );
}

export default App;
