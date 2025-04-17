import axios from "@/clients/axios-fetch.client";

export class DogService {
    //TODO: The dog service may not be the best place for this method
    // but should eventually be moved to some sort of auth service
    static async login(name: string, email: string) {
        const response = await axios.post(
            "/auth/login",
            JSON.stringify({
                name,
                email,
            })
        );
        return response.data;
    }

    static async getDogIds(options?: {
        pageUrl?: string,
        dogBreeds?: string[],
        isNextOrPrev?: boolean,
    }) {
        const selectedBreeds = options?.dogBreeds;
        const fetchUrl = options?.pageUrl ?? "/dogs/search?";
        const isNextOrPrev = options?.isNextOrPrev;

        const params = new URLSearchParams();

        if (selectedBreeds) {
            selectedBreeds.forEach((breed) => {
                params.append('breeds[]', breed);
            });
        }

        if (!isNextOrPrev) {
            params.append('sort', 'breed:asc');
        }

        const response = await axios.get(
            `${fetchUrl}&${params.toString()}`,
        );

        return response.data;
    }

    static async getDogs(data: string[]) {
        const response = await axios.post(
            "/dogs",
            data,
        );
        return response.data;
    }

    static async getDogBreeds() {
        const response = await axios.get(
            "/dogs/breeds",
        );
        return response.data;
    }

    static async postDogMatch(selectedDogs: string[]) {
        const response = await axios.post(
            "/dogs/match",
            JSON.stringify(selectedDogs)
        );
        return response.data;
    }
}