import { render, screen } from '@testing-library/react';
import App from './App';

test('renders instructions text', () => {
  render(<App />);
  const linkElement = screen.getByText(/You can add up to two rectangles to the drawing canvas, the area inside the box below./i);
  expect(linkElement).toBeInTheDocument();
});
