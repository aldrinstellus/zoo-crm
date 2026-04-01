import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { mockApi } from '../__mocks__/mockApi';
import WhatsApp from '../pages/admin/whatsapp';

describe('WhatsApp page — Giri login in demo mode', () => {
  beforeEach(() => {
    localStorage.clear();
    // Simulate demo mode
    localStorage.setItem('zoo_crm_mode', 'demo');
  });

  it('Giri can login and WhatsApp page renders with data', async () => {
    // Step 1: Login as Giri
    const loginRes = await mockApi.login('giri@muzigal.com:giri123');
    expect(loginRes.status).toBe('ok');
    expect(loginRes.data.user.name).toBe('Giri');
    expect(loginRes.data.token).toBeDefined();
    
    // Store token (like the login page does)
    localStorage.setItem('zoo_crm_token', loginRes.data.token);
    localStorage.setItem('zoo_crm_user', JSON.stringify(loginRes.data.user));

    // Step 2: Render WhatsApp page
    render(
      <MemoryRouter initialEntries={['/admin/whatsapp']}>
        <Routes>
          <Route path="/admin/whatsapp" element={<WhatsApp />} />
        </Routes>
      </MemoryRouter>
    );

    // Step 3: Verify page renders
    expect(screen.getByText('Send WhatsApp Message')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();

    // Step 4: Verify data loads (9 active students)
    await waitFor(() => {
      expect(screen.getByText('9 recipients')).toBeInTheDocument();
    }, { timeout: 2000 });

    // Step 5: Try sending a broadcast
    const textarea = screen.getByPlaceholderText('Type your message here...');
    fireEvent.change(textarea, { target: { value: 'Class cancelled tomorrow' } });
    fireEvent.click(screen.getByText('Send Message'));

    await waitFor(() => {
      expect(screen.getByText(/Message sent successfully to 9 recipients/)).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
