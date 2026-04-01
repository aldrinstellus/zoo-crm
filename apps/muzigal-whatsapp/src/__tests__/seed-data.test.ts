import { describe, it, expect } from 'vitest';
import seedData from '../data/seed.json';

describe('Seed data integrity', () => {
  // ── Counts ──
  it('has 255 students', () => {
    expect(seedData.students).toHaveLength(255);
  });

  it('has 905 enquiries', () => {
    expect(seedData.enquiries).toHaveLength(905);
  });

  it('has 511 batches', () => {
    expect(seedData.batches).toHaveLength(511);
  });

  it('has 138 classes', () => {
    expect(seedData.classes).toHaveLength(138);
  });

  // ── Student field presence ──
  it('all students have StudentID', () => {
    for (const s of seedData.students) {
      expect(s.StudentID).toBeTruthy();
    }
  });

  it('all students have Name', () => {
    for (const s of seedData.students) {
      expect(s.Name).toBeTruthy();
    }
  });

  it('all students have Phone field', () => {
    for (const s of seedData.students) {
      expect(s).toHaveProperty('Phone');
    }
  });

  it('all students have Subjects', () => {
    for (const s of seedData.students) {
      expect(s.Subjects).toBeTruthy();
    }
  });

  it('all students have Active field (boolean)', () => {
    for (const s of seedData.students) {
      expect(typeof s.Active).toBe('boolean');
    }
  });

  // ── Phone format ──
  it('all non-empty phones match +91XXXXXXXXXX', () => {
    for (const s of seedData.students) {
      if (s.Phone) {
        expect(s.Phone).toMatch(/^\+91\d{10}$/);
      }
    }
  });

  // ── No duplicate StudentIDs ──
  it('no duplicate StudentIDs', () => {
    const ids = seedData.students.map((s: { StudentID: string }) => s.StudentID);
    expect(new Set(ids).size).toBe(ids.length);
  });

  // ── StudentID format ──
  it('all StudentIDs match STUD-XXXXX', () => {
    for (const s of seedData.students) {
      expect(s.StudentID).toMatch(/^STUD-\d{5}$/);
    }
  });

  // ── STUD-00001 verification ──
  it('STUD-00001 StartDate is 2025-10-09 (date fix verified)', () => {
    const stud1 = seedData.students.find((s: { StudentID: string }) => s.StudentID === 'STUD-00001');
    expect(stud1).toBeDefined();
    expect(stud1!.StartDate).toBe('2025-10-09');
  });

  it('STUD-00001 ExpiryDate is 2027-04-02', () => {
    const stud1 = seedData.students.find((s: { StudentID: string }) => s.StudentID === 'STUD-00001');
    expect(stud1!.ExpiryDate).toBe('2027-04-02');
  });

  // ── Lookups ──
  it('has 7 instruments in lookups', () => {
    expect(seedData.lookups.instruments).toHaveLength(7);
  });

  it('has 10 batchSlots in lookups', () => {
    expect(seedData.lookups.batchSlots).toHaveLength(10);
  });

  it('has 3 levels in lookups', () => {
    expect(seedData.lookups.levels).toHaveLength(3);
  });

  it('has 5 statuses in lookups', () => {
    expect(seedData.lookups.statuses).toHaveLength(5);
  });

  it('has 4 durations in lookups', () => {
    expect(seedData.lookups.durations).toHaveLength(4);
  });

  it('has 4 paymentModes in lookups', () => {
    expect(seedData.lookups.paymentModes).toHaveLength(4);
  });

  // ── Meta ──
  it('meta.generatedAt exists', () => {
    expect(seedData.meta.generatedAt).toBeTruthy();
  });

  // ── Classes uniqueness ──
  it('classes have unique Name values', () => {
    const names = seedData.classes.map((c: { Name: string }) => c.Name);
    expect(new Set(names).size).toBe(names.length);
  });
});
