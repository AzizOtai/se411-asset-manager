import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/assets', label: 'Assets', end: true },
  { to: '/assets/new', label: 'Add Asset' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <span className="brand">💻 IT Asset Manager</span>
      <nav aria-label="Main navigation">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
