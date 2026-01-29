function ProblemTable({ problems }) {
  return (
    <table className="problems-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Difficulty</th>
          <th>Frequency (%)</th>
          <th>Acceptance (%)</th>
          <th>Topics</th>
        </tr>
      </thead>
      <tbody>
        {problems.map((prob, index) => (
          <tr key={prob.Title || index}>
            <td>{index + 1}</td>
            <td>
              <a
                href={prob.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                {prob.Title}
              </a>
            </td>
            <td className={`difficulty-${prob.Difficulty?.toLowerCase() || 'unknown'}`}>
              {prob.Difficulty || '—'}
            </td>
            <td>{prob.Frequency ? Number(prob.Frequency).toFixed(1) : '—'}</td>
            <td>{prob['Acceptance Rate'] ? (Number(prob['Acceptance Rate']) * 100).toFixed(1) : '—'}</td>
            <td>{prob.Topics || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProblemTable;