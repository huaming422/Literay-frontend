import React, { FC } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { DeviceConfigPage } from "./components/DeviceConfigPage";

const LocalAEWrapper: FC = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>{"Local AE Configuration"}</PageTitle>
            <DeviceConfigPage />
        </>
    )
}

export default LocalAEWrapper