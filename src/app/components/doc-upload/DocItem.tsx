import { KTSVG } from '../../../_metronic/helpers';
import React, { useState, useEffect } from 'react';
import pic from '../../../images/Document-icon.png';
import pdfpic from '../../../images/pdf-icon.jpg';
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */

export const DocItem = (props: any) => {
    const {
        data,
        deleteItem,
    } = props

    // eslint-disable-next-line
    const [docFile, setDocFile] = useState<any>(data.docFile);
    const [size, setSize] = useState<number>(0);

    const handleDelete = () => {
        deleteItem(data.id, data.doc_url, data.isNew);
    }


    useEffect(() => {
        if (docFile) {
            setSize(Math.ceil(docFile.size / 1024))
        }
    }, [docFile])

    useEffect(() => {
        // if (data.size > 0) {
        //     setSize(data.size);
        // }
    }, [data])

    const handleDocClick = () => {
        if (data.isNew) {
            window.open(data.doc_url, '_blank');
        } else {
            if (data.extension === "pdf") {
                let pdfWindow: any = window.open("", '_blank');
                pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(docFile) + "'></iframe>")
            } else {
                var a = document.createElement("a"); //Create <a>
                a.href = "data:application/octet-stream;base64," + docFile; //Image Base64 Goes here
                a.download = data.doc_name; //File name Here
                a.click(); //Downloaded file
            }
        }
    }

    return (
        <tr>
            <td>
                <div className='d-flex align-items-center'>
                    <div className='symbol symbol-45px me-5 cursor-pointer' onClick={handleDocClick}>
                        {
                            docFile ?
                                <>
                                    {
                                        data.extension === "pdf" ?
                                            <img style={{ objectFit: 'cover' }} src={pdfpic} alt='' />
                                            :
                                            <img style={{ objectFit: 'cover' }} src={pic} alt='' />

                                    }
                                </>
                                :
                                <div className='d-flex align-items-center justify-content-center bg-opacity-5 h-50px'>
                                    <div className="overlay-layer rounded ">
                                        <div
                                            className="spinner-border text-primary"
                                            role="status"
                                        >
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>

                        }
                    </div>
                    <div className='d-flex justify-content-start flex-column'>
                        <a className='text-dark fw-bolder text-hover-primary fs-6'>
                            {data.doc_name}
                        </a>
                    </div>
                </div>
            </td>
            <td>
                <div className='d-flex justify-content-start flex-column'>
                    <a className='text-dark fw-bolder text-hover-primary fs-6'>
                        {
                            size >= 1024 ?

                                <>{Math.ceil(size / 1024)}MB</>
                                :
                                <>{size}KB</>
                        }
                    </a>
                </div>
            </td>

            <td>
                <div className='d-flex justify-content-end flex-shrink-0'>
                    <button
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                        data-bs-toggle="modal" data-bs-target="#delete-one-confirm-modal"
                        onClick={handleDelete}
                    >
                        <KTSVG
                            path='/media/icons/duotune/general/gen027.svg'
                            className='svg-icon-3'
                        />
                    </button>
                </div>
            </td>
        </tr>
    )
};