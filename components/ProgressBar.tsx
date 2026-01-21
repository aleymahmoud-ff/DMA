import React from 'react';

interface Props {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<Props> = ({ current, total }) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6">
      <div
        className="bg-brand-500 h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="text-xs text-right mt-1 text-slate-500">
        {Math.round(percentage)}%
      </div>
    </div>
  );
};
