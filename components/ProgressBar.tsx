import styled from 'styled-components';

interface ProgressBarProps {
  percentage: number;
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="w-[300px] h-full">
      <ProgressBarBase>
        <ProgressBarContent $percentage={percentage} />
      </ProgressBarBase>
    </div>
  );
}

const ProgressBarBase = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
`;

const ProgressBarContent = styled.div<{ $percentage: number }>`
  position: absolute;
  width: ${({ $percentage }) => `${$percentage}%`};
  background-color: #26d0ff;
  height: 5px;
`;
