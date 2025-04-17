import MatchView from "@/components/MatchView";
import { Suspense } from 'react';

export default function Match() {
  return (
    <div>
      <Suspense fallback={<p>Loading match...</p>}>
        <MatchView />
      </Suspense>
    </div>
  );
}
