import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

function ManageFooter({ buttonName }: { buttonName: string }) {
  const content = (
    <footer className=" p-4 w-full sticky bottom-0 bg-slate-200 print:hidden">
      <div className="flex justify-center gap-2">
        <Button type="submit" form="form" className="w-50S bg-slate-800">
          {buttonName}
        </Button>
        <Link to={`/manage`}>
          <Button variant="outline">Return to Manage</Button>
        </Link>
      </div>
    </footer>
  );

  return content;
}

export default ManageFooter;
