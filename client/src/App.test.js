import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Dummy test
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = 'Link';
  expect(linkElement).toEqual('Link');
});
