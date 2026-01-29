import { useState, useEffect } from 'react';
import CompanySelector from './components/CompanySelector';
import PeriodSelector from './components/PeriodSelector';
import ProblemTable from './components/ProblemTable';

const DATA_BASE = 'https://raw.githubusercontent.com/literallyrounak/leetcode-company-wise-problems/main/data/';

function App() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [companyData, setCompanyData] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(DATA_BASE + 'companies.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load companies');
        return res.json();
      })
      .then(data => {
        setCompanies(data.sort());
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedCompany) return;
    setLoading(true);
    setSelectedPeriod('');
    setCompanyData({});

    fetch(DATA_BASE + `${selectedCompany}.json`)
      .then(res => {
        if (!res.ok) throw new Error('Company data not available');
        return res.json();
      })
      .then(setCompanyData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedCompany]);

  const periods = Object.keys(companyData).sort();

  const prettifyPeriod = (period) => {
    let name = period
      .replace(/\d+\.\s*/g, '')
      .replace(/_/g, ' ')
      .replace(/Thirty Days/i, '30 Days')
      .replace(/Three Months/i, '3 Months')
      .replace(/Six Months/i, '6 Months')
      .replace(/All Time/i, 'All Time')
      .replace(/past\s*(\d+)\s*days?/i, '$1 Days')
      .trim();

    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const problems = companyData[selectedPeriod] || [];

  return (
    <div className="container">
      <h1>ESPEON - Company DSA Tracker</h1>

      {loading && <div className="loading">Loading data...</div>}
      {error && <div className="error">{error}</div>}

      <div className="control-panel">
        <div className="control-panel-inner">
          <div className="control-group">
            <label htmlFor="company">Company</label>
            <CompanySelector
              companies={companies}
              selected={selectedCompany}
              onSelect={setSelectedCompany}
            />
          </div>

          {selectedCompany && periods.length > 0 && (
            <div className="control-group">
              <label htmlFor="period">Time Period</label>
              <PeriodSelector
                periods={periods}
                selected={selectedPeriod}
                onSelect={setSelectedPeriod}
                prettify={prettifyPeriod}
              />
            </div>
          )}
        </div>
      </div>

      {selectedPeriod && (
        <div className="table-wrapper">
          {problems.length > 0 ? (
            <ProblemTable problems={problems} />
          ) : (
            <div className="no-data">No problems in this timeframe.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;