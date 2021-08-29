import { render, screen } from '@testing-library/react';
import EthereumIcon from '@components/Icons/EthereumIcon/EthereumIcon';
import EmptyState from './EmptyState';

describe('render empty state component with right props', () => {
  beforeEach(() => {
    render(
      <EmptyState
        title="Title"
        description="description"
        linkName="Create new"
        linkUrl="/"
      >
        <EthereumIcon className="h-5 w-5" />
      </EmptyState>
    );
  });

  it('renders the title correctly', () => {
    const title = screen.getByRole('heading', { name: /title/i });
    expect(title).toBeInTheDocument();
  });

  it('renders the description correctly', () => {
    const description = screen.getByText(/description/i);
    expect(description).toBeInTheDocument();
  });

  it('renders the button correctly', () => {
    const button = screen.getByRole('link', { name: /create/i });
    expect(button).toBeInTheDocument();
  });
});
