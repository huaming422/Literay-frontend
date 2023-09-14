import React, { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { DeviceConfigPage } from "./components/DeviceConfigPage";
import { useParams } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../setup";

const DeviceWrapper: FC = () => {

    const { id } = useParams<any>();

    const columnValues: any = useSelector<RootState>(({ modalityConfig }) => modalityConfig.deviceConfigSettingColumnValues, shallowEqual) as any;
    const [devicename, setDeviceName] = useState<any[]>([]);
    useEffect(() => {
        if (columnValues) {
            const device = columnValues.filter((item: any) => item.id.toString() === id.toString());
            if (device.length > 0) {
                setDeviceName(device[0].ae_title);
            }
        }
        // eslint-disable-next-line
    }, [columnValues])

    return (
        <>
            <PageTitle breadcrumbs={[]}>{`${devicename} Devices`}</PageTitle>
            <DeviceConfigPage id={id} />
        </>
    )
}

export default DeviceWrapper