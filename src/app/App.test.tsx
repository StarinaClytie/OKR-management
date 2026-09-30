import { render, screen } from '@testing-library/react';
import { App } from './App';

it('renders the generic application identity', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: 'OKR Management Platform' })).toBeInTheDocument();
});
