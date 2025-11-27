import { EggFried } from "lucide-react";

function LoadingIcon () {
  return (
    <div className="flex items-center justify-center h-screen">
      <EggFried className="animate-spin w-12 h-12 text-slate-800" />
    </div>
  );
};

export default LoadingIcon;