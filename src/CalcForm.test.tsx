import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CalcForm from './CalcForm';

const setup = () => {
  render(<CalcForm />);
  return {
    user: userEvent.setup(),
    og: screen.getByLabelText('OG:'),
    fg: screen.getByLabelText('FG:'),
    message: () => document.querySelector('.message')!,
  };
};

const type = async (user: ReturnType<typeof userEvent.setup>, el: HTMLElement, text: string) => {
  await user.clear(el);
  await user.type(el, text);
};

describe('CalcForm', () => {
  it('displays the default ABV', () => {
    setup();
    expect(screen.getByText('5.25%')).toBeInTheDocument();
  });

  it('recalculates when a value changes', async () => {
    const { user, og, fg } = setup();
    await type(user, og, '1.056');
    await type(user, fg, '1.015');
    expect(screen.getByText('5.38%')).toBeInTheDocument();
  });

  it.each([
    ['og', '2', 'Gravity must be 1.999 or less'],
    ['og', '0.99', 'Gravity must be greater than 0.999'],
    ['fg', '2', 'Gravity must be 1.999 or less'],
    ['fg', '0.99', 'Gravity must be greater than 0.999'],
  ] as const)('shows a message when %s is %s', async (field, value, expected) => {
    const { user, message, ...inputs } = setup();
    await type(user, inputs[field], value);
    expect(message()).toHaveTextContent(expected);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('clears the message when a valid value is entered', async () => {
    const { user, fg, message } = setup();
    await type(user, fg, '2');
    expect(message()).not.toBeEmptyDOMElement();
    await type(user, fg, '1.008');
    expect(message()).toBeEmptyDOMElement();
  });

  it('lets a field be emptied while editing', async () => {
    const { user, og } = setup();
    await user.clear(og);
    expect(og).toHaveValue(null);
  });
});
