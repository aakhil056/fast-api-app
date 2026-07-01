import axios from "axios";
import type { Job } from "../types/Job";

const API_BASE_URL = "/job/";

export async function getJobs(): Promise<Job[]> {
  try {
    const response = await axios.get<Job[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}

export async function getJobById(id: number): Promise<Job> {
  try {
    const response = await axios.get<Job>(`${API_BASE_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    throw error;
  }
}

export async function createJob(job: Omit<Job, "id">): Promise<Job> {
  try {
    const response = await axios.post<Job>(API_BASE_URL, job);
    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
}

export async function updateJob(id: number, job: Job): Promise<Job> {
  try {
    const response = await axios.put<Job>(`${API_BASE_URL}${id}`, job);
    return response.data;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
}

export async function deleteJob(id: number): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}${id}`);
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
}