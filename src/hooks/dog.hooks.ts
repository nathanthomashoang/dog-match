"use client";
import React, { useCallback } from "react";
import { DogService } from "@/services/dog.service";
import { Dog } from "@/types/dog";

export function useLogin() {
    const [isLoginSuccessful, setIsLoginSuccessful] = React.useState(false);

    const login = async (loginData: {
        name: string,
        email: string,
    }) => {
        const { name, email } = loginData;

        try {
            await DogService.login(name, email);
            setIsLoginSuccessful(true);
        } catch (err) {
            // TODO: better error handling
            console.error(err);
        }
    }

    return { login, isLoginSuccessful };
}

export function useDogsData() {
    const [dogsData, setDogsData] = React.useState<Dog[]>([]);
    const [nextPage, setNextPage] = React.useState<string>('');
    const [previousPage, setPreviousPage] = React.useState<string>('');
    const [totalResults, setTotalResults] = React.useState<number>(0);
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchData = useCallback(async (options?:
        {
            pageUrl?: string,
            breeds?: string[],
            isNextOrPrev?: boolean
        }
    ) => {
        try {
            const pageUrl = options?.pageUrl ?? undefined;
            const dogBreeds = options?.breeds ?? undefined;
            const isNextOrPrev = options?.isNextOrPrev ?? false;
            const data = await DogService.getDogIds({
                pageUrl,
                dogBreeds,
                isNextOrPrev,
            });
            const dogIds: string[] = data.resultIds;
            setNextPage(data.next);
            setPreviousPage(data.prev);
            setTotalResults(data.total);


            const dogsData = await DogService.getDogs(dogIds);
            if (dogsData) {
                setDogsData(dogsData);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }

    }, []);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { dogsData, nextPage, previousPage, totalResults, isLoading, fetchData }
}

export function useDogBreedData() {
    const [dogBreedData, setDogBreedData] = React.useState<string[]>([]);
    const [loadingDogBreedData, setLoadingDogBreedData] = React.useState(true);

    React.useEffect(() => {
        DogService.getDogBreeds()
            .then((data) => {
                setDogBreedData(data);
            })
            .catch((err => {
                console.error(err);
            }))
            .finally(() => {
                setLoadingDogBreedData(false);
            });
    }, []);

    return { dogBreedData, loadingDogBreedData }
}

// TODO: IMPROVEMENT: update state to be grouped together for less unnecessry re-renders
export function useMatchDog() {
    // const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [matchDogData, setMatchDogData] = React.useState<Dog[] | null>(null);

    const fetchMatch = useCallback(async (dogId: string) => {
        try {
            const matchData = await DogService.getDogs([dogId]);
            if (matchData) {
                setMatchDogData(matchData);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }

    }, []);

    return { fetchMatch, isLoading, matchDogData };
}

export function useMatchDogId() {
    // const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const [matchDogIdData, setMatchDogIdData] = React.useState<any | null>(null);

    const fetchMatchId = useCallback(async (selectedDogs: string[]) => {
        try {
            const data = await DogService.postDogMatch(selectedDogs);
            const matchDogId = data.match;

            setMatchDogIdData(matchDogId);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }

    }, []);

    return { fetchMatchId, isLoading, matchDogIdData };
}