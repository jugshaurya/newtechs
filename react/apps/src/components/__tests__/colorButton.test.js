import ColorButton from '../colorButton';
import { fireEvent, render, screen } from '@testing-library/react';

it('button has correct initial color', () => {
  render(<ColorButton />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toHaveStyle('background: violet;');
});

it('button has correct initial text', () => {
  render(<ColorButton />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toHaveTextContent(/Change to blue/i);
  // screen.debug();
});

it('button turns blue when clicked', () => {
  render(<ColorButton />);
  const buttonElement = screen.getByRole('button');
  fireEvent.click(buttonElement);
  expect(buttonElement).toHaveStyle('background: darkblue;');

  // screen.debug();
});

it('button has correct text after clicked', () => {
  render(<ColorButton />);
  const buttonElement = screen.getByRole('button');
  fireEvent.click(buttonElement);
  expect(buttonElement).toHaveTextContent(/Change to red/i);

  // screen.debug();
});
