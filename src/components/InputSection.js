import React, {useState, useRef} from 'react'
import AddComponent from './AddComponent';
import axios from 'axios';
import CodeEditor from '@uiw/react-textarea-code-editor';
import prettyBytes from 'pretty-bytes';

const InputSection = ({getResponse}) => {
    let startTime; let endTime;
    const activeTabRef = useRef('queryParams');

    const [method, setmethod] = useState('GET');
    const [url, seturl] = useState('');

    const [inputHeaders, setinputHeaders] = useState([
        {'key': '', 'value': ''}
    ]);
    const [queryParams, setqueryParams] = useState([
        {'key': '', 'value': ''}
    ]);
    const [body, setbody] = useState([]);
    const [authorization, setauthorization] = useState([
        {'key': '', 'value': ''}
    ]);
    const tabChangedTo = (name) => {
        activeTabRef.current = name;
    }

    const handleChange = (event, index) => {
        
        if(activeTabRef.current === 'queryParams'){
            const values=[...queryParams];
            values[index][event.target.name] = event.target.value;
            setqueryParams(values);
        } else if(activeTabRef.current === 'requestHeaders'){
            const values=[...inputHeaders];
            values[index][event.target.name] = event.target.value;
            setinputHeaders(values);
        } else if(activeTabRef.current === 'body'){
            const values=[...body];
            values[index][event.target.name] = event.target.value;
            setbody(values);
        } else if(activeTabRef.current === 'authorization'){
            const values=[...authorization];
            values[index][event.target.name] = event.target.value;
            setauthorization(values);
        } 
    }
    const handleAddField = () => {
        if(activeTabRef.current === 'queryParams'){
            setqueryParams([...queryParams, {key: '', value: ''}]);
        } else if(activeTabRef.current === 'requestHeaders'){
            setinputHeaders([...inputHeaders, {key: '', value: ''}]);
        } else if(activeTabRef.current === 'body'){
            setbody([...body, {key: '', value: ''}]);
        } else if(activeTabRef.current === 'authorization'){
            setauthorization([...authorization, {key: '', value: ''}]);
        } 
    }
    const handleRemoveField = (index) => {
        if(activeTabRef.current === 'queryParams'){
            const values=[...queryParams];
            values.splice(index,1);
            setqueryParams(values);
        } else if(activeTabRef.current === 'requestHeaders'){
            const values = [...inputHeaders];
            values.splice(index,1);
            setinputHeaders(values);
        } else if(activeTabRef.current === 'body'){
            const values=[...body];
            values.splice(index,1);
            setbody(values);
        } else if(activeTabRef.current === 'authorization'){
            const values=[...authorization];
            values.splice(index,1);
            setauthorization(values);
        } 
        
    }
    const handleMethodChange = (e) => {
        setmethod(e.target.value);
    }
    const handleUrlChange = (e) => {
        seturl(e.target.value);
    }

    const keyValuePairsToObjects = (pairs) => {
        return pairs.reduce( (data, pair) => {
            const key = pair.key;
            const value = pair.value;
            if(key === '') {
                return data;
            }
            return { ...data, [key]: value };
        }, {})
    }
    // const updateEndTime = (res) => {
        
    //     endTime = new Date().getTime();
    //     return res;
    // }
    const handleSubmit = (e) => {
        e.preventDefault();

        let jsonData;
        try{
            jsonData = JSON.parse(body.toString() || null);
        } catch (e){
            alert('JSON data is malformed!');
            return;
        }

        

        // axios.interceptors.request.use(req => {
            
        //     startTime = new Date().getTime();
        //     return req;
        // });
        // axios.interceptors.response.use(updateEndTime, err => {
        //     return Promise.reject(updateEndTime(err.response));
        // })
        startTime = new Date().getTime();
        axios({
            method: method,
            url: url,
            params: keyValuePairsToObjects(queryParams),
            headers: keyValuePairsToObjects(inputHeaders),
            data: jsonData
        }).then( res => {
            endTime = new Date().getTime();
            res.time = endTime - startTime;
            res.size = prettyBytes(JSON.stringify(res.data).length + JSON.stringify(res.headers).length);
            console.log("response sent");
            getResponse(res);
        }).catch(err => {
            if(err.response){
                endTime = new Date().getTime();
            err.response.time = endTime - startTime;
            err.response.size = prettyBytes(JSON.stringify(err.response.data).length + JSON.stringify(err.response.headers).length);
            console.log("err response sent");
            getResponse(err.response);
            return err;
            }
        })
    }

    return (
        <div>
            <div className="bg-dark d-flex align-items-center">
                <img id="app-logo" src="https://hostcountry.hashinclude.tech//assets/img/demo/logo.svg" alt="logo" />
                <h2 className="d-inline" id="app-heading"> Api Viewer </h2>
            </div>
            <div className="px-5 py-4">
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="input-group mb-4">
                        <select className="form-select flex-grow-0 w-auto "
                        value={method} onChange={e => handleMethodChange(e)}>
                            <option value="GET"> GET </option>
                            <option value="POST"> POST </option>
                            <option value="PUT"> PUT </option>
                            <option value="PATCH"> PATCH </option>
                            <option value="DELETE"> DELETE </option>
                        </select>

                        <input type="url" required onChange={e => handleUrlChange(e)}
                        className="form-control" value={url}
                        placeholder="https://exampleURL.com" />

                        <button type="submit" className="btn btn-dark col-2"> Send </button>
                    </div>

                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-items" role="presentation">
                            <button onClick={()=> tabChangedTo('queryParams')} className="nav-link active" 
                            id="query-params-tab" data-bs-toggle="tab"
                            data-bs-target="#query-params" type="button"
                            role="tab" aria-controls="query-params"
                            aria-selected="true">
                                Query Params
                            </button>
                        </li>
                        <li className="nav-items" role="presentation">
                            <button onClick={()=> tabChangedTo('requestHeaders')} className="nav-link " 
                            id="request-headers-tab" data-bs-toggle="tab"
                            data-bs-target="#request-headers" type="button"
                            role="tab" aria-controls="request-headers"
                            aria-selected="false">
                                Headers
                            </button>
                        </li>
                        {/* json / body  */}
                        <li className="nav-items" role="presentation">
                            <button onClick={()=> tabChangedTo('body')} className="nav-link " 
                            id="body-tab" data-bs-toggle="tab"
                            data-bs-target="#body" type="button"
                            role="tab" aria-controls="body"
                            aria-selected="false">
                                Body
                            </button>
                        </li>
                        <li className="nav-items" role="presentation">
                            <button onClick={()=> tabChangedTo('authorization')} className="nav-link " 
                            id="authorization-tab" data-bs-toggle="tab"
                            data-bs-target="#authorization" type="button"
                            role="tab" aria-controls="authorization"
                            aria-selected="false">
                                Authorization
                            </button>
                        </li>
                    </ul>

                    {/* // tab content //  */}
                    <div className="tab-content p-3 border-top-0 border">
                        <div className="tab-pane fade show active"
                        id="query-params" role="tabpanel" 
                        aria-labelledby="query-params-tab">
                            <div data-query-params></div>
                            {queryParams.map( (inputHeader, index) => (
                                <div key={index}>
                                    <AddComponent keyValue={inputHeader.key} value={inputHeader.value}  
                                    handleChange={handleChange} index={index} handleRemoveField={handleRemoveField}
                                    />
                                </div>
                            ))}
                            <button data-add-query-params-btn
                            className="mt-2 btn "
                            style={{backgroundColor: 'rgb(23, 173, 23)', color: 'white'}}
                            type="button" onClick={() => handleAddField()}>
                                Add
                            </button>
                        </div>

                        <div className="tab-pane fade"
                        id="request-headers" role="tabpanel" 
                        aria-labelledby="request-headers-tab">
                            <div data-request-headers></div>
                            {inputHeaders.map( (inputHeader, index) => (
                                <div key={index}>
                                    <AddComponent keyValue={inputHeader.key} value={inputHeader.value}  
                                    handleChange={handleChange} index={index} handleRemoveField={handleRemoveField}
                                    />
                                </div>
                            ))}
                            <button data-add-request-header-btn
                            className="mt-2 btn" onClick={() => handleAddField()}
                            style={{backgroundColor: 'rgb(23, 173, 23)', color: 'white'}}
                            type="button">
                                Add
                            </button>
                        </div>

                        <div className="tab-pane fade"
                        id="body" role="tabpanel" 
                        aria-labelledby="body-tab">
                            <div data-body-request className="overflow-auto"
                            id="request-body-container">
                                <CodeEditor
                                value={body}
                                language="json"
                                placeholder="Please enter the Body in JSON format."
                                onChange={(evn) => setbody(evn.target.value)}
                                padding={15}
                                style={{
                                    fontSize: 12,
                                    backgroundColor: "white",
                                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                    minHeight: '150px'
                                }}
                                />
                            </div>
                        </div>

                        <div className="tab-pane fade"
                        id="authorization" role="tabpanel" 
                        aria-labelledby="authorization-tab">
                            <div data-authorization></div>
                            {authorization.map( (inputHeader, index) => (
                                <div key={index}>
                                    <AddComponent keyValue={inputHeader.key} value={inputHeader.value}  
                                    handleChange={handleChange} index={index} handleRemoveField={handleRemoveField}
                                    />
                                </div>
                            ))}
                            <button data-add-authorization-btn
                            className="mt-2 btn" 
                            style={{backgroundColor: 'rgb(23, 173, 23)', color: 'white'}} 
                            onClick={() => handleAddField()}
                            type="button">
                                Add
                            </button>
                        </div>
                    </div>
                </form>
            </div>

    
        </div>
    )
}

export default InputSection
