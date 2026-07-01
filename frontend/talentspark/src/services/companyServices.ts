import axios from "axios";
import type { Company } from "../types/Company";

const API_BASE_URL = "/company/";

export async function getCompanies(): Promise<Company[]> {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data.map((company: any) => ({
      id: company.id,
      name: company.name,
      email: company.email,
      Phone: company.phone_number ?? "",
      Location: company.address ?? "",
      Jobs: company.jobs ?? [],
    }));
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
}

export async function getCompanyById(id: number): Promise<Company> {
  try {
    const response = await axios.get<Company>(`${API_BASE_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    throw error;
  }
}

export async function createCompany(company: Company): Promise<Company> {
  try {
    const payload = {
      name: company.name,
      email: company.email,
      phone_number: company.Phone,
      address: company.Location,
    };
    const response = await axios.post(API_BASE_URL, payload);
    const created = response.data;
    return {
      id: created.id,
      name: created.name,
      email: created.email,
      Phone: created.phone_number ?? "",
      Location: created.address ?? "",
      Jobs: created.jobs ?? [],
    };
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
}

export async function updateCompany(id: number, company: Company): Promise<Company> {
  try {
    const payload = {
      name: company.name,
      email: company.email,
      phone_number: company.Phone,
      address: company.Location,
    };
    const response = await axios.put(API_BASE_URL + id, payload);
    const updated = response.data;
    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      Phone: updated.phone_number ?? "",
      Location: updated.address ?? "",
      Jobs: updated.jobs ?? [],
    };
  } catch (error) {
    console.error("Error updating company:", error);
    throw error;
  }
}

export async function deleteCompany(id: number): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}${id}`);
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error;
  }
}