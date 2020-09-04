import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import UserNav from '../Nav';

const prevPage = jest.fn();
const nextPage = jest.fn();

describe('UserNav', () => {
  test('back button calls prevPage function', () => {
    const { getByTestId } = render(
      <UserNav
        prevPage={prevPage}
        nextPage={nextPage}
        prevDisabled={false}
        nextDisabled
      />,
    );
    userEvent.click(getByTestId('prevPage'));
    expect(prevPage).toHaveBeenCalled();
  });
  test('next button calls nextPage function', () => {
    const { getByTestId } = render(
      <UserNav
        prevPage={prevPage}
        nextPage={nextPage}
        prevDisabled
        nextDisabled={false}
      />,
    );
    userEvent.click(getByTestId('nextPage'));
    expect(nextPage).toHaveBeenCalled();
  });
});
