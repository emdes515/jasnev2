import { describe, expect, it } from 'vitest';
import { taskProvenance } from '../taskProvenance';

describe('task provenance', () => {
  it('does not promote a decorative badge or arbitrary date to an official source', () => {
    expect(taskProvenance({ badge: 'CKE maj 2024 zad. 1' }).official).toBe(false);
    expect(taskProvenance({ source: 'Matura maj 2024 zad. 1' }).official).toBe(false);
  });
  it('requires complete metadata even for tasks marked official', () => {
    expect(taskProvenance({ isCke: true, year: 2024 }).official).toBe(false);
  });
  it('identifies a canonical exam task and includes its sheet and number', () => {
    expect(taskProvenance({ id: 'matura-maj-2024-zad-12' })).toEqual({ official: true, label: 'Zadanie CKE · maj 2024 · arkusz matura-maj-2024 · zadanie 12' });
  });
});
