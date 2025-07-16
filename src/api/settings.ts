import { SettingsT } from "@/types/settings.type";
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
