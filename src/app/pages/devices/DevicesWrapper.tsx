import React, { FC } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { DeviceConfigPage } from "./components/DeviceConfigPage";

const DeviceWrapper: FC = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>{"Devices"}</PageTitle>
            <DeviceConfigPage />
        </>
    )
}

export default DeviceWrapper