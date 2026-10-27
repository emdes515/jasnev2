import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Brain, Target, ArrowRight, Crown, Tag, Flame, Cloud } from 'lucide-react';
import { PromotionConfig, PRO_PLANS, hasRealDiscount } from '../services/promotionService';
import { triggerHaptic } from '../utils';

interface GuestPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimPromo: (promo: PromotionConfig) => void;
  promoConfig: PromotionConfig;
}

const formatPln = (value: number) => `${value.toLocaleString('pl-PL', { minimumFractionDigits: value % 1 ? 2 : 0 })} zł`;

/**
 * Okno po pierwszej ukończonej sesji gościa.
 * Bez rabatu (domyślnie): zachęta do darmowego konta + uczciwy cennik PRO.
 * Z realną promocją z Firestore: rabat bez odliczania i bez „tylko teraz”.
 */
export function GuestPromoModal({ isOpen, onClose, onClaimPromo, promoConfig }: GuestPromoModalProps) {
  if (!isOpen) return null;

  const withDiscount = hasRealDiscount(promoConfig);

  const handleClaim = () => {
    triggerHaptic('success');
    onClaimPromo(promoConfig);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[130] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md">
        {/* Tło dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.96 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-[#0A0E17] border-t sm:border border-[#FFB800]/30 rounded-t-[32px] sm:rounded-[28px] p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,184,0,0.12)] overflow-y-auto z-10 max-h-[92vh] flex flex-col justify-between"
        >
          {/* Akcentowa linijka na górze */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D97706] via-[#FFB800] to-[#F59E0B]" />

          {/* Przycisk zamknięcia */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer z-20"
            aria-label="Zamknij okno"
          >
            <X size={18} />
          </button>

          <div>
            <div className="flex items-center gap-2 mb-3.5 pr-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/15 border border-[#FFB800]/30 text-[#FFB800] text-[10px] sm:text-[11px] font-black tracking-wider uppercase">
                {withDiscount ? <Crown size={12} className="text-[#FFB800]" /> : <Flame size={12} className="text-[#FFB800]" />}
                <span>{withDiscount ? (promoConfig.badgeText || 'Promocja') : 'Pierwsza sesja za Tobą'}</span>
              </span>
            </div>

            {/* Nagłówek */}
            <div className="text-left mb-3">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight">
                {withDiscount ? (
                  <>JASNE PRO <span className="text-[#FFB800]">-{promoConfig.discountPercent}%</span></>
                ) : (
                  promoConfig.title
                )}
              </h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {promoConfig.subtitle}
              </p>
            </div>

            {/* Korzyści darmowego konta */}
            {!withDiscount && (
              <div className="space-y-2 mb-4 text-left">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="w-8 h-8 rounded-xl bg-[#EA580C]/15 border border-[#EA580C]/30 flex items-center justify-center shrink-0 text-[#EA580C]">
                    <Flame size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white leading-tight">Seria i monety zostają z Tobą</div>
                    <div className="text-[11px] text-slate-400 leading-snug mt-0.5">Postęp z trybu gościa przenosi się na konto</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0 text-sky-400">
                    <Cloud size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white leading-tight">Telefon i komputer</div>
                    <div className="text-[11px] text-slate-400 leading-snug mt-0.5">Zaczynasz w autobusie, kończysz w domu</div>
                  </div>
                </div>
              </div>
            )}

            {/* Cennik / promocja */}
            <div className="my-3.5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#121824] to-[#0A0E17] border border-[#FFB800]/40 shadow-inner">
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#FFB800] mb-2">
                <Tag size={11} />
                <span>{withDiscount ? 'Cena z rabatem' : 'Kiedy zechcesz więcej: JASNE PRO'}</span>
              </div>

              {withDiscount ? (
                <div className="flex items-baseline flex-wrap gap-x-2 gap-y-0.5">
                  <span className="text-2xl sm:text-3xl font-display font-black text-[#FFB800] tracking-tight whitespace-nowrap">
                    {formatPln(promoConfig.discountedPriceMonthly)}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">/ miesiąc</span>
                  <span className="text-xs line-through text-slate-500 font-bold whitespace-nowrap">
                    {formatPln(promoConfig.originalPriceMonthly)}
                  </span>
                </div>
              ) : (
                <ul className="space-y-1.5">
                  {PRO_PLANS.map(plan => (
                    <li key={plan.id} className="flex items-center justify-between gap-3 text-left">
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white leading-tight flex items-center gap-1.5">
                          {plan.name}
                          {plan.highlight && (
                            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[#FFB800]/15 text-[#FFB800] border border-[#FFB800]/30">
                              Najczęściej wybierany
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug">{plan.period}</div>
                      </div>
                      <span className="text-sm font-display font-black text-[#FFB800] whitespace-nowrap">{formatPln(plan.price)}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center gap-1 text-[10px] text-slate-300 leading-tight">
                  <Heart size={14} className="text-rose-400" />
                  <span>Nielimitowane serca</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-[10px] text-slate-300 leading-tight">
                  <Brain size={14} className="text-purple-400" />
                  <span>Egzaminator AI</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-[10px] text-slate-300 leading-tight">
                  <Target size={14} className="text-emerald-400" />
                  <span>Pełna prognoza</span>
                </div>
              </div>
            </div>
          </div>

          {/* PRZYCISKI AKCJI */}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={handleClaim}
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#FFB800] via-[#FFA000] to-[#FF8C00] hover:brightness-105 text-[#070A0F] font-display font-black text-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_0_#B37F00] active:translate-y-1 active:shadow-none min-h-[48px]"
            >
              <span>{withDiscount ? `Załóż konto z rabatem -${promoConfig.discountPercent}%` : 'Załóż darmowe konto'}</span>
              <ArrowRight size={16} strokeWidth={3} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-1.5 text-center text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Może później
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default GuestPromoModal;
