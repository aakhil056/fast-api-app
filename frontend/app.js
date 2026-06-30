import Welcome from "./talentspark/src/components/welcome";
import Navbar from "./talentspark/src/components/NavBar";
import Footer from "./talentspark/src/components/Footer";
import CompanyCard from "./talentspark/src/components/CompanyCard";
import JobCard from "./talentspark/src/components/JobCard";
import { useState, useEffect } from "react";
import { getCompanies } from "./talentspark/src/services/companyServices";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companies, setCompanies] = useState([]);
  async function fetchCompanies() {
    setLoading(true);
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (error) {
      setError("Failed to fetch companies");
    } finally {
      setLoading(false);
    }
    }

    useEffect(() => {
        fetchCompanies();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div>
            <Navbar />
            <Welcome />
            <CompanyCard companies={companies} />
            <JobCard />
            <Footer />
        </div>
    );
}

export default App;