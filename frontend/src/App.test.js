import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CodefolioHub header', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', { name: /CodefolioHub/i });
  expect(headerElement).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { name: /CodefolioHub/i })).toHaveLength(1);
});
