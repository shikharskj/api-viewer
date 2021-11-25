import {useState, useEffect} from 'react'
import './App.css';
import InputSection from './components/InputSection'
import ResponseSection from './components/ResponseSection'


function App() {

  const [res, setRes] = useState({});
  const [headers, setheaders] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const [code, setCode] = useState(
    ``
  );
  useEffect(() => {
    const values = [];
    if(res.headers){
      Object.keys(res.headers).map( key => {
        values.push([key,res.headers[key]]);
        return 1;
      });
    }
    setheaders(values);
    setCode(JSON.stringify(res.data, null, 4));
    setisLoading(false);
    // return () => {
    //   cleanup
    // }
  }, [res])
  

  const getResponse = (response) => {
    console.log("response : ", response);
    setRes(response);

  }

  // if(isLoading) {
  //   return 
  // }

  return (
    <div className="App">
      <InputSection getResponse={getResponse} />
      {
        isLoading ? (<ResponseSection headers={[]} status={[]} time={[0]} size={[0]}
          code={code}
        /> ) :
        (<ResponseSection headers={headers} status={res.status} time={res.time} size={res.size}
          code={code}
        /> )
      }
    </div>
  );
}

export default App;
