import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Personality from '../Personality'; // Adjust the import path as necessary
import '@testing-library/jest-dom/extend-expect'; // Provides additional matchers

describe('Personality Component', () => {
  it('renders without crashing', () => {
    render(<Personality />);
    const titleElement = screen.getByText(/Personality Settings/i); // Adjust based on actual text in the component
    expect(titleElement).toBeInTheDocument();
  });

  it('displays default personality traits', () => {
    render(<Personality />);
    const traitElements = screen.getAllByTestId('trait-item'); // Assuming each trait has a data-testid="trait-item"
    expect(traitElements.length).toBeGreaterThan(0); // Adjust to match the number of default traits
    expect(traitElements[0]).toHaveTextContent('Friendly'); // Example trait
  });

  it('allows users to update a personality trait', () => {
    render(<Personality />);
    const inputElement = screen.getByPlaceholderText(/Enter new trait/i); // Assuming a placeholder in an input
    const buttonElement = screen.getByRole('button', { name: /Add Trait/i }); // Button to add traits

    fireEvent.change(inputElement, { target: { value: 'Curious' } });
    fireEvent.click(buttonElement);

    const updatedTrait = screen.getByText(/Curious/i);
    expect(updatedTrait).toBeInTheDocument();
  });

  it('handles trait removal correctly', () => {
    render(<Personality />);
    const deleteButton = screen.getByRole('button', { name: /Remove Friendly/i }); // Adjust button name dynamically
    fireEvent.click(deleteButton);

    const removedTrait = screen.queryByText(/Friendly/i);
    expect(removedTrait).not.toBeInTheDocument();
  });

  it('displays an error for invalid input', () => {
    render(<Personality />);
    const inputElement = screen.getByPlaceholderText(/Enter new trait/i);
    const buttonElement = screen.getByRole('button', { name: /Add Trait/i });

    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(buttonElement);

    const errorMessage = screen.getByText(/Invalid trait/i); // Adjust based on error messages in your component
    expect(errorMessage).toBeInTheDocument();
  });
});

