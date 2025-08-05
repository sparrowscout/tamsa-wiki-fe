import ProgressBar from './ProgressBar';

interface LoadingProcessProps {
  entire: number;
  current: number;
}

export default function LoadingProcess({ current, entire }: LoadingProcessProps) {
  return (
    <div className="flex p-5 gap-2 justify-center items-center">
      <ProgressBar percentage={(current / entire) * 100} />
      <div className="h-full">
        {current} / {entire}
      </div>
    </div>
  );
}
