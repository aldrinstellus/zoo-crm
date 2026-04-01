import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WhatsApp from '../pages/admin/whatsapp';

describe('WhatsApp page', () => {
  it('renders the Send WhatsApp Message card', async () => {
    render(
      <MemoryRouter>
        <WhatsApp />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Send WhatsApp Message')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
    expect(screen.getByText('All Students')).toBeInTheDocument();
    expect(screen.getByText('By Class')).toBeInTheDocument();
    expect(screen.getByText('Individual')).toBeInTheDocument();
  });

  it('loads students and classes in demo mode', async () => {
    render(
      <MemoryRouter>
        <WhatsApp />
      </MemoryRouter>
    );
    
    // Wait for mock API calls to resolve
    await waitFor(() => {
      expect(screen.getByText(/recipient/)).toBeInTheDocument();
    });
  });
});
