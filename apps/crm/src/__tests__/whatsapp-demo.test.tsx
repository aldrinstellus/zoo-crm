import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WhatsApp from '../pages/admin/whatsapp';

describe('WhatsApp page in demo mode', () => {
  beforeEach(() => {
    // Set demo mode like the user would
    localStorage.setItem('zoo_crm_mode', 'demo');
  });

  it('renders all UI elements', async () => {
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
    expect(screen.getByText('Send Message')).toBeInTheDocument();
    expect(screen.getByText('Send Test')).toBeInTheDocument();
  });

  it('loads students and shows correct recipient count', async () => {
    render(
      <MemoryRouter>
        <WhatsApp />
      </MemoryRouter>
    );
    
    // Wait for mock data to load (9 active students)
    await waitFor(() => {
      expect(screen.getByText('9 recipients')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('switches to class target and shows class dropdown', async () => {
    render(
      <MemoryRouter>
        <WhatsApp />
      </MemoryRouter>
    );
    
    fireEvent.click(screen.getByText('By Class'));
    
    await waitFor(() => {
      expect(screen.getByText('Select class')).toBeInTheDocument();
    });
  });

  it('switches to individual target and shows student dropdown', async () => {
    render(
      <MemoryRouter>
        <WhatsApp />
      </MemoryRouter>
    );
    
    fireEvent.click(screen.getByText('Individual'));
    
    await waitFor(() => {
      expect(screen.getByText('Select student')).toBeInTheDocument();
    });
  });

  it('sends a broadcast message successfully', async () => {
    render(
      <MemoryRouter>
        <WhatsApp />
      </MemoryRouter>
    );
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('9 recipients')).toBeInTheDocument();
    }, { timeout: 2000 });

    // Type a message
    const textarea = screen.getByPlaceholderText('Type your message here...');
    fireEvent.change(textarea, { target: { value: 'Hello everyone!' } });
    
    // Click send
    fireEvent.click(screen.getByText('Send Message'));
    
    // Wait for success
    await waitFor(() => {
      expect(screen.getByText(/Message sent successfully/)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('sends a test message successfully', async () => {
    render(
      <MemoryRouter>
        <WhatsApp />
      </MemoryRouter>
    );
    
    // Fill in test phone
    const phoneInput = screen.getByPlaceholderText('919876543210');
    fireEvent.change(phoneInput, { target: { value: '919876543210' } });
    
    // Click send test
    fireEvent.click(screen.getByText('Send Test'));
    
    // Wait for success
    await waitFor(() => {
      expect(screen.getByText('Test message sent successfully')).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
