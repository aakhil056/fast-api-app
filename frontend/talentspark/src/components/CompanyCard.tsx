import type { Company } from "../types/Company";

function CompanyCard({ companies }: { companies: Company[] }) {
    return (
        <div className="company-card">
            {companies.length === 0 ? (
                <p>Loading companies...</p>
            ) : (
                companies.map((company) => (
                    <div key={company.id} className="company-item">
                        <h2>{company.name}</h2>
                        <p>Email: {company.email}</p>
                        <p>Phone: {company.Phone}</p>
                        <p>Location: {company.Location}</p>
                        <p>Jobs: {company.Jobs.length}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default CompanyCard;