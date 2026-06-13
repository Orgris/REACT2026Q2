import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserCard } from '../components/user-card';
import { mockUser } from './mocks';

describe('UserCard - Rendering Tests', () => {
  it('should render user name', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render user email', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('should render user age', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText('Age: 25')).toBeInTheDocument();
  });

  it('should render user gender', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText('Gender: male')).toBeInTheDocument();
  });

  it('should render user country', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText('Country: Russia')).toBeInTheDocument();
  });

  it('should render user password', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText('StrongP@ss123')).toBeInTheDocument();
  });

  it('should render "Accepted" when terms are true', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText('Accepted')).toBeInTheDocument();
    expect(screen.queryByText('Not accepted')).not.toBeInTheDocument();
  });

  it('should render "Not accepted" when terms are false', () => {
    const userWithNoTerms = { ...mockUser, terms: false };
    render(<UserCard user={userWithNoTerms} />);

    expect(screen.getByText('Not accepted')).toBeInTheDocument();
    expect(screen.queryByText('Accepted')).not.toBeInTheDocument();
  });

  it('should render avatar image with correct alt text', () => {
    render(<UserCard user={mockUser} />);

    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'base64encodedstring');
  });

  it('should render fallback avatar on image error', () => {
    render(<UserCard user={mockUser} />);

    const img = screen.getByAltText('John Doe');

    // Симулируем ошибку загрузки изображения
    img.dispatchEvent(new Event('error'));

    expect(img).toHaveAttribute(
      'src',
      'https://placehold.co/100x100/2e303a/c084fc?text=?'
    );
  });

  it('should render all labels (Email, Password, Terms & Conditions)', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Terms & Conditions:')).toBeInTheDocument();
  });

  it('should render divider lines', () => {
    render(<UserCard user={mockUser} />);

    const dividers = document.querySelectorAll('.h-px');
    expect(dividers).toHaveLength(2);
  });

  it('should have correct CSS classes on container', () => {
    const { container } = render(<UserCard user={mockUser} />);

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass(
      'flex',
      'flex-col',
      'gap-4',
      'rounded-lg',
      'border'
    );
  });
});

describe('UserCard - Different User Data', () => {
  it('should render female gender correctly', () => {
    const femaleUser = { ...mockUser, name: 'Jane Smith', gender: 'female' };
    render(<UserCard user={femaleUser} />);

    expect(screen.getByText('Gender: female')).toBeInTheDocument();
  });

  it('should render different age', () => {
    const olderUser = { ...mockUser, age: 99 };
    render(<UserCard user={olderUser} />);

    expect(screen.getByText('Age: 99')).toBeInTheDocument();
  });

  it('should render long email without breaking layout', () => {
    const longEmailUser = {
      ...mockUser,
      email: 'very.long.email.address@example.com',
    };
    render(<UserCard user={longEmailUser} />);

    expect(screen.getByText(longEmailUser.email)).toBeInTheDocument();
  });

  it('should render different country', () => {
    const otherCountryUser = { ...mockUser, country: 'Canada' };
    render(<UserCard user={otherCountryUser} />);

    expect(screen.getByText('Country: Canada')).toBeInTheDocument();
  });
});
