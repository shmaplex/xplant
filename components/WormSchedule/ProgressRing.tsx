type ProgressRingProps = {
  radius: number;
  stroke: number;
  progress: number; // 0 to 100
};

export default function ProgressRing({
  radius,
  stroke,
  progress,
}: ProgressRingProps) {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#10b981"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset, transition: "stroke-dashoffset 0.35s" }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
}
