import React, { FC } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { DeviceConfigPage } from "./components/DeviceConfigPage";

const DeviceConfigWrapper: FC = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>{"Modality Configuration"}</PageTitle>
            <DeviceConfigPage />
        </>
    )
}

export default DeviceConfigWrapper