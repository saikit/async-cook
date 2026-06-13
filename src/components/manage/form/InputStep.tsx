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
      <h2 className="text-3xl mb-4 lg:col-span-3">
        Step {step.step} : Ingredients
      </h2>
      <div className="lg:col-span-2">{children[0]}</div>
      <h2 className="text-3xl mb-4 lg:col-span-3">
        Step {step.step} : Instructions
      </h2>
      <div>{children[1]}</div>
      <hr className="my-8 border-slate-500 border-2" />
    </>
  );
  return content;
}

export default InputStep;
