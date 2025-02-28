/* eslint-disable array-callback-return */
import React, { useState, useMemo, useEffect } from 'react'
import NoDatas from '../../../../components/NoDatas'
import { MenuComponent } from '../../../../../_metronic/assets/ts/components';
import { KTSVG } from '../../../../../_metronic/helpers'
import { Resizable } from 're-resizable';
// import * as item from '../../redux/Devicesredux'
import { alphabeticallyOther } from '../../../../../setup/utils/utils';
import ImageTableItem from '../ImageTableItem';
import Pagenation from '../../../../components/pagination/Pagenation';
import { deleteInstance, uploadPatients } from '../../redux/DevicesCRUD';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImagesContent = (props: any) => {
  const { totalData, setTotalData, headers } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalColumnItems, setTotalColumnItems] = useState<any[]>(totalData);
  const [columnItems, setColumnItems] = useState<any[]>([]);
  const [columnNames, setColumnNames] = useState<any[]>([]);
  const [sortAsc, setSortASC] = useState<any>();
  const [currentsort, setCurrentSort] = useState<any>(headers[0]);
  const [sortFlag, setSortFlag] = useState<boolean>(true);

  const [columnWidthsObj, setColumnWidthsObj] = useState<any>({});
  let minColumnWidthsObj: any = {};

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
    setCurrentSort(item.field);
    setSortFlag(flag);
    const items = [...totalData].sort(alphabeticallyOther(item.tag, flag));

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

  const handlePreviewItem = (id: string) => {
    window.open(`${process.env.REACT_APP_APP_URL}/instances/${id}/preview`, "_blank")
  }

  const handleDeleteItem = (name: string, id: string) => {
    // @ts-ignore
    Swal.fire({
      text: `Do you really want to delete instance ${name}?`,
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-active-light"
      }
    }).then(async function (result: any) {
      if (result.value) {
        deleteInstance(id)
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
    a.href = `${process.env.REACT_APP_APP_URL}/instances/${id}/file`
    a.download = `${id}.zip`;
    a.click();
  }

  return (
    <div style={{ paddingRight: 20}} >
      <div className='pb-0 pt-3'>
        <div className='d-flex justify-content-between'>
          <div className='d-flex'>
            <h2 className='fw-bolder align-items-center  text-dark'>
              {
                "Patient / Study / Series / Image"
              }
            </h2>
          </div>
        </div>
      </div>
      <div className='w-100' style={{ overflow: 'auto', border: '1px solid #dfdbdb' }}>
        <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-0' style={{margin: 0}}>
          <thead>
            <tr className='fw-bolder text-muted'>
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
                    <ImageTableItem
                      key={index}
                      data={item}
                      indexing={index}
                      headers={columnNames}
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
      <Pagenation
        currentPage={currentPage}
        totalCount={totalColumnItems.length}
        pageSize={PageSize}
        setPageSize={setPageSize}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export { ImagesContent }
