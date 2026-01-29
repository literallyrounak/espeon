function CompanySelector({ companies, selected, onSelect }) {
  return (
    <div style={{ marginBottom: '30px', textAlign: 'center' }}>
      <label htmlFor="company" style={{ marginRight: '12px', fontWeight: 'bold' }}>
        Select Company:
      </label>
      <select
        id="company"
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        style={{ minWidth: '280px' }}
      >
        <option value="">-- Choose a company --</option>
        {companies.map((company) => (
          <option key={company} value={company}>
            {company}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CompanySelector;