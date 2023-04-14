type Props = {
  TOTAL_QUESTIONS: number;
  progressBar: boolean[];
};

const ProgressBar = ({ TOTAL_QUESTIONS, progressBar }: Props) => {
  const progressBarState = (progressBar: boolean) => {
    if (progressBar == null) return "bg-secondary-800";
    if (progressBar) {
      return "bg-green-600";
    } else {
      return "bg-primary";
    }
  };

  return (
    <div className="flex gap-1">
      {Array.from(Array(TOTAL_QUESTIONS), (e, i) => {
        return (
          <div
            key={i}
            className={`flex h-1 flex-1 ${progressBarState(progressBar[i])}`}
          />
        );
      })}
    </div>
  );
};

export default ProgressBar;
