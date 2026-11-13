import React from 'react';
import { Coins } from 'lucide-react';
import { BlikCoinPack } from '../types';
import { Modal } from './ui/Modal';
import { RewardButton, RewardStatus } from './rewards/RewardsUI';

interface BlikCoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuyCoins: (pack: BlikCoinPack) => Promise<boolean> | boolean;
  userCoins?: number;
}

/** Paid top-ups stay unavailable until a real payment provider confirms transactions. */
export const BlikCoinModal: React.FC<BlikCoinModalProps> = ({ isOpen, onClose, userCoins = 0 }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Doładowanie monet" size="sm" className="!rounded-2xl" footer={<RewardButton onClick={onClose} className="w-full">Zamknij</RewardButton>}>
    <div className="space-y-4">
      <RewardStatus>W przygotowaniu</RewardStatus>
      <p className="text-sm leading-relaxed text-text-primary">Doładowania BLIK nie są jeszcze dostępne.</p>
      <p className="text-sm leading-relaxed text-text-secondary">Monety możesz zdobywać za naukę i odbierając nagrody z odznak.</p>
      <p className="flex items-center gap-2 text-sm text-text-secondary border-t border-surface-border pt-4"><Coins size={18} className="text-primary" />Twoje saldo: <strong className="font-semibold text-text-primary tabular-nums">{userCoins.toLocaleString('pl-PL')}</strong></p>
    </div>
  </Modal>
);