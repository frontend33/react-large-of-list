import React, {useCallback, useMemo} from 'react';
import { List } from './components/List'
import './App.css';
import { Llist } from './utils/LinkedList'

function App() {

    let d = new Llist();
    console.log(d);
    d.push(2)
    d.push(3)
    d.push(4)
    console.log(d);

    const data = ['0']

    for (let i = 1; i < 300; i++) {
        data.push(String(i))
    }

  return (
    <div className="App">
      <List data={data}/>
    </div>
  );
}

export default App;
