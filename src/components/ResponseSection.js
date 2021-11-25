import React, { useEffect} from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor';

const ResponseSection = ({headers, status, time, size, code}) => {
    useEffect(() => {
        console.log("STATUS CHANGED");
    }, [status]);
    

    return (
        <div className="mt-2 px-5">
                <h3>Response :</h3>
                <div className="d-flex my-2">
                    <div className="me-5">
                        Status : {
                            status === 200 ? (<span className="success">{status}</span>) :
                            <span className="danger">{status}</span>
                        }
                    </div>
                    <div className="me-5">
                        Time : <span className="normal">{time}</span> ms
                    </div>
                    <div className="me-5">
                        Size : <span className="normal">{size}</span>
                    </div>
                </div>
                <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-items" role="presentation">
                            <button className="nav-link active" 
                            id="Body-tab" data-bs-toggle="tab"
                            data-bs-target="#Body" type="button"
                            role="tab" aria-controls="Body"
                            aria-selected="true">
                                Body
                            </button>
                        </li>
                        <li className="nav-items" role="presentation">
                            <button className="nav-link " 
                            id="response-headers-tab" data-bs-toggle="tab"
                            data-bs-target="#response-headers" type="button"
                            role="tab" aria-controls="response-headers"
                            aria-selected="false">
                                Headers
                            </button>
                        </li>
                        
                    </ul>

                    {/* // tab content //  */}
                    <div className="tab-content p-3 border-top-0 border" id="response-container">
                        <div className="tab-pane fade show active"
                        id="Body" role="tabpanel" 
                        aria-labelledby="Body-tab">
                            <div data-body-response className="overflow-auto"
                            id="response-body-container">

                                <CodeEditor 
                                    disabled={true}
                                    value={code}
                                    language="json"
                                    // placeholder="Please enter JS code."
                                    // onChange={(evn) => setCode(evn.target.value)}
                                    padding={15}
                                    style={{
                                        fontSize: 15,
                                        backgroundColor: "#E7F3FE",
                                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                                        minHeight: '500px',
                                        borderRadius: '5px'
                                    }}
                                />

                            </div>
                        </div>
                        <div className="tab-pane fade"
                        id="response-headers" role="tabpanel" 
                        aria-labelledby="response-headers-tab">
                            <div id="response-header-container"
                            style={{display: 'flex', flexDirection: 'column'}}>
                                {
                                    headers.map( item => (
                                        <div key={Math.random()*1000}>
                                            <div > 
                                                <span > <b>{item[0]} : </b>  </span>
                                                <span style={{marginLeft: "20px"}} > {item[1]}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
            </div>
    )
}

export default ResponseSection
