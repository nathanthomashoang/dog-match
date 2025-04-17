"use client";
import React from "react";
import { useMatchDog } from "@/hooks/dog.hooks";
import { useSearchParams } from 'next/navigation';
import { redirect } from "next/navigation";

const MatchView = () => {
    const { fetchMatch, matchDogData, isLoading } = useMatchDog();

    const searchParams = useSearchParams();

    React.useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            fetchMatch(id);
        } else {
            redirect('/home');
        }
    }, [fetchMatch, searchParams])

    React.useEffect(() => {
        if (!isLoading && !matchDogData![0].name) {
            redirect('home');
        }
    }, [matchDogData, isLoading])


    return (
        <div className="flex flex-col items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="my-2">
                You have been matched with:
            </div>
            {matchDogData &&
                matchDogData.map((dog) => {
                    return (
                        <div key={dog.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="rounded-t-lg" src={dog.img} alt="" />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{dog.name}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Breed: {dog.breed}</p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Age: {dog.age}</p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Zip Code: {dog.zip_code}</p>
                                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Learn more
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    )
                })}
        </div>
    );
}

export default MatchView
