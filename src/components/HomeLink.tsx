import { House } from "lucide-react";
import { Link } from "react-router";

function HomeLink({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return <Link className=" rounded-full fixed top-2 left-2 p-2 bg-slate-200 opacity-80" to="/"><House size={size} color={color} /></Link>;
}

export default HomeLink;