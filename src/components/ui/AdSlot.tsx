export default function AdSlot({ slot }: { slot: string }) {
  return (
    <div className="ad-slot my-6" data-ad-slot={slot}>
      <div className="bg-page border border-dashed border-border rounded-lg p-4 text-center text-sm text-text-muted">
        Advertisement
      </div>
    </div>
  );
}
