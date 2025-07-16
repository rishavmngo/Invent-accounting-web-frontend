import React from "react";
import Upload from "../upload/upload.component";
import AccountForm from "../settings-forms/AccountForm.component";
type SettingsAccountProps = {
  ownerId: number;
  url?: string | null;
};

const SettingsAccount = (props: SettingsAccountProps) => {
  return (
    <>
      <Upload ownerId={props.ownerId} url={props.url} />
      <AccountForm />
    </>
  );
};

export default SettingsAccount;
