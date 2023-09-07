/* eslint-disable array-callback-return */
import React, { useState, useMemo, useEffect } from 'react'
import Pagenation from '../../../../components/pagination/Pagenation'
import NoDatas from '../../../../components/NoDatas'
import { MenuComponent } from '../../../../../_metronic/assets/ts/components';
import { useIntl } from 'react-intl';
import { KTSVG } from '../../../../../_metronic/helpers'
import Modal from 'react-modal';
import { Resizable } from 're-resizable';
import { CreateDeviceConfigModal } from '../CreateDeviceConfigModal';
import * as item from '../../redux/LocalAEConfigredux'
import { useDispatch } from 'react-redux';
import TabTableItem from '../TableItem';
import { alphabetically } from '../../../../../setup/utils/utils';


const TabContent = (props: any) => {
  const { totalData, setTotalData, headers } = props;

  const [hasIssue, setHasIssue] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalColumnItems, setTotalColumnItems] = useState<any[]>(totalData);
  const [columnItems, setColumnItems] = useState<any[]>([]);
  const [columnNames, setColumnNames] = useState<any[]>([]);
  const [checkedData, setCheckedData] = useState<number[]>([]);
  const [activeAdd, setActiveAdd] = useState<boolean>(false);
  const [sortAsc, setSortASC] = useState<any>();
  const [currentsort, setCurrentSort] = useState<string>("id");
  const [sortFlag, setSortFlag] = useState<boolean>(true);
  const [checkAll, setCheckedAll] = useState<boolean>(false);

  const [columnWidthsObj, setColumnWidthsObj] = useState<any>({});
  let minColumnWidthsObj: any = {};

  const intl = useIntl()
  const dispatch = useDispatch();

  const toggleSetting = (rowId: number, checked: boolean) => {
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
  }, [checkedData, totalColumnItems])

  const toggleAllCheckedData = (event: any) => {
    const checked = event.target.checked;
    if (checked) {
      setCheckedAll(true);
      const currentPageIds = currentTableData.map((row) => row.id);
      const newSelectedRows = Array.from(
        new Set([...checkedData, ...currentPageIds])
      );
      setCheckedData(newSelectedRows);
    } else {
      setCheckedAll(false)
      // Deselect all rows on the current page
      const currentPageIds = currentTableData.map((row) => row.id);
      const newSelectedRows = checkedData.filter(
        (rowId) => !currentPageIds.includes(rowId)
      );
      setCheckedData(newSelectedRows);
    }
  };

  useEffect(() => {
    let sort: any = [];
    headers.forEach((element: any) => {
      sort[element.field] = false;
    });

    setSortASC(sort);
  }, [headers])

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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

  /////////////////////////////////////////

  const [PageSize, setPageSize] = useState<string>('10');
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * parseInt(PageSize);
    const lastPageIndex = firstPageIndex + parseInt(PageSize);
    return totalColumnItems?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, totalColumnItems, PageSize]);

  const handlePageChange = (props: any) => {
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

  const handleAdd = (newData: any) => {
    const json = JSON.stringify(totalData);
    const tempTotalData = JSON.parse(json);
    tempTotalData.push(newData);
    const items = [...tempTotalData].sort((a: any, b: any) => {
      return b['id'] < a['id'] ? -1 : 1;
    }
    );

    let sort = sortAsc;
    sort['id'] = false;
    setSortFlag(false);
    setSortASC(sort);
    setCurrentSort('id');
    setTotalData([...items]);
    dispatch(item.actions.setDeviceConfigSettingData(items));
  }

  const handleEdit = (editData: any) => {
    const json = JSON.stringify(totalData);
    const tempTotalData = JSON.parse(json);
    const objIndex = tempTotalData.findIndex(((obj: any) => obj.id === editData.id));
    tempTotalData[objIndex] = editData;
    setTotalData(() => [...tempTotalData])
    dispatch(item.actions.setDeviceConfigSettingData(tempTotalData));
  }

  const handleDelete = (id: string) => {
    let tempData = totalData.filter((item: any) => item.id !== id);
    setTotalData(() => [...tempData])
  }

  const handleDeleteMany = () => {

  }

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

  const handleSort = (field: string, flag: boolean) => {
    setCurrentSort(field);
    setSortFlag(flag);
    const items = [...totalData].sort(alphabetically(field, flag));

    let sort = sortAsc;
    sort[field] = !flag;
    setSortASC(sort);
    setTotalData([...items]);
  }

  useEffect(() => {
    if (sortAsc) {
      handleSort(currentsort, sortFlag);
    }
    // eslint-disable-next-line
  }, [sortAsc])

  const customStyles = {
    content: {
      backgroundColor: 'transparent',
      display: 'flex',
      border: 'none',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: '100%',
      minHeight: '100%',
      padding: 0
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.4)',
      zIndex: 920
    }
  };

  return (
    <div className='w-100' >
      <div className='pb-6'>
        <div className='d-flex justify-content-between'>
          <div className='d-flex'>
            <h2 className='fw-bolder align-items-center  text-dark'>
              {
                intl.formatMessage({ id: 'MENU.DEVICE.CONFIGURATION' })
              }
            </h2>
          </div>

          <div >
            {
              checkedData.length > 0 ?
                <div className='d-flex justify-content-center align-items-center'>
                  <div className='fs-6 fw-bold text-gray-700 me-2'> {checkedData.length} rows</div>
                  <button onClick={handleDeleteMany} className='btn btn-sm btn-danger mr-3'>
                    {!deleting &&
                      <span className='indicator-label'>
                        {
                          intl.formatMessage({ id: 'SEARCH.DELETE' })
                        }
                      </span>}
                    {deleting && (
                      <span className='indicator-progress' style={{ display: 'block' }}>
                        {
                          intl.formatMessage({ id: 'MENU.PLEASE.WAIT' })
                        }
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
                :
                <button
                  className={`btn btn-sm btn-flex btn-light ${activeAdd ? "btn-active-primary" : ""}  fw-bolder me-1`}
                  onMouseLeave={() => setActiveAdd(false)}
                  onMouseOver={() => setActiveAdd(true)}
                  onClick={openModal}
                >
                  <KTSVG
                    path='/media/icons/duotune/arrows/arr075.svg'
                    className='svg-icon-5 svg-icon-gray-500 me-1'
                  />
                  {
                    intl.formatMessage({ id: 'MENU.ADD' })
                  }
                </button>
            }
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

      <div className='w-100' style={{ overflow: 'auto', border: '1px solid #dfdbdb' }}>
        <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4' style={{margin: 0}}>
          <thead>
            <tr className='fw-bolder text-muted'>
              <th className='w-30px'
                style={{
                  borderRight: "solid 1px #cbc8c8",
                  paddingLeft: 5
                }}
              >
                <div className='form-check form-check-sm form-check-custom form-check-solid w-30px justify-content-center'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    // value={checkAll ? 'true' : 'false'}
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
                      onClick={() => handleSort(item['field'], sortAsc[item.field])}
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
              <th className='w-40px overflow-hidden text-left'></th>
            </tr>
          </thead>
          <tbody>
            {
              columnItems?.length > 0 ?
                columnItems?.map((item: any, index: any) => {
                  return (
                    <TabTableItem
                      key={item['id']}
                      data={item}
                      indexing={index}
                      headers={columnNames}
                      handleEdit={handleEdit}
                      checkedRows={checkedData}
                      handleDelete={handleDelete}
                      handleSelect={toggleSetting}
                    />
                  );
                }) : (
                  <NoDatas />
                )
            }
          </tbody>
        </table>
      </div>
      <Pagenation
        currentPage={currentPage}
        totalCount={totalColumnItems.length}
        pageSize={PageSize}
        setPageSize={setPageSize}
        onPageChange={handlePageChange}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Edit"
      >
        <CreateDeviceConfigModal
          closeModal={closeModal}
          handleAdd={handleAdd}
          id={totalData.length + 1}
        />
      </Modal>
    </div>
  )
}

export { TabContent }
