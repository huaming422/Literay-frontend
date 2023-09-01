const Loading = (columnList: any) => {
    const array: any[] = new Array([10]);
    return (
        <>
            {
                array.map((item: any, index: any) => {
                    return (
                        <tr key={index}>
                            <td colSpan={5}>
                                <div className='d-flex align-items-center justify-content-center bg-opacity-5 h-50px'>
                                    <p className="mt-3">
                                        Please wait...&nbsp;&nbsp;
                                    </p>
                                    <div className="overlay-layer rounded ">
                                        <div
                                            className="spinner-border text-primary"
                                            role="status"
                                        >
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )
                })
            }
        </>
    )
}

export default Loading;