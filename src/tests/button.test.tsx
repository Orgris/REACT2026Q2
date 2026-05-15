import { render, screen } from '@testing-library/react';
import { Button } from '../components/ui/button';

import userEvent from '@testing-library/user-event';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Test Button</Button>);

    expect(
      screen.getByRole('button', { name: /test button/i })
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Test Button</Button>);

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        Test Button
      </Button>
    );

    await user.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('passes prop', () => {
    render(<Button disabled>Disabled Test Button</Button>);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('passes type attribute', () => {
    render(<Button type="submit">Submit Test Button</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Test Button</Button>);

    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
