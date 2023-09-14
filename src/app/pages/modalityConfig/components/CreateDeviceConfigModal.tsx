/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import TextField from '../../../components/CreateUserTextField';
import TextArea from '../../../components/TextArea';
import { setTimeout } from 'timers';

const CreateDeviceConfigModal = (props: any) => {
    const { id, closeModal, handleAdd } = props;
    // eslint-disable-next-line
    const [saving, setSaving] = useState<boolean>(false);
    // eslint-disable-next-line
    const [hasIssue, setHasIssue] = useState<boolean>(false);
    const [data, setData] = useState<any>({
        id: id,
        ae_title: "",
        ip_address: "",
        port: "",
        device_name: "",
        description: "",
    })
    const intl = useIntl();

    const [errors, setErrors] = useState<any>({
        ae_title: false,
        ip_address: false,
        port: false,
        device_name: false,
        description: false,
    })

    const handleClose = () => {
        closeModal();
    }

    const handleSubmit = () => {
        if (data.ae_title === '') {
            errors.ae_title = true;
        } else {
            errors.ae_title = false;
        }
        if (data.ip_address === "") {
            errors.ip_address = true;
        } else {
            errors.ip_address = false;
        }
        if (data.port === "") {
            errors.port = true;
        } else {
            errors.port = false;
        }
        if (data.device_name === "") {
            errors.device_name = true;
        } else {
            errors.device_name = false;
        }

        setErrors({
            ...errors
        })
        if (!errors.ae_title && !errors.ip_address && !errors.port && !errors.device_name) {
            handleCreateDeviceSetting();
        }
    }

    const handleChange = (name: string, value: any) => {
        setData((datas: any) => ({
            ...datas,
            [name]: value,
        }))
        setErrors((errors: any) => ({
            ...errors,
            [name]: false
        }))
    }

    const handleCreateDeviceSetting = () => {
        setSaving(true);
        setHasIssue(false);
        setTimeout(() => {
            handleAdd(data);
            setSaving(false);
            closeModal();
        }, 100);
        // const body = { id, newData: data }
        // createDeviceSetting(body)
        //     .then((res) => {
        //         const { newData } = res.data;
        //         setSaving(false);
        //         closeModal();
        //     })
        //     .catch((err) => {
        //         debugger
        //         setSaving(false);
        //         setHasIssue(true);
        //     })
    }

    return (
        <div className="modal-dialog modal-dialog-centered" style={{ width: '600px' }}>
            <div className="modal-content rounded bg-white">
                <div className="modal-header pb-0 border-0 justify-content-end">
                    <button
                        className="btn btn-sm btn-icon btn-active-color-primary"
                        onClick={handleClose}
                    >
                        <span className="svg-icon svg-icon-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black" />
                                <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black" />
                            </svg>
                        </span>
                    </button>
                </div>
                <div className="modal-body scroll-y px-10 px-lg-15 pt-0 pb-5">
                    <div className="mb-13 text-center">
                        <h1 className="mb-3">
                            {
                                intl.formatMessage({ id: 'DEVICE.CONFIG.EDIT' })
                            }
                        </h1>
                    </div>
                    <TextField
                        value={data.ae_title}
                        errors={errors}
                        name="ae_title"
                        type="text"
                        readOnly={false}
                        title="Specify title"
                        handleChange={handleChange}
                        header={"AE Title"}
                        requiredText={intl.formatMessage({ id: 'DEVICE.CONFIG.REQUIRED' })}
                    />
                    <TextField
                        value={data.ip_address}
                        errors={errors}
                        name="ip_address"
                        type="text"
                        readOnly={false}
                        title="Specify the Ip"
                        handleChange={handleChange}
                        header={'IP Address'}
                        requiredText={intl.formatMessage({ id: 'DEVICE.CONFIG.REQUIRED' })}
                    />
                    <TextField
                        value={data.port}
                        errors={errors}
                        name="port"
                        type="text"
                        readOnly={false}
                        title="Specify the Port"
                        handleChange={handleChange}
                        header={'Port'}
                        requiredText={intl.formatMessage({ id: 'DEVICE.CONFIG.REQUIRED' })}
                    />
                    <TextField
                        value={data.device_name}
                        errors={errors}
                        name="device_name"
                        type="text"
                        readOnly={false}
                        title="Specify the device name"
                        handleChange={handleChange}
                        header={'Device Name'}
                        requiredText={intl.formatMessage({ id: 'DEVICE.CONFIG.REQUIRED' })}
                    />
                    <TextArea
                        value={data.description}
                        name="description"
                        rows={4}
                        handleChange={handleChange}
                        header={'Descriptions'}
                    />

                    <div className="text-center mt-2">
                        <button className="btn btn-light me-3" onClick={handleClose}>
                            {
                                intl.formatMessage({ id: 'DEVICE.CONFIG.CANCEL' })
                            }
                        </button>
                        <button onClick={handleSubmit} className='btn btn-md btn-primary mr-3'>
                            <span className='indicator-label'>
                                {
                                    intl.formatMessage({ id: 'DEVICE.CONFIG.EDITING' })
                                }
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { CreateDeviceConfigModal };