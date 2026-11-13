// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { clearCurriculumSources, getCurriculumSource, resolveCurriculum } from '../curriculumSource';

beforeEach(() => { localStorage.clear(); clearCurriculumSources(); });
describe('Firestore and emergency dataset precedence', () => {
  it('uses Firestore even when offline data exists, and persists only the remote result', async () => {
    const remote = vi.fn().mockResolvedValue(['cloud']);
    const offline = vi.fn().mockResolvedValue(['bundle']);
    expect(await resolveCurriculum('topics/math', remote, offline)).toEqual(['cloud']);
    expect(offline).not.toHaveBeenCalled();
    expect(getCurriculumSource('topics/math')).toBe('firestore');
    clearCurriculumSources();
    expect(await resolveCurriculum('topics/math', remote, offline)).toEqual(['cloud']);
    expect(remote).toHaveBeenCalledTimes(1);
  });
  it('uses offline data without persisting it as cloud content', async () => {
    expect(await resolveCurriculum('lesson/1', async () => { throw Error('offline'); }, async () => ['bundle'])).toEqual(['bundle']);
    expect(getCurriculumSource('lesson/1')).toBe('offline');
    expect(localStorage.length).toBe(0);
  });
  it('deduplicates concurrent reads', async () => {
    const remote = vi.fn().mockResolvedValue(['cloud']);
    const fallback = vi.fn();
    await Promise.all([resolveCurriculum('same', remote, fallback), resolveCurriculum('same', remote, fallback)]);
    expect(remote).toHaveBeenCalledTimes(1);
  });
  it('recovers with offline content after a bounded wait', async () => {
    const result = await resolveCurriculum('slow', () => new Promise(() => {}), async () => ['bundle'], 5);
    expect(result).toEqual(['bundle']);
  });
  it('preserves the last cloud copy if refreshing stale data fails', async () => {
    localStorage.setItem('jasne_content_v3_stale', JSON.stringify({ version: 3, savedAt: 0, data: ['saved cloud'] }));
    const fallback = vi.fn();
    expect(await resolveCurriculum('stale', async () => { throw Error('offline'); }, fallback)).toEqual(['saved cloud']);
    expect(fallback).not.toHaveBeenCalled();
  });
});
