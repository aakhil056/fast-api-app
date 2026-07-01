import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Job } from "../types/Job";
import type { Company } from "../types/Company";

type Props = {
  jobs: Job[];
  companies: Company[];
  onAdd: (job: Omit<Job, "id">) => void;
  onEdit: (job: Job) => void;
  onDelete: (jobId: number) => void;
};

function JobCard({ jobs, companies, onAdd, onEdit, onDelete }: Props) {
  const [formData, setFormData] = useState({
    title: "",
    salary: "",
    description: "",
    company_id: companies.length > 0 ? companies[0].id.toString() : "",
  });
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    salary: "",
    description: "",
    company_id: companies.length > 0 ? companies[0].id.toString() : "",
  });

  const getCompanyName = (companyId: number) => {
    return companies.find((company) => company.id === companyId)?.name || "Unknown";
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleEditChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setEditFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const addJob = () => {
    if (!formData.title || !formData.salary || !formData.company_id) {
      return;
    }

    onAdd({
      name: formData.title,
      salary: Number(formData.salary),
      description: formData.description,
      company_id: Number(formData.company_id),
    });

    setFormData({
      title: "",
      salary: "",
      description: "",
      company_id: companies.length > 0 ? companies[0].id.toString() : "",
    });
  };

  const startEditing = (job: Job) => {
    setEditingJobId(job.id);
    setEditFormData({
      title: job.name,
      salary: job.salary.toString(),
      description: job.description,
      company_id: job.company_id.toString(),
    });
  };

  const cancelEditing = () => {
    setEditingJobId(null);
  };

  const saveEdit = (job: Job) => {
    onEdit({
      ...job,
      name: editFormData.title,
      salary: Number(editFormData.salary),
      description: editFormData.description,
      company_id: Number(editFormData.company_id),
    });
    setEditingJobId(null);
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div>
          <h2>Jobs</h2>
        </div>
        <span className="card-chip job-chip">Job board</span>
      </div>
      <div className="job-card-body">
        <aside className="job-aside">
          <div className="job-add-form">
            <div className="form-section-title">
              <span>New role</span>
            </div>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Job title"
            />
            <input
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Salary"
            />
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <select name="company_id" value={formData.company_id} onChange={handleChange}>
              <option value="">Select company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            <div className="form-actions">
              <button className="primary" onClick={addJob}>Add Job</button>
            </div>
          </div>
        </aside>

        <div className="job-main">
          {jobs.length === 0 ? (
            <p>No jobs available.</p>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="job-item">
                {editingJobId === job.id ? (
                  <div className="job-edit-form">
                    <input
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditChange}
                      placeholder="Job title"
                    />
                    <input
                      name="salary"
                      type="number"
                      value={editFormData.salary}
                      onChange={handleEditChange}
                      placeholder="Salary"
                    />
                    <input
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditChange}
                      placeholder="Description"
                    />
                    <select
                      name="company_id"
                      value={editFormData.company_id}
                      onChange={handleEditChange}
                    >
                      <option value="">Select company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                    <div className="form-actions">
                      <button className="primary" onClick={() => saveEdit(job)}>
                        Save
                      </button>
                      <button className="secondary" onClick={cancelEditing}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3>{job.name}</h3>
                    <div className="job-meta">
                      <span>{`Salary: $${job.salary}`}</span>
                      <span>{job.description || "No description"}</span>
                      <span>{getCompanyName(job.company_id)}</span>
                    </div>
                    <div className="job-meta-footer">
                      <span className="job-badge">{getCompanyName(job.company_id)}</span>
                      <div className="company-actions">
                        <button onClick={() => startEditing(job)}>Edit</button>
                        <button onClick={() => onDelete(job.id)}>Delete</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default JobCard;

