import type { StepType } from '@/types/api';

function InputStep({
  step,
  children,
}: {
  step: StepType;
  children: React.ReactNode[];
}) {
  const content = (
    <>
      <h2 className="text-3xl mb-4 lg:col-span-3">Step {step.step}</h2>
      <div className="lg:col-span-2">{children[0]}</div>
      <div>{children[1]}</div>
    </>
  );
  return content;
}

export default InputStep;
