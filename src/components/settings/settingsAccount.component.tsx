import React from "react";
import Upload from "../upload/upload.component";
import AccountForm from "../settings-forms/AccountForm.component";
import { SettingsT } from "@/types/settings.type";
type SettingsAccountProps = {
  ownerId: number;
  url?: string | null;
  settings: SettingsT;
};

const SettingsAccount = (props: SettingsAccountProps) => {
  return (
    <>
      <Upload
        setting={props.settings}
        ownerId={props.ownerId}
        url={props.url}
      />
      <AccountForm settings={props.settings} />
    </>
  );
};

export default SettingsAccount;
