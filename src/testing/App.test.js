import { render, screen } from '@testing-library/react';
import App from './components/App';

test('renders crypto data title', () => {
  render(<App />);
  const linkElement = screen.getByText(/crypto data/i);
  expect(linkElement).toBeInTheDocument();
});
