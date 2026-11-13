import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders the PESUFOODS home page', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ success: true, canteens: [] }),
  });
  render(<BrowserRouter><App /></BrowserRouter>);
  expect(await screen.findByText(/Welcome to Our Canteen Hub/i)).toBeInTheDocument();
});
