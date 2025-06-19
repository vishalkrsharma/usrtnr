import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const AnalyzeStatusBadge = ({ doAnalyze = false }: { doAnalyze: boolean }) => {
  return (
    <Badge className={cn('rounded-full', doAnalyze ? 'text-green-600 bg-green-600/20 border-green-600' : 'text-red-700 bg-red-700/20 border-red-700')}>
      {doAnalyze ? 'Enabled' : 'Disabled'}
    </Badge>
  );
};

export default AnalyzeStatusBadge;
