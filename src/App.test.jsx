import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import { AssetProvider } from './context/AssetContext.jsx'

const setup = (path = '/') =>
  render(<MemoryRouter initialEntries={[path]}><AssetProvider><App /></AssetProvider></MemoryRouter>)

describe('App', () => {
  it('navigates via menu to About and shows team', async () => {
    setup()
    await userEvent.click(screen.getByRole('link', { name: 'About' }))
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument()
    expect(screen.getByText('Student ID')).toBeInTheDocument()
  })

  it('searches assets', async () => {
    setup('/assets')
    await userEvent.type(screen.getByLabelText('Search assets'), 'dell')
    expect(screen.getByText('Dell OptiPlex 7010')).toBeInTheDocument()
    expect(screen.queryByText('MacBook Pro 14"')).not.toBeInTheDocument()
  })

  it('adds an asset', async () => {
    setup('/assets/new')
    await userEvent.click(screen.getByRole('button', { name: 'Add asset' }))
    expect(screen.getAllByRole('alert').length).toBeGreaterThan(0)
    const [name, serial] = screen.getAllByRole('textbox')
    await userEvent.type(name, 'New Laptop')
    await userEvent.type(serial, 'NL-1')
    await userEvent.type(screen.getByLabelText(/Price/), '999')
    await userEvent.type(screen.getByLabelText(/Purchase date/), '2025-01-01')
    await userEvent.click(screen.getByRole('button', { name: 'Add asset' }))
    expect(screen.getByText('New Laptop')).toBeInTheDocument()
  })

  it('edits an asset', async () => {
    setup('/assets')
    const row = screen.getByText('Dell OptiPlex 7010').closest('tr')
    await userEvent.click(within(row).getByRole('link', { name: 'Edit' }))
    const name = screen.getByLabelText('Name')
    await userEvent.clear(name)
    await userEvent.type(name, 'Dell Renamed')
    await userEvent.click(screen.getByRole('button', { name: 'Save changes' }))
    expect(screen.getByText('Dell Renamed')).toBeInTheDocument()
  })

  it('deletes an asset after confirmation', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    setup('/assets')
    const row = screen.getByText('Brother HL-L8360').closest('tr')
    await userEvent.click(within(row).getByRole('button', { name: 'Delete' }))
    expect(screen.queryByText('Brother HL-L8360')).not.toBeInTheDocument()
  })
})
