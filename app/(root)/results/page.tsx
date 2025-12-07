// results/page.tsx

import dynamic from "next/dynamic";

// Dynamically import the component, disabling SSR
const ResultsPageClient = dynamic(() => import("@/components/resultscomp"));

export default function ResultsPage() {
  return <ResultsPageClient />;
}
