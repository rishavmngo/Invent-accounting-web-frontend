import { Party, PartyApiData } from "@/types/party.type";
import { apiClient, ApiResponse } from ".";

export const suggestion = async (query: string) => {
  try {
    const response: ApiResponse<Party[]> = await apiClient(
      "/party/suggestions",
      {
        method: "POST",
        body: JSON.stringify({ query: query }),
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addParty = (party: PartyApiData) =>
  apiClient("/party/add", {
    method: "POST",
    body: JSON.stringify(party),
  });

export const getAllPartyCardData = async (userId: number) => {
  try {
    const response: ApiResponse<Party[]> = await apiClient(
      "/party/getAllPartiesCardData",
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

export const getPartyById = async (userId: number, partyId: number) => {
  try {
    const response: ApiResponse<Party> = await apiClient("/party/getById", {
      method: "POST",
      body: JSON.stringify({ user_id: userId, party_id: partyId }),
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
