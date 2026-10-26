import { Fragment } from 'react';
import { CheckIcon } from './PosIcons';
import type { PosStep } from '../types';

interface PosStepperProps {
  currentStep: PosStep;
  onStepClick?: (step: PosStep) => void;
}

export function PosStepper({ currentStep, onStepClick }: PosStepperProps) {
  const steps = [
    { num: 1 as PosStep, label: 'Build order' },
    { num: 2 as PosStep, label: 'Collect payment' },
    { num: 3 as PosStep, label: 'Receipt' },
  ];

  return (
    <div className="flex items-center gap-3 text-xs select-none">
      {steps.map((s, idx) => {
        const isDone = currentStep > s.num;
        const isCurrent = currentStep === s.num;

        return (
          <Fragment key={s.num}>
            <div
              onClick={() => {
                if (isDone && onStepClick) onStepClick(s.num);
              }}
              className={`flex items-center gap-1.5 font-semibold transition-colors ${
                isDone
                  ? 'text-stone-800 cursor-pointer hover:text-stone-950'
                  : isCurrent
                  ? 'text-stone-900 font-bold'
                  : 'text-stone-400'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                  isDone
                    ? 'bg-[#b83827] text-white'
                    : isCurrent
                    ? 'bg-[#b83827] text-white shadow-xs'
                    : 'bg-stone-200 text-stone-600'
                }`}
              >
                {isDone ? <CheckIcon className="w-3 h-3 text-white" /> : s.num}
              </div>
              <span>{s.label}</span>
            </div>

            {idx < steps.length - 1 && (
              <div className="w-6 h-px bg-stone-300"></div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
