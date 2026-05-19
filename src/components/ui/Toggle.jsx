import { useState, useEffect } from 'react';

export const Switch = ({ storageKey }) => {
  const [enabled, setEnabled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) {
      setEnabled(saved === 'true');
    }
  }, [storageKey]);

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    localStorage.setItem(storageKey, newState.toString());
  };

  if (!isMounted) return <div className="h-6 w-11 bg-slate-800 rounded-full animate-pulse" />;

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? 'bg-violet-600' : 'bg-slate-700'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};
