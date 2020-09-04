import React from 'react';
import { render, waitFor } from '@testing-library/react';
import UserList from '../UserList';
import ErrorBoundary from 'components/errorBoundary';

import edges from '__mockData__/userEdges';
describe('UserList', () => {
  const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC';

  beforeAll(() => {
    // Mocking Image.prototype.src to call the onload or onerror
    // callbacks depending on the src passed to it
    Object.defineProperty(global.Image.prototype, 'src', {
      // Define the property setter
      set(src) {
        if (src === LOAD_FAILURE_SRC) {
          // Call with setTimeout to simulate async loading
          setTimeout(() => {
            this.dispatchEvent(new Event('error'));
          });
        } else {
          setTimeout(() => this.dispatchEvent(new Event('load')));
        }
      },
    });
  });

  test('renders skeleton items when expected length is longer than actual length', () => {
    const list = edges.slice(1, 6);
    const { getAllByTestId } = render(
      <UserList list={list} startPos={0} endPos={10} />,
    );
    const regular = getAllByTestId('list-item');
    const skeleton = getAllByTestId('skeleton-item');

    expect(regular.length).toBe(5);
    expect(skeleton.length).toBe(5);
  });

  test('does not render bad nodes', () => {
    const { getAllByTestId } = render(
      <UserList list={edges} startPos={0} endPos={10} />,
    );
    const regular = getAllByTestId('list-item');

    expect(regular.length).toBe(9); // instead of 10.
  });

  test('error boundary catches on bad image url', async () => {
    const originalErr = console.error;
    console.error = jest.fn();
    const list = edges.slice(1, 11);
    // quick clone to avoid effecting other tests
    const badUrlItem = JSON.parse(JSON.stringify(list[0]));
    badUrlItem.node.avatarUrl = LOAD_FAILURE_SRC;
    list[0] = badUrlItem;

    const { getByTestId } = render(
      <ErrorBoundary>
        <UserList list={list} startPos={0} endPos={10} />,
      </ErrorBoundary>,
    );

    let errorBoundary;
    await waitFor(() => {
      errorBoundary = getByTestId('error');
    });

    expect(errorBoundary).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
    console.error = originalErr;
  });
});
