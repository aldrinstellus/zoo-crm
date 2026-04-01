import { describe, it, expect } from 'vitest';
import { mockApi } from '../__mocks__/mockApi';

describe('mockApi', () => {
  // ── login ──
  describe('login', () => {
    it('valid demo creds return ok + token', async () => {
      const res = await mockApi.login('demo@zoo.crm:demo');
      expect(res.status).toBe('ok');
      expect('data' in res && res.data.token).toBeTruthy();
    });

    it('invalid creds return error', async () => {
      const res = await mockApi.login('bad@email.com:wrong');
      expect(res.status).toBe('error');
    });

    it('valid admin creds return ok', async () => {
      const res = await mockApi.login('aldrin@atc.xyz:admin123');
      expect(res.status).toBe('ok');
    });
  });

  // ── listStudents ──
  describe('listStudents', () => {
    it('returns 255 students', async () => {
      const res = await mockApi.listStudents();
      expect(res.data).toHaveLength(255);
    });

    it('filter subject=Piano returns subset', async () => {
      const res = await mockApi.listStudents({ subject: 'Piano' });
      expect(res.data.length).toBeGreaterThan(0);
      expect(res.data.length).toBeLessThan(255);
      for (const s of res.data) {
        expect(s.Subjects === 'Piano' || s.Instrument === 'Piano').toBe(true);
      }
    });

    it('filter search=Niketh returns matches', async () => {
      const res = await mockApi.listStudents({ search: 'Niketh' });
      expect(res.data.length).toBeGreaterThan(0);
      for (const s of res.data) {
        const match =
          s.Name.toLowerCase().includes('niketh') ||
          s.StudentID.toLowerCase().includes('niketh') ||
          s.Phone.includes('niketh') ||
          s.ContactNumber.includes('niketh');
        expect(match).toBe(true);
      }
    });
  });

  // ── listClasses ──
  describe('listClasses', () => {
    it('returns 138 classes', async () => {
      const res = await mockApi.listClasses();
      expect(res.data).toHaveLength(138);
    });
  });

  // ── listEnquiries ──
  describe('listEnquiries', () => {
    it('returns 905 enquiries', async () => {
      const res = await mockApi.listEnquiries();
      expect(res.data).toHaveLength(905);
    });

    it('filter status=Pending returns subset', async () => {
      const res = await mockApi.listEnquiries({ status: 'Pending' });
      expect(res.data.length).toBeGreaterThan(0);
      for (const e of res.data) {
        expect(e.Status).toBe('Pending');
      }
    });
  });

  // ── listBatches ──
  describe('listBatches', () => {
    it('returns 511 batches', async () => {
      const res = await mockApi.listBatches();
      expect(res.data).toHaveLength(511);
    });
  });

  // ── sendTest ──
  describe('sendTest', () => {
    it('returns ok', async () => {
      const res = await mockApi.sendTest('+919876543210', 'test');
      expect(res.status).toBe('ok');
      expect(res.success).toBe(true);
    });
  });

  // ── sendOverride ──
  describe('sendOverride', () => {
    it('all returns sent=255 (all active)', async () => {
      const res = await mockApi.sendOverride('all', '', 'msg', 'admin');
      expect(res.sent).toBe(255);
    });

    it('subject Guitar returns active Guitar count', async () => {
      const res = await mockApi.sendOverride('subject', 'Guitar', 'msg', 'admin');
      expect(res.sent).toBe(66);
    });
  });

  // ── getSettings ──
  describe('getSettings', () => {
    it('returns full AppSettings', async () => {
      const res = await mockApi.getSettings();
      expect(res.status).toBe('ok');
      expect(res.data).toHaveProperty('provider');
      expect(res.data).toHaveProperty('business');
      expect(res.data).toHaveProperty('automation');
      expect(res.data).toHaveProperty('dataSource');
    });

    it('provider has correct provider type', async () => {
      const res = await mockApi.getSettings();
      expect(res.data.provider.provider).toBe('meta');
    });
  });

  // ── testConnection ──
  describe('testConnection', () => {
    it('returns success with latencyMs', async () => {
      const res = await mockApi.testConnection();
      expect(res.status).toBe('ok');
      expect(res.data.success).toBe(true);
      expect(res.data.latencyMs).toBeDefined();
      expect(typeof res.data.latencyMs).toBe('number');
    });
  });

  // ── health ──
  describe('health', () => {
    it('returns status ok', async () => {
      const res = await mockApi.health();
      expect(res.status).toBe('ok');
      expect(res.mode).toBe('mock');
      expect(res.activeStudents).toBe(255);
    });
  });
});
