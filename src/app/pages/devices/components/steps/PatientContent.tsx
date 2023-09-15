/* eslint-disable array-callback-return */
import React, { useState, useMemo, useEffect, useRef } from 'react'
import NoDatas from '../../../../components/NoDatas'
import { MenuComponent } from '../../../../../_metronic/assets/ts/components';
import { useIntl } from 'react-intl';
import { KTSVG } from '../../../../../_metronic/helpers'
import { Resizable } from 're-resizable';
import * as devices from '../../redux/Devicesredux'
import { useDispatch } from 'react-redux';
import { alphabeticallyPatient } from '../../../../../setup/utils/utils';
import PatientTableItem from '../PatientTableItem';
import Pagenation2 from '../../../../components/pagination2/Pagenation';
import DateField from '../../../../components/DateField';
import { deletePatient, getFilteringData, uploadPatients } from '../../redux/DevicesCRUD';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TabContent = (props: any) => {
  const { totalData, setTotalData, headers, getDatas } = props;

  // eslint-disable-next-line
  const [hasIssue, setHasIssue] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalColumnItems, setTotalColumnItems] = useState<any[]>(totalData);
  const [columnItems, setColumnItems] = useState<any[]>([]);
  const [columnNames, setColumnNames] = useState<any[]>([]);
  const [checkedData, setCheckedData] = useState<string[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [selectedStudyRow, setSelectedStudyRow] = useState<any>(null);

  const [sortAsc, setSortASC] = useState<any>();
  const [currentsort, setCurrentSort] = useState<string>(headers[0]);
  const [sortFlag, setSortFlag] = useState<boolean>(true);
  const [checkAll, setCheckedAll] = useState<boolean>(false);

  const [activeAdd, setActiveAdd] = useState<boolean>(false);

  const [filters, setFilters] = useState<any>({
    patientName: "",
    patientId: "",
    studyDescription: "",
    studyDate: "",
    modalitiesInStudy: "",
    accessionNumber: ""
  })

  const [columnWidthsObj, setColumnWidthsObj] = useState<any>({});
  let minColumnWidthsObj: any = {};

  const intl = useIntl()
  const dispatch = useDispatch();

  const toggleSetting = (rowId: string, checked: boolean) => {
    if (checked) {
      setCheckedData([...checkedData, rowId]);
    } else {
      setCheckedData(checkedData.filter((id) => id !== rowId));
    }
  };

  useEffect(() => {
    if (checkedData.length === currentTableData.length) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
    // eslint-disable-next-line
  }, [checkedData, totalColumnItems])

  const toggleAllCheckedData = (event: any) => {
    const checked = event.target.checked;
    if (checked) {
      setCheckedAll(true);
      const currentPageIds = currentTableData.map((row) => row.ID);
      const newSelectedRows = Array.from(
        new Set([...checkedData, ...currentPageIds])
      );
      setCheckedData(newSelectedRows);
    } else {
      setCheckedAll(false)
      // Deselect all rows on the current page
      const currentPageIds = currentTableData.map((row) => row.ID);
      const newSelectedRows = checkedData.filter(
        (rowId) => !currentPageIds.includes(rowId)
      );
      setCheckedData(newSelectedRows);
    }
  };

  const removeChecks = () => {
    setCheckedAll(false)
    const currentPageIds = currentTableData.map((row) => row.ID);
    const newSelectedRows = checkedData.filter(
      (rowId) => !currentPageIds.includes(rowId)
    );
    setCheckedData(newSelectedRows);
  }

  useEffect(() => {
    let sort: any = [];
    headers.forEach((element: any) => {
      sort[element.field] = false;
    });
    setSortASC(sort);
  }, [headers])

  /////////////////////////////////////////

  useEffect(() => {
    setTotalColumnItems(totalData);
    let objTotal: any = {};
    totalData.map((item: any, index: any) => {
      objTotal[index] = item;
      return true;
    })
    // eslint-disable-next-line 
  }, [totalData])

  useEffect(() => {
    if (headers)
      setColumnNames(headers);
    const gridColumns = headers.map(() => {
      return 0;
    });

    setColumnWidthsObj(gridColumns.reduce((result: any, current: any, index: any) => {
      result[index] = current;
      return result;
    }, {}))
    // eslint-disable-next-line 
  }, [headers])

  const handleUpload = () => {
    const body = {
      Resources: [...checkedData],
      Synchronous: false
    }
    setUploading(true);
    uploadPatients(body)
      .then((res: any) => {
        setUploading(false)
        toast.success(`Uploaded Successfully`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        removeChecks();
      })
      .catch((error: any) => {
        console.log(error)
        setUploading(false)
        toast.error(`Uploading Failed`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        removeChecks();
      })

  }

  /////////////////////////////////////////

  const [PageSize, setPageSize] = useState<string>('10');
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * parseInt(PageSize);
    const lastPageIndex = firstPageIndex + parseInt(PageSize);
    return totalColumnItems?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, totalColumnItems, PageSize]);

  const handlePageChange = (props: any) => {
    removeChecks();
    let page = parseInt(props);
    let itemscount = (page - 1) * parseInt(PageSize);
    if (itemscount < totalColumnItems.length) {
      setCurrentPage(page);
    } else {
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    setColumnItems([...currentTableData]);
  }, [currentTableData])

  //////////////////////////////////////////// Table Item //////////////////////////////////////////////////////////

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [currentPage])

  const handleChangeWidth = (e: any, id: any) => {
    let currentwidth = columnWidthsObj[id] + e.width;
    if (columnWidthsObj[id] === 0) {
      currentwidth = minColumnWidthsObj[id] + e.width;
    }
    if (40 <= currentwidth) {
      const updateItems = {
        ...columnWidthsObj,
        [id]: currentwidth
      }
      setColumnWidthsObj(() => updateItems)
    } else {
      const updateItems = {
        ...columnWidthsObj,
        [id]: 40
      }
      setColumnWidthsObj(() => updateItems)
    }
  }

  const handleChangeMinWidth = (width: any, id: any) => {
    const updateItems = {
      ...minColumnWidthsObj,
      [id]: width
    }
    minColumnWidthsObj = updateItems;
  }

  const handleSort = (item: any, flag: boolean) => {
    setCurrentSort(item?.field);
    setSortFlag(flag);
    const items = [...totalData].sort(alphabeticallyPatient(item.tag, flag));

    let sort = sortAsc;
    sort[item.field] = !flag;
    setSortASC(sort);
    setTotalData([...items]);
  }

  useEffect(() => {
    if (sortAsc) {
      handleSort(currentsort, sortFlag);
    }
    // eslint-disable-next-line
  }, [sortAsc])

  const [parentWidth, setParentWidth] = useState<number>(0);

  const ref = useRef<any>(null);
  useEffect(() => {
    setParentWidth(ref.current ? ref.current.offsetWidth : 0)
    // eslint-disable-next-line
  }, [ref.current]);

  const handleSearch = () => {
    const body = {
      Level: "Patient",
      Limit: 100,
      Query: {
        AccessionNumber: filters.accessionNumber,
        ModalitiesInStudy: filters.modalitiesInStudy,
        PatientID: filters.patientId,
        PatientName: filters.patientName,
        StudyDescription: filters.studyDescription,
        StudyDate: filters.studyDate.replace("-", "")
      },
      Expand: true
    }
    getFilteringData(body)
      .then((res: any) => {
        let { data } = res;
        dispatch(devices.actions.getPatientData(data))
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  const handleClearFilter = () => {
    setFilters({
      patientName: "",
      patientId: "",
      studyDescription: "",
      studyDate: "",
      modalitiesInStudy: "",
      accessionNumber: ""
    })

    getDatas();
  }

  const handlePreviewItem = (id: string) => {
    window.open(`${process.env.REACT_APP_APP_URL}/stone-webviewer/index.html?patient=${id}`, "_blank")
  }

  const handleDeleteItem = (name: string, id: string) => {
    // @ts-ignore
    Swal.fire({
      text: `Do you really want to delete patient ${name}?`,
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: 'SEARCH.DELETE' }),
      cancelButtonText: intl.formatMessage({ id: 'SEARCH.CANCEL' }),
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-active-light"
      }
    }).then(async function (result: any) {
      if (result.value) {
        deletePatient(id)
          .then((res) => {
            toast.success(`Deleted Successfully`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            let tempData = totalData.filter((item: any) => item.ID !== id);
            setTotalData(() => [...tempData])
          })
          .catch((err) => {
            toast.error(`Deleting Failed`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
      } else if (result.dismiss === 'cancel') {

      }
    });
  }

  const handleUploadItem = (id: string) => {
    const body = {
      Resources: [id],
      Synchronous: false
    }
    uploadPatients(body)
      .then((res: any) => {
        toast.success(`Uploaded Successfully`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error: any) => {
        console.log(error)
        toast.error(`Uploading Failed`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })

  }

  const handleDownload = (id: string) => {
    var a = document.createElement("a");
    a.href = `${process.env.REACT_APP_APP_URL}/patients/${id}/archive`
    a.download = `${id}.zip`;
    a.click();
  }

  return (
    <div className='w-100' ref={ref} >
      <div className='pb-6'>
        <div className='d-flex justify-content-between pb-1'>
          <div className='d-flex'>
            <h2 className='fw-bolder align-items-center  text-dark'>
              {
                "Patients"
              }
            </h2>
          </div>

          {
            checkedData?.length > 0 ?
              <button onClick={handleUpload} className='btn btn-sm btn-primary ' style={{ paddingLeft: 8 }}>
                <KTSVG
                  path='/media/icons/duotune/arrows/arr078.svg'
                  className='svg-icon-5 svg-icon-gray-500  me-1'
                />
                {!uploading &&
                  <span className='indicator-label'>
                    {
                      "Upload"
                    }
                  </span>}
                {uploading && (
                  <span className='indicator-progress' style={{ display: 'block' }}>
                    {
                      intl.formatMessage({ id: 'MENU.PLEASE.WAIT' })
                    }
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
              :
              <button className='btn btn-sm btn-secondary ' disabled style={{ paddingLeft: 8 }}>
                <KTSVG
                  path='/media/icons/duotune/arrows/arr078.svg'
                  className='svg-icon-5 svg-icon-gray-500  me-1'
                />
                {!uploading &&
                  <span className='indicator-label'>
                    {
                      "Upload"
                    }
                  </span>}
                {uploading && (
                  <span className='indicator-progress' style={{ display: 'block' }}>
                    {
                      intl.formatMessage({ id: 'MENU.PLEASE.WAIT' })
                    }
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
          }

        </div>
        <div >
          <div className='d-flex justify-content-between align-items-center w-100'>
            <div className='d-flex'>
              <div className='d-flex align-items-center position-relative me-1'>
                <input
                  type='text'
                  className='form-control form-control-white form-control-sm'
                  placeholder='Patient Name'
                  value={filters.patientName}
                  onChange={(e) => setFilters((filters: any) => ({ ...filters, patientName: e.target.value }))}
                />
              </div>
              <div className='d-flex align-items-center position-relative me-1'>
                <input
                  type='text'
                  className='form-control form-control-white form-control-sm'
                  placeholder='Patient Id'
                  value={filters.patientId}
                  onChange={(e) => setFilters((filters: any) => ({ ...filters, patientId: e.target.value }))}
                />
              </div>
              <div className='d-flex align-items-center position-relative me-1'>
                <input
                  type='text'
                  className='form-control form-control-white form-control-sm'
                  placeholder='Study Description'
                  value={filters.studyDescription}
                  onChange={(e) => setFilters((filters: any) => ({ ...filters, studyDescription: e.target.value }))}
                />
              </div>
              <DateField
                name={"studyDate"}
                date={filters.studyDate}
                setFilters={setFilters}
              />
              <div className='d-flex align-items-center position-relative me-1'>
                <input
                  type='text'
                  className='form-control form-control-white form-control-sm'
                  placeholder='Modalities In Study'
                  value={filters.modalitiesInStudy}
                  onChange={(e) => setFilters((filters: any) => ({ ...filters, modalitiesInStudy: e.target.value }))}
                />
              </div>
              <div className='d-flex align-items-center position-relative me-1'>
                <input
                  type='text'
                  className='form-control form-control-white form-control-sm'
                  placeholder='Accession Number'
                  value={filters.accessionNumber}
                  onChange={(e) => setFilters((filters: any) => ({ ...filters, accessionNumber: e.target.value }))}
                />
              </div>
            </div>
            <div className='d-flex'>
              <button
                className={`btn btn-sm btn-flex btn-info fw-bolder me-1`}
                onClick={handleSearch}
              >
                <KTSVG
                  path='/media/icons/duotune/general/gen021.svg'
                  className='svg-icon-3'
                />
                {
                  "Search"
                }
              </button>
              {
                activeAdd ?
                  <button
                    className={`btn btn-outline btn-outline-info btn-sm btn-flex fw-bolder`}
                    onMouseLeave={() => setActiveAdd(false)}
                    onMouseOver={() => setActiveAdd(true)}
                    onClick={handleClearFilter}
                  >
                    {
                      "Clear Filter"
                    }
                  </button>
                  :
                  <button
                    className={`btn btn-outline btn-outline-info btn-sm btn-flex fw-bolder`}
                    style={{ color: '#7239EA', backgroundColor: '#F8F5FF' }}
                    onMouseLeave={() => setActiveAdd(false)}
                    onMouseOver={() => setActiveAdd(true)}
                    onClick={handleClearFilter}
                  >
                    {
                      "Clear Filter"
                    }
                  </button>

              }
            </div>
          </div>
        </div>
      </div>
      {
        hasIssue &&
        <div className='alert alert-danger'>
          <div className='alert-text font-weight-bold'>
            {
              intl.formatMessage({ id: 'CUSTOMER.FAIL' })
            }
          </div>
        </div>
      }

      <div className='w-100' style={{ overflow: 'auto', border: '1px solid #dfdbdb', position: 'relative' }}>
        <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-0' style={{ margin: 0 }}>
          <thead>
            <tr className='fw-bolder text-muted'>
              <th className='w-40px align-items-center justify-content-center p-lg-2'
                style={{
                  borderRight: "solid 1px #cbc8c8",
                }}
              >
                <div className='form-check form-check-sm form-check-custom form-check-solid justify-content-center mb-1 '>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    checked={checkAll}
                    onChange={toggleAllCheckedData}
                    data-kt-check='true'
                    data-kt-check-target='.widget-9-check'
                  />
                </div>
              </th>
              {
                columnNames.map((item: any, index: number) => {
                  let width = 150;
                  const definition = item.width;
                  if (definition) {
                    width = 1.5 * parseInt(definition);
                  }

                  handleChangeMinWidth(width, index);

                  return (
                    <th
                      key={index}
                      className='overflow-hidden text-left'
                      style={{
                        borderRight: "solid 1px #cbc8c8",
                        padding: '0px',
                        cursor: 'pointer',
                        position: 'relative',
                        whiteSpace: 'nowrap',
                      }}
                      onClick={() => handleSort(item, sortAsc[item.field])}
                    >
                      <Resizable
                        className="resize-content"
                        style={{ padding: '10px 6px' }}
                        size={{ width: columnWidthsObj[index] > 0 ? columnWidthsObj[index] : width, height: '' }}
                        enable={
                          {
                            "top": false,
                            "right": true,
                            "bottom": false,
                            "left": false,
                            "topRight": false,
                            "bottomRight": false,
                            "bottomLeft": false,
                            "topLeft": false
                          }
                        }
                        onResizeStop={(e, direction, ref, d) => {
                          handleChangeWidth(d, index)
                        }}
                      >
                        {
                          currentsort === item.field ?
                            <div className='d-flex justify-content-between text-primary' style={{ overflow: 'hidden' }}>
                              {item.label}
                              {
                                sortAsc[item.field] === false ?
                                  <KTSVG
                                    className="svg-icon svg-icon-1 svg-icon-primary"
                                    path="/media/icons/duotune/arrows/arr072.svg"
                                  /> :
                                  <KTSVG
                                    className="svg-icon svg-icon-1 svg-icon-primary"
                                    path="/media/icons/duotune/arrows/arr073.svg"
                                  />
                              }
                            </div> :
                            <div className='d-flex justify-content-between ' style={{ overflow: 'hidden' }}>
                              {item.label}
                              {
                                sortAsc[item.field] === false ?
                                  <KTSVG
                                    className="svg-icon svg-icon-1 svg-icon-grey"
                                    path="/media/icons/duotune/arrows/arr072.svg"
                                  /> :
                                  <KTSVG
                                    className="svg-icon svg-icon-1 svg-icon-grey"
                                    path="/media/icons/duotune/arrows/arr073.svg"
                                  />
                              }
                            </div>
                        }
                      </Resizable>
                    </th>
                  )
                })
              }
              <th className='overflow-hidden text-left'></th>
            </tr>
          </thead>
          <tbody>
            {
              columnItems?.length > 0 ?
                columnItems?.map((item: any, index: any) => {
                  return (
                    <PatientTableItem
                      key={index}
                      data={item}
                      indexing={index}
                      parentWidth={parentWidth}
                      headers={columnNames}
                      selectedRow={selectedRow}
                      setSelectedRow={setSelectedRow}
                      checkedRows={checkedData}
                      handleSelect={toggleSetting}
                      selectedStudyRow={selectedStudyRow}
                      setSelectedStudyRow={setSelectedStudyRow}
                      handleUpload={handleUploadItem}
                      handleDelete={handleDeleteItem}
                      handlePreview={handlePreviewItem}
                      handleDownload={handleDownload}
                    />
                  );
                }) : (
                  <NoDatas />
                )
            }
          </tbody>
        </table>
      </div>
      <Pagenation2
        currentPage={currentPage}
        totalCount={totalColumnItems.length}
        pageSize={PageSize}
        setPageSize={setPageSize}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export { TabContent }
