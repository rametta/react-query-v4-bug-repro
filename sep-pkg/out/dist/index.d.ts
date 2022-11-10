import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { type QueryClient, type UseMutationOptions, type UseQueryOptions, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
export declare type Pet = {
    id: number;
    name: string;
    tag?: string;
};
export declare type Pets = Pet[];
export declare type Error = {
    code: number;
    message: string;
};
export declare type AxiosConfig = {
    paramsSerializer?: AxiosRequestConfig["paramsSerializer"];
};
export declare type Config = {
    mutations?: MutationConfigs;
    axios?: AxiosConfig;
};
export declare function initialize(axios: AxiosInstance, config?: Config): {
    requests: {
        readonly listPets: (limit?: number) => Promise<Pets>;
        readonly createPets: () => Promise<unknown>;
        readonly showPetById: (petId: string) => Promise<Pet>;
    };
    queryIds: {
        readonly listPets: (limit?: number) => readonly ["listPets", number];
        readonly showPetById: (petId: string) => readonly ["showPetById", string];
    };
    queries: {
        readonly useListPets: (limit?: number, options?: Omit<UseQueryOptions<Pets, unknown, Pets, readonly ["listPets", number]>, "queryKey" | "queryFn">) => UseQueryResult<Pets, unknown>;
        readonly useShowPetById: (petId: string, options?: Omit<UseQueryOptions<Pet, unknown, Pet, readonly ["showPetById", string]>, "queryKey" | "queryFn">) => UseQueryResult<Pet, unknown>;
    };
    mutations: {
        readonly useCreatePets: (options?: Omit<UseMutationOptions<unknown, unknown, unknown, unknown>, "mutationFn">) => UseMutationResult<unknown, unknown, unknown, unknown>;
    };
};
declare function makeRequests(axios: AxiosInstance, config?: AxiosConfig): {
    readonly listPets: (limit?: number) => Promise<Pets>;
    readonly createPets: () => Promise<unknown>;
    readonly showPetById: (petId: string) => Promise<Pet>;
};
declare type MutationConfigs = {
    useCreatePets?: (queryClient: QueryClient) => Pick<UseMutationOptions<Awaited<ReturnType<ReturnType<typeof makeRequests>["createPets"]>>, unknown, unknown, unknown>, "onSuccess" | "onSettled" | "onError">;
};
export {};
