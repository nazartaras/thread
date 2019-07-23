import React from 'react';
import './EmailInput.css';
import PropTypes from 'prop-types';

class EmailInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: true
        };
        this.onBlur = this.onBlur.bind(this);
    }

    onBlur(e) {
        const isValid = e.target.value.includes('@');
        this.setState({
            isValid
        });
    }

    getValidationStatus() {
        return this.state.isValid;
    }

    getErrorMessage() {
        return <span className='error-message'>That is not a valid email</span>;
    }

    render() {
        const props = this.props;
        const isValid = this.state.isValid; 
        const inputClass = isValid ? 'col-sm-9' : 'error col-sm-9';

        return (
            <div className='email-input form-group row'>
                <label className="col-sm-3 col-form-label">{ props.label }</label>
                <input
                    value={ props.text }
                    className={ inputClass }
                    onChange={ e => props.onChange(e) }
                    onBlur={ this.onBlur }
                />
                { !isValid ? this.getErrorMessage() : null }
            </div>
        );
    }
}

EmailInput.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    keyword: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func
};

export default EmailInput;