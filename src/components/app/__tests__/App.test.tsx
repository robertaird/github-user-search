import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, waitFor } from '@testing-library/react';
import App from '../App';

jest.setTimeout(10000);

describe('App', () => {
  test('renders successfully', () => {
    const { getByText } = render(<App />);
    const TitleElement = getByText(/User Search/i);
    expect(TitleElement).toBeInTheDocument();
  });

  test('Retrieves results from github and renders to page', async () => {
    const { getByTestId, getByText } = render(<App />);
    const textContent = 'robertaird';
    const input = getByTestId('search-input');
    expect(input).toBeInTheDocument();
    userEvent.type(
      input.querySelector('input') as HTMLInputElement,
      textContent,
    );
    const loadingEl = getByText(/Loading/i);
    expect(loadingEl).toBeInTheDocument();
    let listEl: HTMLElement;
    await waitFor(
      () => {
        listEl = getByTestId('list-item');
      },
      {
        timeout: 5000,
      },
    );
    // false positive here, use before assignment.
    // @ts-ignore
    expect(listEl?.querySelector('a')?.innerHTML).toBe(textContent);
  });
});
