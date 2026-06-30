import axios from "axios";
import type { Company } from "../types/Company";

const API_BASE_URL = "/company/";

export const getCompanies = async (): Promise<Company[]> => {
  const response = await axios.get<Company[]>(API_BASE_URL);
  return response.data.map((company: any) => ({
    id: company.id,
    name: company.name,
    email: company.email,
    Phone: company.phone_number ?? "",
    Location: company.address ?? "",
    Jobs: [],
  }));
};
