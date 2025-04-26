import { PartyApiData } from "@/types/party.type";
import { apiClient } from ".";

export const addParty = (party: PartyApiData) =>
  apiClient("/party/add", {
    method: "POST",
    body: JSON.stringify(party),
  });
