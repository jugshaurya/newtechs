import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App Heading', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn Testing/i);
  expect(linkElement).toBeInTheDocument();
});
