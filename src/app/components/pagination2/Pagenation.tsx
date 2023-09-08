import * as React from 'react';
import { usePagination, DOTS } from './usePagination';
import { v4 as uuid } from 'uuid';
import { useState, useEffect } from 'react';
import './select.css'
const Pagenation2 = (props: any) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        setPageSize
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    const getUid = () => {
        return uuid();
    }
    const [fristIndex, setFirstIndex] = useState<any>();
    const [lastIndex, setLastIndex] = useState<any>();

    useEffect(() => {
        let first = (currentPage - 1) * pageSize;
        let last = first + parseInt(pageSize);
        if (last > totalCount) {
            last = totalCount
        }
        setFirstIndex(first);
        setLastIndex(last)
    }, [currentPage, pageSize, totalCount])


    if (currentPage === 0 || paginationRange === undefined || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    const handleClick = (event: any) => {
        let pageNumber = event.target.name;
        onPageChange(pageNumber)
    }

    const handleChangePageSize = (event: any) => {
        setPageSize(event.target.value)
    }

    const lastPage = paginationRange[paginationRange.length - 1];

    return (
        <div className='d-flex flex-stack flex-wrap pt-10'>
            <div className='d-flex  justify-content-center align-items-center'>
                <div className='fs-6 fw-bold text-gray-700 me-2'>Showing {fristIndex + 1} to {lastIndex} of {totalCount} rows</div>
                <div className='fs-6 fw-bold text-gray-700'>
                    <select
                        className='form-select  form-select-sm selecter'
                        value={pageSize}
                        name='pageSize'
                        style={{ padding: '3px', fontSize: '13px', fontWeight: 100, minWidth: '50px' }}
                        onChange={handleChangePageSize}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>

            <ul className='pagination'>
                <li className='page-item previous'>
                    <button
                        className='page-link'
                        onClick={onPrevious}
                        disabled={currentPage === 1}
                    >
                        <i className='previous'></i>
                    </button>
                </li>
                {paginationRange?.map(pageNumber => {
                    if (pageNumber === DOTS) {
                        return <li className="page-item" key={getUid()}>
                            <button
                                className='page-link'
                                disabled={true}
                            >
                                &#8230;
                            </button>

                        </li>;
                    }
                    let num = parseInt(pageNumber);
                    let current = parseInt(currentPage)
                    return (
                        <li className={`page-item ${num === current ? 'active' : ''}`} key={getUid()}>
                            <button
                                className='page-link'
                                name={pageNumber}
                                onClick={handleClick}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    );
                })}

                <li className='page-item next'>
                    <button
                        className='page-link'
                        onClick={onNext}
                        disabled={currentPage === lastPage}
                    >
                        <i className='next'></i>
                    </button>
                </li>
            </ul>
        </div >
    )
}

export default Pagenation2