import React from 'react'

const AddComponent = ({keyValue, value, handleChange, index, handleRemoveField}) => {
    return (
        <div className="input-group my-2" data-key-value-pair>
            <input type="text" name="key" data-key className="form-control" value={keyValue}
            placeholder="key" onChange={(event) => handleChange(event, index)} />
            <input type="text" name="value" data-value className="form-control" value={value}
            placeholder="value" onChange={(event) => handleChange(event, index)} />
            <button type="button" data-remove-btn className="btn btn-danger" 
            onClick={(index) => handleRemoveField(index)}>
                Remove
            </button>
        </div>
    )
}

export default AddComponent
