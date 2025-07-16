import { SettingsT, TemplateT } from "@/types/settings.type";
import { apiClient, apiClientFormData, ApiResponse } from ".";

export const getByOwnerId = async (userId: number) => {
  try {
    const response: ApiResponse<SettingsT> = await apiClient(
      "/setting/getByOwnerId",
      {
        method: "POST",
        body: JSON.stringify({ user_id: userId }),
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const uploadLogo = async (formData: FormData) =>
  apiClientFormData("/setting/upload-logo", {
    method: "POST",
    body: formData,
  });

export const getAllTemplates = async () => {
  try {
    const response: ApiResponse<TemplateT[]> = await apiClient(
      "/setting/template/getAll",
      {
        method: "POST",
        body: JSON.stringify({}),
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const update = async (setting: SettingsT) =>
  apiClient("/setting/update", {
    method: "POST",
    body: setting,
  });
