import React, { FC } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { DeviceConfigPage } from "./components/DeviceConfigPage";

const DeviceWrapper: FC = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>{`Patients`}</PageTitle>
            <DeviceConfigPage  />
        </>
    )
}

export default DeviceWrapper