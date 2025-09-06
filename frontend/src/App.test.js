import { render, screen } from '@testing-library/react';
import App from './App';

test('renders CodefolioHub header', () => {
  render(<App />);
  const headerElements = screen.getAllByText(/CodefolioHub/i);
  expect(headerElements[0]).toBeInTheDocument();
});
