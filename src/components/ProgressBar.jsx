export default function ProgressBar({ raised, goal, className = '' }) {
  const percent = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;
  return (
    <div className={className}>
      <div className="flex justify-between items-baseline text-[11px] font-black mb-1.5">
        <span className="text-[#005c7a] uppercase tracking-wider">${raised.toLocaleString()} raised</span>
        <span className="text-gray-400">of ${goal.toLocaleString()} goal · {percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Campaign fundraising progress"
        className="h-3 bg-gray-100 rounded-full overflow-hidden"
      >
        <div className="h-full bg-[#f37021] rounded-full transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
