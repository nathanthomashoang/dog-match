import React from "react";
import { Dog } from "@/types/dog";
import Image from "next/image";
import { useMatchDogId, useDogBreedData } from "@/hooks/dog.hooks";
import { useRouter } from "next/navigation";

interface IDogsListProps {
  dogsData: Dog[];
  nextPage: string;
  previousPage: string;
  totalResults: number;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  onFetch: (options: any) => Promise<void>;
}

const DogsList = ({
  dogsData,
  nextPage,
  previousPage,
  totalResults,
  onFetch,
}: IDogsListProps) => {
  const router = useRouter();
  const { fetchMatchId, matchDogIdData } = useMatchDogId();
  const { dogBreedData } = useDogBreedData();
  const [data, setData] = React.useState<Dog[]>(dogsData);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);

  const [selectedDogs, setSelectedDogs] = React.useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = React.useState<string[]>([]);
  const [isMatchDisabled, setIsMatchDisabled] = React.useState(true);

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const onToggleSelectDog = (dogId: string, event: any) => {
    const { checked } = event.target;

    if (checked) {
      setSelectedDogs([
        ...selectedDogs,
        dogId
      ]);
    } else {
      setSelectedDogs(selectedDogs.filter((id: string) => id !== dogId));
    }
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const onToggleSelectBreed = (breedName: string, event: any) => {
    const { checked } = event.target;

    if (checked) {
      setSelectedBreeds([
        ...selectedBreeds,
        breedName
      ]);
    } else {
      setSelectedBreeds(selectedBreeds.filter((breed: string) => breed !== breedName));
    }
  }


  React.useEffect(() => {
    if (dogsData.length > 0) {
      setData(dogsData);
    }

  }, [dogsData]);

  React.useEffect(() => {
    if (totalResults > 0) {
      setTotalPages(Math.ceil(totalResults / 25));
    }

  }, [totalResults]);

  React.useEffect(() => {
    if (selectedDogs.length > 0) {
      setIsMatchDisabled(false);
    } else {
      setIsMatchDisabled(true);
    }

  }, [selectedDogs]);

  React.useEffect(() => {
    if (matchDogIdData) {
      const queryParams = new URLSearchParams({ id: matchDogIdData })
      router.push(
        `/match?${queryParams.toString()}`,
      );
    }
  }, [matchDogIdData, router]);

  const onClickPage = (pageUrl: string, pageNumber: number, isNextOrPrev: boolean = false) => {
    onFetch({
      pageUrl,
      breeds: selectedBreeds,
      isNextOrPrev,
    });
    setCurrentPage(pageNumber);
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMatchId(selectedDogs);
  }

  const onFilter = (pageUrl: string) => {
    onFetch({
      pageUrl,
      breeds: selectedBreeds,
    });
  }

  const getPageUrl = (pageNumber: number) => {
    //NOTE: I hardcoded a static 25 page size for simplicity
    const from = (pageNumber - 1) * 25;
    return `/dogs/search?size=25&from=${from}`;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center text-center">
        <h3 className="my-5 text-lg font-medium text-gray-900 dark:text-white">
          Choose Your Favorite Dogs and we will generate a match!
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="block md:hidden">
          <details className="mb-4 border border-gray-300 rounded-md dark:border-gray-600">
            <summary className="cursor-pointer bg-blue-700 text-white px-5 py-2.5 rounded-md text-sm font-medium">
              Filters
            </summary>
            <div className="p-4 bg-white dark:bg-gray-800">
              {dogBreedData?.map((breed, idx) => (
                <div key={idx} className="flex items-center mb-3" onClick={(e) => onToggleSelectBreed(breed, e)}>
                  <input
                    id={`mobile-${breed}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor={`mobile-${breed}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{breed}</label>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <button
                type="button"
                onClick={() => onFilter(getPageUrl(currentPage))}
                className="cursor-pointer w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Filter
              </button>
            </div>
          </details>
        </div>

        <div className="hidden md:block md:col-span-1">
          <div className="mb-4">
            <button
              type="button"
              onClick={() => onFilter(getPageUrl(currentPage))}
              className="w-full cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Filter
            </button>
          </div>

          {dogBreedData?.map((breed, idx) => (
            <div key={idx} className="flex items-center mb-3" onClick={(e) => onToggleSelectBreed(breed, e)}>
              <input
                id={breed}
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor={breed} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{breed}</label>
            </div>
          ))}
        </div>

        <div className="md:col-span-3">
          <form onSubmit={onSubmit} className="flex flex-col items-center">
            {isMatchDisabled ? (
              <button
                type="button"
                className="w-full sm:w-auto text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 mb-4"
                disabled
              >
                Match Me!
              </button>
            ) : (
              <input
                className="w-full sm:w-auto cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                type="submit"
                value="Match Me!"
              />
            )}

            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
              {data.length > 0 && data.map(({ id, name, age, breed, img, zip_code }) => (
                <li key={id}>
                  <input
                    type="checkbox"
                    onClick={(event) => onToggleSelectDog(id, event)}
                    id={`dog-option-${id}`}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={`dog-option-${id}`}
                    className="inline-flex flex-col items-center justify-between w-full max-w-[300px] h-[400px] p-5 mx-auto text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div className="text-lg font-semibold mb-2 text-center">{name}</div>
                    <div className="relative w-[250px] h-[250px] mb-2">
                      <Image src={img} alt={name} fill className="object-cover rounded" />
                    </div>
                    <div className="text-sm">Breed: {breed}</div>
                    <div className="text-sm">Age: {age}</div>
                    <div className="text-sm">Zip Code: {zip_code}</div>
                  </label>
                </li>
              ))}
            </ul>
          </form>
        </div>
      </div>

      {/* TODO: pagination can be more dynamic and fetch more pages */}
      <nav className="flex justify-center mt-8">
        <ul className="inline-flex flex-wrap gap-1 text-base h-10">
          {previousPage && (
            <li>
              <a
                onClick={() => onClickPage(previousPage, currentPage - 1, true)}
                className="flex items-center justify-center cursor-pointer px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
          )}

          {Array.from({ length: totalPages }).slice(0, 10).map((_, i) => {
            const pageNumber = i + 1;
            const pageUrl = getPageUrl(pageNumber);
            return (
              <li key={pageNumber}>
                <a
                  onClick={() => onClickPage(pageUrl, pageNumber)}
                  className={`flex items-center justify-center cursor-pointer px-4 h-10 leading-tight border ${currentPage === pageNumber
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                >
                  {pageNumber}
                </a>
              </li>
            );
          })}

          {nextPage && (
            <li>
              <a
                onClick={() => onClickPage(nextPage, currentPage + 1, true)}
                className="flex items-center justify-center cursor-pointer px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default DogsList;
