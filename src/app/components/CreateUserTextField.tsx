/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useIntl } from 'react-intl';

const TextField = (props: any) => {
    const { errors, header, handleChange, requiredText, name, value, type, title, readOnly } = props;
    const [validation, setError] = React.useState(false);
    const intl = useIntl();
    // eslint-disable-next-line
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const handlechange = (event: any) => {
        const rvalue = event.target.value;
        if (type === 'email') {
            const validEmail = new RegExp(regex);
            if (!validEmail.test(rvalue)) {
                setError(true);
            } else {
                setError(false);
            }
        }
        handleChange(name, rvalue);
    }

    return (
        <div className="d-flex flex-column mb-8">
            <div>
                <span className={`fs-6 fw-bold mb-2 ${requiredText ? 'required' : ''}`}>
                    {
                        header
                    }
                </span>
                <i
                    className="fas fa-exclamation-circle ms-2 fs-7"
                    data-bs-toggle="tooltip"
                    title={title}
                ></i>
            </div>
            <input
                className="form-control"
                name={name}
                readOnly={readOnly ? readOnly : false}
                type={type}
                value={value}
                style={{ fontSize: '13px', fontWeight: 100 }}
                onChange={handlechange}
            />
            {errors[name] === true && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block text-danger'>
                        {
                            requiredText
                        }
                    </div>
                </div>
            )}
            {validation === true && (
                <div className='fv-plugins-message-container'>
                    <div className='fv-help-block text-danger'>
                        {
                            intl.formatMessage({ id: 'COMPANY.USER.EMAIL.ERROR' })
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default TextField;