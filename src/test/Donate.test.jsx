import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Donate from '../pages/Donate';

describe('Donate', () => {
  it('renders the donation tier cards', () => {
    render(<MemoryRouter><Donate /></MemoryRouter>);
    expect(screen.getByText('Starter Support')).toBeInTheDocument();
    expect(screen.getByText('Core Care')).toBeInTheDocument();
    expect(screen.getByText('Strong Foundation')).toBeInTheDocument();
    expect(screen.getByText('Whole Home Sponsor')).toBeInTheDocument();
  });

  it('renders the frequency toggle', () => {
    render(<MemoryRouter><Donate /></MemoryRouter>);
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    expect(screen.getByText('One-off')).toBeInTheDocument();
  });
});
