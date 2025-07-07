import { apiClient, ApiResponse } from ".";
import { Item, ItemFormApiData } from "@/types/inventory.type";

export const addItem = (item: ItemFormApiData) =>
  apiClient("/inventory/add", {
    method: "POST",
    body: JSON.stringify(item),
  });

export const getAllItemsCardData = async (userId: number) => {
  try {
    const response: ApiResponse<Item[]> = await apiClient(
      "/inventory/getAllCardData",
      {
        method: "POST",
        body: JSON.stringify({ user_id: userId }),
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getItemById = async (userId: number, itemId: number) => {
  try {
    const response: ApiResponse<Item> = await apiClient("/inventory/getById", {
      method: "POST",
      body: JSON.stringify({ user_id: userId, item_id: itemId }),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
