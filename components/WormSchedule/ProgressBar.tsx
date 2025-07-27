type ProgressBarProps = {
  completed: number;
  total: number;
  className?: string;
};

export default function ProgressBar({
  className,
  completed,
  total,
}: ProgressBarProps) {
  const percent = total > 0 ? (completed / total) * 100 : 0;
  return (
    <div className={`${className ? className : "mt-4"}`}>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-1 text-xs text-gray-600">
        {completed} of {total} tasks complete
      </div>
    </div>
  );
}
