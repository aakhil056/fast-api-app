import Welcome from "./components/welcome";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CompanyCard from "./components/CompanyCard";
import JobCard from "./components/JobCard";
import { useEffect, useState } from "react";
import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "./services/companyServices";
import { getJobs, createJob, updateJob, deleteJob } from "./services/JobServices";
import type { Company } from "./types/Company";
import type { Job } from "./types/Job";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const totalCompanies = companies.length;
  const totalJobs = jobs.length;

  async function fetchData() {
    setLoading(true);
    try {
      const [companyData, jobData] = await Promise.all([getCompanies(), getJobs()]);
      setCompanies(companyData);
      setJobs(jobData);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  async function handleCreateCompany(company: Company) {
    setLoading(true);
    try {
      const created = await createCompany(company);
      setCompanies((current) => [...current, created]);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateCompany(company: Company) {
    setLoading(true);
    try {
      const updated = await updateCompany(company.id, company);
      setCompanies((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteCompany(companyId: number) {
    setLoading(true);
    try {
      await deleteCompany(companyId);
      setCompanies((current) => current.filter((item) => item.id !== companyId));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateJob(job: Omit<Job, "id">) {
    setLoading(true);
    try {
      const created = await createJob(job);
      setJobs((current) => [...current, created]);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateJob(job: Job) {
    setLoading(true);
    try {
      const updated = await updateJob(job.id, job);
      setJobs((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteJob(jobId: number) {
    setLoading(true);
    try {
      await deleteJob(jobId);
      setJobs((current) => current.filter((item) => item.id !== jobId));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="status-message">Loading...</div>;
  }
  if (error) {
    return <div className="status-message status-error">Error: {error}</div>;
  }
  return (
    <div className="app-shell">
      <NavBar />
      <main className="page-content">
        <section className="page-topbar">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1>TalentSpark overview</h1>
            <p className="page-intro">
              Centralized workspace for managing companies, job openings, and hiring operations.
            </p>
          </div>
          <div className="topbar-stats">
            <div className="topbar-card">
              <span>Companies</span>
              <strong>{totalCompanies}</strong>
            </div>
            <div className="topbar-card">
              <span>Jobs</span>
              <strong>{totalJobs}</strong>
            </div>
          </div>
          <Welcome currentTime={currentTime} />
        </section>
        <section id="companies" className="section-block">
          <div className="section-header">
            <div>
              <h2>Company directory</h2>
              <p className="section-subtitle">Quickly manage company contacts, phone, and location details.</p>
            </div>
          </div>
          <CompanyCard
            companies={companies}
            onAdd={handleCreateCompany}
            onEdit={handleUpdateCompany}
            onDelete={handleDeleteCompany}
          />
        </section>
        <section id="jobs" className="section-block">
          <div className="section-header">
            <div>
              <h2>Job listings</h2>
              <p className="section-subtitle">Track open roles, salaries, and assigned company connections.</p>
            </div>
          </div>
          <JobCard
            jobs={jobs}
            companies={companies}
            onAdd={handleCreateJob}
            onEdit={handleUpdateJob}
            onDelete={handleDeleteJob}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App