/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import { DocItem } from './DocItem';
import { v4 as uuid } from 'uuid';
import { useIntl } from 'react-intl';
// Doc Picker URL.
type AcccetedFileGroup = 'image' | 'pdf' | 'other';

const DocUploadPage: React.FC<any> = (props: any) => {
  const { docItems, setDocItems, handleAdd, handleDelete, setHasChanged, hasDocsIssue } = props;
  const fileInputRef = useRef<any>();
  const [empty, setEmpty] = useState(false);
  const [uploadState, setUploadState] = useState<any>({});
  const [drag, setDrag] = useState<boolean>(false);
  let timer: any = null;
  const intl = useIntl()
  // Drag and Drop
  const dragOver = (e: any) => {
    e.preventDefault();
    setDrag(true);
    clearTimeout(timer);
  }

  const dragLeave = (e: any) => {
    e.preventDefault();
    timer = setTimeout(() => setDrag(false), 500)
  }

  const fileDrop = (e: any) => {
    e.preventDefault();
    setDrag(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  }

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  }

  const handleFiles = (files: any) => {
    for (let i = 0; i < files.length; i++) {
      let imgUrl = URL.createObjectURL(files[i]);
      let imgName = files[i].name.replace(" ", "_");
      let uid = getUid();
      const type = getFileType(files[i]);
      setDocItems((prevItems: any) => [{
        doc_name: imgName,
        doc_url: imgUrl,
        docFile: files[i],
        size: Math.ceil(files[i].size / 1024),
        isNew: true,
        extension: type,
        id: uid
      }, ...prevItems]);
      handleAdd(uid);
      setHasChanged(true)
      uploadState[uid] = true;
      setUploadState(uploadState);
    }
  }

  const getFileType = (file: File): AcccetedFileGroup => {
    if (file.type.indexOf('image') !== -1) {
      return 'image'
    } else {
      if (file.type.indexOf('pdf') !== -1) {
        return "pdf"
      } else {
        return 'other'
      }
    }
  }

  // get Unique id of docItem
  const getUid = () => {
    return uuid();
  }

  useEffect(() => {
    if (docItems.length <= 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [docItems, empty])

  const handleOneDelete = (id: string, doc_url: string, isNew: boolean) => {
    setDocItems((docItems: any) => docItems.filter((item: any) => item.id !== id));
    setHasChanged(true)
    if (!isNew) {
      handleDelete(doc_url);
    }
  }
  const dropzone = drag ? {
    width: '100%',
    minHeight: 'auto',
    padding: '1.5rem 1.75rem',
    cursor: 'pointer',
    border: '3px dashed #009ef7',
    backgroundColor: '#f1faff',
    borderRadius: '0.475rem',
  } : {
    width: '100%',
    minHeight: 'auto',
    padding: '1.5rem 1.75rem',
    cursor: 'pointer',
    border: '1px dashed #009ef7',
    backgroundColor: '#f1faff',
    borderRadius: '0.475rem',
  }


  return (
    <div className={`card mt-15`}>
      {
        hasDocsIssue &&
        <div className='alert alert-danger'>
          <div className='alert-text font-weight-bold'>
            {
              intl.formatMessage({ id: 'CUSTOMER.UPLOAD.ERROR' })
            }
          </div>
        </div>
      }
      <div className='card-body p-0'>
        <div className="d-flex justify-content-between align-items-center" >
          <div className="fv-row mb-2" style={{ width: '-webkit-fill-available' }}>
            <label
              className="dropzone"
              style={dropzone}
              onDragOver={dragOver}
              onDragLeave={dragLeave}
              onDrop={fileDrop}
            >
              <div className="dz-message needsclick d-flex m-0">
                <div className="ms-4">
                  <h3 className="fs-5 fw-bolder text-gray-900 mb-1">
                    {
                      intl.formatMessage({ id: 'CUSTOMER.DROP HERE' })
                    }

                  </h3>
                  <span className="fs-7 fw-bold text-gray-400">
                    {intl.formatMessage({ id: 'CUSTOMER.DROP HERE.DESC' })}
                  </span>
                </div>
              </div>
              <input
                ref={fileInputRef}
                style={{ display: 'none' }}
                type="file"
                multiple
                onChange={filesSelected}
              />
            </label>
          </div>
        </div>
        <div className='table-responsive'>
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            <thead>
            </thead>
            <tbody>
              {
                docItems.length > 0 ?
                  docItems.map((item: any) => {
                    return (
                      <DocItem
                        key={item.id}
                        data={item}
                        deleteItem={handleOneDelete}
                      />
                    );
                  }) : (
                    <></>
                  )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export { DocUploadPage }
