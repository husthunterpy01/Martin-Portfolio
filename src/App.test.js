import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home hero', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { level: 1, name: /martin dang/i })
  ).toBeInTheDocument();
});
