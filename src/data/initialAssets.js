export const STATUSES = ['In Use', 'In Stock', 'In Repair', 'Retired']
export const TYPES = ['Laptop', 'Desktop', 'Server', 'Monitor', 'Printer', 'Tablet']

export const initialAssets = [
  { id: 1, name: 'MacBook Pro 14"', type: 'Laptop', serialNumber: 'MBP-2024-001', assignedTo: 'Sara Alharbi', status: 'In Use', purchaseDate: '2024-02-10', price: 2399 },
  { id: 2, name: 'Dell OptiPlex 7010', type: 'Desktop', serialNumber: 'DOP-2023-014', assignedTo: 'Khalid Nasser', status: 'In Use', purchaseDate: '2023-06-21', price: 1100 },
  { id: 3, name: 'HP ProLiant DL380', type: 'Server', serialNumber: 'HPS-2022-003', assignedTo: 'Data Center', status: 'In Use', purchaseDate: '2022-11-05', price: 6500 },
  { id: 4, name: 'LG UltraWide 34"', type: 'Monitor', serialNumber: 'LGM-2024-022', assignedTo: '', status: 'In Stock', purchaseDate: '2024-04-18', price: 540 },
  { id: 5, name: 'Lenovo ThinkPad X1', type: 'Laptop', serialNumber: 'LTP-2023-031', assignedTo: 'Omar Saleh', status: 'In Repair', purchaseDate: '2023-09-02', price: 1850 },
  { id: 6, name: 'Brother HL-L8360', type: 'Printer', serialNumber: 'BRP-2020-007', assignedTo: 'Front Office', status: 'Retired', purchaseDate: '2020-01-15', price: 420 },
]
