import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  it('renders the logo', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    expect(screen.getByText('Children')).toBeInTheDocument();
    expect(screen.getByText('for Life')).toBeInTheDocument();
  });

  it('opens mobile menu when hamburger is clicked', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    const btn = screen.getByLabelText('Open menu');
    fireEvent.click(btn);
    const items = screen.getAllByText('What We Do');
    expect(items.length).toBeGreaterThan(0);
    const whoItems = screen.getAllByText('Who We Are');
    expect(whoItems.length).toBeGreaterThan(0);
  });

  it('has a mobile donate button', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>);
    const donateBtns = screen.getAllByText('Donate');
    expect(donateBtns.length).toBeGreaterThan(0);
  });
});
