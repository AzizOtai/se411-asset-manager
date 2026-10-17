// TODO: replace the placeholder names / IDs with the real team members before submission.
export const team = [
  { name: 'Aziz Otaishan', studentId: '000000001' },
  { name: 'Team Member 2', studentId: '000000002' },
  { name: 'Team Member 3', studentId: '000000003' },
]

export default function About() {
  return (
    <section>
      <h1>About</h1>
      <p>IT Asset Manager is the SE411 (Fall 2026-27) Part 1 project: a React front-end for managing a company's computer equipment.</p>
      <h2>Team</h2>
      <table>
        <thead><tr><th>Name</th><th>Student ID</th></tr></thead>
        <tbody>{team.map((m) => <tr key={m.studentId}><td>{m.name}</td><td>{m.studentId}</td></tr>)}</tbody>
      </table>
    </section>
  )
}
