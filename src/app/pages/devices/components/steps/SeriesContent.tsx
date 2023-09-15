/* eslint-disable array-callback-return */
import React, { useState, useMemo, useEffect, useRef } from 'react'
import NoDatas from '../../../../components/NoDatas'
import { MenuComponent } from '../../../../../_metronic/assets/ts/components';
import { KTSVG } from '../../../../../_metronic/helpers'
import { Resizable } from 're-resizable';
// import * as item from '../../redux/Devicesredux'
import { alphabeticallyOther } from '../../../../../setup/utils/utils';
import Pagenation2 from '../../../../components/pagination2/Pagenation';
import SeriesTableItem from '../SeriesTableItem';


const SeriesContent = (props: any) => {
  const { totalData, setTotalData, headers } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalColumnItems, setTotalColumnItems] = useState<any[]>(totalData);
  const [columnItems, setColumnItems] = useState<any[]>([]);
  const [columnNames, setColumnNames] = useState<any[]>([]);
  const [sortAsc, setSortASC] = useState<any>();
  const [currentsort, setCurrentSort] = useState<string>("name");
  const [sortFlag, setSortFlag] = useState<boolean>(true);
  const [selectedRow, setSelectedRow] = useState<any>(null);
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

  const [parentWidth, setParentWidth] = useState<number>(0);

  const ref = useRef<any>(null);
  useEffect(() => {
    setParentWidth(ref.current ? ref.current.offsetWidth : 0)
    // eslint-disable-next-line
  }, [ref.current]);

  return (
    <div className='w-100' >
      <div className='pb-2 pt-10'>
        <div className='d-flex justify-content-between pb-1'>
            <h2 className='fw-bolder align-items-center  text-dark'>
              {
                "Patients / Study / Series"
              }
            </h2>
        </div>
      </div>

      <div className='w-100' style={{ overflow: 'auto', border: '1px solid #dfdbdb', position: 'relative' }}>
        <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-0' style={{ margin: 0 }}  ref={ref}>
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
                    <SeriesTableItem
                      key={index}
                      data={item}
                      indexing={index}
                      selectedRow={selectedRow}
                      setSelectedRow={setSelectedRow}
                      parentWidth={parentWidth}
                      headers={columnNames}
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

export { SeriesContent }
