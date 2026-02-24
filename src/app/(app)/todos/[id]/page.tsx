// Todo detail page. Displays a single todo item with full details and edit capability.
import { PageHeader } from '@/components/layout/page-header';

interface TodoDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TodoDetailPage({ params }: TodoDetailPageProps) {
  const { id } = await params;
  return (
    <div>
      <PageHeader title={`Todo #${id}`} />
      <p className="text-muted-foreground">
        Todo details will appear here once the API is connected.
      </p>
    </div>
  );
}
