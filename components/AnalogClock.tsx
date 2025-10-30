
import React from 'react';

interface AnalogClockProps {
  hour: number;
  minute: number;
  size?: number;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ hour, minute, size = 200 }) => {
  const hourAngle = (hour % 12) * 30 + minute * 0.5;
  const minuteAngle = minute * 6;

  const center = size / 2;
  const hourHandLength = size * 0.25;
  const minuteHandLength = size * 0.4;
  const clockFaceRadius = size * 0.45;

  return (
    <div className="flex justify-center items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Clock Face */}
        <circle cx={center} cy={center} r={clockFaceRadius} fill="white" stroke="#334155" strokeWidth="4" />

        {/* Hour and Minute Markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = i * 30 * (Math.PI / 180);
          const isHourMarker = i % 3 === 0;
          const markerLength = isHourMarker ? 10 : 5;
          const x1 = center + Math.sin(angle) * (clockFaceRadius - markerLength);
          const y1 = center - Math.cos(angle) * (clockFaceRadius - markerLength);
          const x2 = center + Math.sin(angle) * clockFaceRadius;
          const y2 = center - Math.cos(angle) * clockFaceRadius;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" strokeWidth={isHourMarker ? 3 : 2} />;
        })}

        {/* Hour Hand */}
        <line
          x1={center}
          y1={center}
          x2={center}
          y2={center - hourHandLength}
          stroke="#334155"
          strokeWidth="6"
          strokeLinecap="round"
          transform={`rotate(${hourAngle} ${center} ${center})`}
        />
        {/* Minute Hand */}
        <line
          x1={center}
          y1={center}
          x2={center}
          y2={center - minuteHandLength}
          stroke="#475569"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle} ${center} ${center})`}
        />
        {/* Center Dot */}
        <circle cx={center} cy={center} r="5" fill="#1e293b" />
      </svg>
    </div>
  );
};

export default AnalogClock;