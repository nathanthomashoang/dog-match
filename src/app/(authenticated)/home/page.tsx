"use client";
import React from "react";
import { useDogsData } from "@/hooks/dog.hooks";
import DogsList from "@/components/DogsList";

export default function Home() {
  const { dogsData, nextPage, previousPage, totalResults, fetchData } = useDogsData();

  return (
    <div className="mx-auto flex-col items-center max-w-7xl px-4 sm:px-6 lg:px-8">
      <DogsList dogsData={dogsData} nextPage={nextPage} previousPage={previousPage} totalResults={totalResults} onFetch={fetchData} />
    </div>
  );
}
