import { apiClient, ApiResponse } from ".";
import {
  Item,
  ItemFormApiData,
  ItemStock,
  ItemStockCreationT,
} from "@/types/inventory.type";

export const adjustStock = (stock: ItemStockCreationT) =>
  apiClient("/inventory/adjustStock", {
    method: "POST",
    body: JSON.stringify(stock),
  });

export const addItem = (item: ItemFormApiData) =>
  apiClient("/inventory/add", {
    method: "POST",
    body: JSON.stringify(item),
  });

export const deleteItem = (data: { id: number; user_id?: number }) =>
  apiClient("/inventory/delete", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const updateItem = (item: ItemFormApiData & { id: number }) =>
  apiClient("/inventory/update", {
    method: "POST",
    body: JSON.stringify(item),
  });

export const getAllItemStock = async (itemId: number) => {
  try {
    const response: ApiResponse<ItemStock[]> = await apiClient(
      "/inventory/getAllStocks",
      {
        method: "POST",
        body: JSON.stringify({ item_id: itemId }),
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

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
