"use client";
import ResultsPageClient from "@/components/resultscomp";
import { Suspense } from "react";

export default function ResultsPage() {
  return (
    <Suspense>
      <ResultsPageClient />
    </Suspense>
  );
}
