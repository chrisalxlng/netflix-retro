/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import * as core from '@mantine/core';
import { ColorSchemeToggle } from './ColorSchemeToggle';

describe('ColorSchemeToggle component', () => {
  it('shows styles of light color scheme', () => {
    jest
      .spyOn(core, 'useMantineColorScheme')
      .mockImplementation(() => ({ colorScheme: 'light', toggleColorScheme: jest.fn() }));
    render(<ColorSchemeToggle />);
    expect(screen.getByRole('button').firstChild).toHaveClass('icon-tabler-moon-stars');
  });

  it('shows styles of dark color scheme', () => {
    jest
      .spyOn(core, 'useMantineColorScheme')
      .mockImplementation(() => ({ colorScheme: 'dark', toggleColorScheme: jest.fn() }));
    render(<ColorSchemeToggle />);
    expect(screen.getByRole('button').firstChild).toHaveClass('icon-tabler-sun');
  });
});
