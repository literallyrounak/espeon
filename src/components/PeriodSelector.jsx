function PeriodSelector({ periods, selected, onSelect, prettify }) {
  return (
    <div style={{ marginBottom: '30px', textAlign: 'center' }}>
      <label htmlFor="period" style={{ marginRight: '12px', fontWeight: 'bold' }}>
        Time Period:
      </label>
      <select
        id="period"
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        style={{ minWidth: '220px' }}
      >
        <option value="">-- Select period --</option>
        {periods.map((period) => (
          <option key={period} value={period}>
            {prettify(period)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PeriodSelector;