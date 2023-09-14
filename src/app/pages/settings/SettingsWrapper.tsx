import React, { FC } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { SettingsPage } from "./components/SettingsPage";

const SettingsWrapper: FC = () => {
    return (
        <>
            <PageTitle breadcrumbs={[]}>{"Settings"}</PageTitle>
            <SettingsPage />
        </>
    )
}

export default SettingsWrapper