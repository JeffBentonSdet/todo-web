// Todos loading state. Shows a skeleton UI while todo data is being fetched.
export default function TodosLoading() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-16 rounded-md bg-muted" />
      ))}
    </div>
  );
}
