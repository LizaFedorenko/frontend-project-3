import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('large-font');
  });

  test('renders header and navigation links', () => {
    render(<App />, {wrapper: MemoryRouter});
    expect(screen.getByText(/Solar System Project/i)).toBeInTheDocument();
    expect(screen.getByText(/Main/i)).toBeInTheDocument();
    expect(screen.getByText(/Planets/i)).toBeInTheDocument();
    expect(screen.getByText(/Stars/i)).toBeInTheDocument();
    //expect(screen.getByText(/Moon/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  test('toggle font size button switches text', () => {
    render(<App />, {wrapper: MemoryRouter});
    const button = screen.getByRole('button', {name: /larger text/i});
    fireEvent.click(button);
    expect(screen.getByRole('button', {name: /smaller text/i})).toBeInTheDocument();
  });

  test('saves font size to localStorage and updates class', () => {
    render(<App />, {wrapper: MemoryRouter});
    const button = screen.getByRole('button', {name: /larger text/i});
    fireEvent.click(button);

    expect(localStorage.getItem('fontSize')).toBe('large');
    expect(document.documentElement.classList.contains('large-font')).toBe(true);

    fireEvent.click(button);
    expect(localStorage.getItem('fontSize')).toBe('normal');
    expect(document.documentElement.classList.contains('large-font')).toBe(false);
  });

  test('loads font size from localStorage on mount', () => {
    localStorage.setItem('fontSize', 'large');
    render(<App />, {wrapper: MemoryRouter});
    expect(document.documentElement.classList.contains('large-font')).toBe(true);
  });

  test('renders main page by default', () => {
    render(<App />, {wrapper: MemoryRouter});
    expect(screen.getByText(/Main Page/i)).toBeInTheDocument();
  });

  test('navigates to planets page', () => {
    render(
      <MemoryRouter initialEntries={['/planets']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Planets/i)).toBeInTheDocument();
  });
});
