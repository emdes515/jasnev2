// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AchievementsSection } from '../AchievementsSection';
import { PerksVaultSection } from '../PerksVaultSection';
import { UserState } from '../../types';
import { BlikCoinModal } from '../BlikCoinModal';

vi.mock('canvas-confetti', () => ({ default: vi.fn() }));
const state = { coins: 1000, masteryTokens: 100, streakDays: 1, level: 1, perks: {}, claimedAchievements: {} } as UserState;

describe('Rewards flow', () => {
  afterEach(cleanup);
  it('does not collect payment codes or simulate a paid top-up', () => {
    const onBuyCoins = vi.fn();
    render(<BlikCoinModal isOpen onClose={vi.fn()} onBuyCoins={onBuyCoins} userCoins={123} />);
    expect(screen.getByText('Doładowania BLIK nie są jeszcze dostępne.')).toBeTruthy();
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(onBuyCoins).not.toHaveBeenCalled();
  });
  it('shows an empty claim filter and a way back to the complete list', () => {
    render(<AchievementsSection userState={state} completedTasks={[]} onClaimTier={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Do odebrania (0)' }));
    expect(screen.getByRole('status').textContent).toContain('Nie masz teraz nagród do odebrania');
    fireEvent.click(screen.getByRole('button', { name: 'Pokaż wszystkie odznaki' }));
    expect(screen.getByRole('heading', { name: 'Pierwsze zadanie' })).toBeTruthy();
  });
  it('shows the next claim even when a previous rank was already collected', () => {
    const onClaim = vi.fn();
    render(<AchievementsSection userState={{ ...state, claimedAchievements: { powers_master: 1 } }} completedTasks={Array.from({ length: 8 }, (_, i) => `math-task-${i}`)} onClaimTier={onClaim} />);
    const card = screen.getByRole('article', { name: 'Początek nauki' });
    expect(within(card).getByText('Do odebrania')).toBeTruthy();
    expect(within(card).getByText('+350 XP')).toBeTruthy();
    fireEvent.click(within(card).getByRole('button', { name: 'Odbierz nagrodę: Początek nauki' }));
    expect(onClaim).toHaveBeenCalledExactlyOnceWith('powers_master', 2);
  });
  it('waits for a purchase result and prevents duplicate purchases while pending', async () => {
    let complete!: (success: boolean) => void;
    const onBuy = vi.fn(() => new Promise<boolean>(resolve => { complete = resolve; }));
    render(<PerksVaultSection userState={state} onBuyItem={onBuy} />);
    const button = screen.getByRole('button', { name: 'Kup Ochrona serii za 200 monet' });
    fireEvent.click(button);
    fireEvent.click(button);
    expect(onBuy).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('status')).toBeNull();
    complete(true);
    await waitFor(() => expect(screen.getByRole('status').textContent).toContain('Kupiono: Ochrona serii'));
  });
  it('disables full inventory and does not sell an unimplemented avatar', () => {
    render(<PerksVaultSection userState={{ ...state, perks: { ...state.perks, streakFreezes: 2 } }} onBuyItem={vi.fn()} />);
    expect((screen.getByRole('button', { name: 'Kup Ochrona serii za 200 monet' }) as HTMLButtonElement).disabled).toBe(true);
    const avatar = screen.getByRole('article', { name: 'Złoty awatar' });
    expect(within(avatar).queryByRole('button')).toBeNull();
    expect(within(avatar).getByText('W przygotowaniu')).toBeTruthy();
  });
  it('explains unavailable prices when neither currency is sufficient', () => {
    render(<PerksVaultSection userState={{ ...state, coins: 0, masteryTokens: 0 }} onBuyItem={vi.fn()} />);
    const card = screen.getByRole('article', { name: 'Ochrona serii' });
    expect(within(card).getByText('Brakuje 35 żetonów albo 200 monet.')).toBeTruthy();
    expect(within(card).getAllByRole('button').every(button => (button as HTMLButtonElement).disabled)).toBe(true);
  });
});
