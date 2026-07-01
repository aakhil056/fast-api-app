import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Company } from "../types/Company";

const cityOptions = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
  "San Francisco",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Washington",
];

type Props = {
  companies: Company[];
  onAdd: (company: Company) => void;
  onEdit: (company: Company) => void;
  onDelete: (companyId: number) => void;
};

function CompanyCard({ companies, onAdd, onEdit, onDelete }: Props) {
  const [editingCompanyId, setEditingCompanyId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    Phone: "",
    Location: cityOptions[0],
  });
  const [newCompany, setNewCompany] = useState({
    name: "",
    email: "",
    Phone: "",
    Location: cityOptions[0],
  });

  const startEditing = (company: Company) => {
    setEditingCompanyId(company.id);
    setFormData({
      name: company.name,
      email: company.email,
      Phone: company.Phone,
      Location: company.Location,
    });
  };

  const cancelEditing = () => {
    setEditingCompanyId(null);
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleNewChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewCompany((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const saveEdit = (company: Company) => {
    onEdit({
      ...company,
      name: formData.name,
      email: formData.email,
      Phone: formData.Phone,
      Location: formData.Location,
    });
    setEditingCompanyId(null);
  };

  const addCompany = () => {
    onAdd({
      id: 0,
      name: newCompany.name,
      email: newCompany.email,
      Phone: newCompany.Phone,
      Location: newCompany.Location,
      Jobs: [],
    });
    setNewCompany({ name: "", email: "", Phone: "", Location: "" });
  };

  return (
    <div className="company-card">
      <div className="company-card-header">
        <div>
          <h2>Companies</h2>
        </div>
        <span className="card-chip company-chip">Company list</span>
      </div>
      <div className="company-card-body">
        <aside className="company-aside">
          <div className="company-add-form">
            <h3>Add Company</h3>
            <input
              name="name"
              value={newCompany.name}
              onChange={handleNewChange}
              placeholder="Company Name"
            />
            <input
              name="email"
              value={newCompany.email}
              onChange={handleNewChange}
              placeholder="Email"
            />
            <input
              name="Phone"
              value={newCompany.Phone}
              onChange={handleNewChange}
              placeholder="Phone"
            />
            <select
              name="Location"
              value={newCompany.Location}
              onChange={handleNewChange}
            >
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <button onClick={addCompany}>Add Company</button>
          </div>
        </aside>

        <div className="company-main">
          {companies.length === 0 ? (
            <p>No companies available.</p>
          ) : (
            companies.map((company) => (
              <div key={company.id} className="company-item">
                {editingCompanyId === company.id ? (
                  <div className="company-edit-form">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Company Name"
                    />
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="Email"
                    />
                    <input
                      name="Phone"
                      value={formData.Phone}
                      onChange={handleFormChange}
                      placeholder="Phone"
                    />
                    <select
                      name="Location"
                      value={formData.Location}
                      onChange={handleFormChange}
                    >
                      {cityOptions.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <div className="form-actions">
                      <button className="primary" onClick={() => saveEdit(company)}>
                        Save
                      </button>
                      <button className="secondary" onClick={cancelEditing}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2>{company.name}</h2>
                    <div className="company-meta">
                      <span>{company.email}</span>
                      <span>{company.Phone}</span>
                      <span>{company.Location}</span>
                    </div>
                    <div className="company-meta-footer">
                      <span className="company-badge">{company.Jobs.length} jobs</span>
                      <div className="company-actions">
                        <button onClick={() => startEditing(company)}>Edit</button>
                        <button onClick={() => onDelete(company.id)}>Delete</button>
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

export default CompanyCard;