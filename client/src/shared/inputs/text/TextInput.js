import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ text, label, onChange }) => {
    return (
        <div className="form-group row">
            <label className="col-sm-3 col-form-label">{ label }</label>
            <input
                className="col-sm-9"
                value={ text }
                onChange={ (e)=>onChange(e)}
            />
        </div>
    );
}

TextInput.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    keyword: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func
};

export default TextInput;