import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { useQuery, useMutation, useQueryClient, type QueryClient, type UseMutationOptions, type UseQueryOptions, type MutationFunction, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
export type Pet = {
    id: number;
    name: string;
    tag?: string;
};
export type Pets = Pet[];
export type Error = {
    code: number;
    message: string;
};
export type AxiosConfig = {
    paramsSerializer?: AxiosRequestConfig["paramsSerializer"];
};
export type Config = {
    mutations?: MutationConfigs;
    axios?: AxiosConfig;
};
export function initialize(axios: AxiosInstance, config?: Config) {
    const requests = makeRequests(axios, config?.axios);
    const queryIds = makeQueryIds();
    return {
        requests,
        queryIds,
        queries: makeQueries(requests, queryIds),
        mutations: makeMutations(requests, config?.mutations)
    };
}
function useRapiniMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(mutationFn: MutationFunction<TData, TVariables>, config?: (queryClient: QueryClient) => Pick<UseMutationOptions<TData, TError, TVariables, TContext>, "onSuccess" | "onSettled" | "onError">, options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">): UseMutationResult<TData, TError, TVariables, TContext> {
    const { onSuccess, onError, onSettled, ...rest } = options ?? {};
    const queryClient = useQueryClient();
    const conf = config?.(queryClient);
    const mutationOptions: typeof options = {
        onSuccess: (data: TData, variables: TVariables, context?: TContext) => {
            conf?.onSuccess?.(data, variables, context);
            onSuccess?.(data, variables, context);
        },
        onError: (error: TError, variables: TVariables, context?: TContext) => {
            conf?.onError?.(error, variables, context);
            onError?.(error, variables, context);
        },
        onSettled: (data: TData | undefined, error: TError | null, variables: TVariables, context?: TContext) => {
            conf?.onSettled?.(data, error, variables, context);
            onSettled?.(data, error, variables, context);
        },
        ...rest
    };
    return useMutation(mutationFn, mutationOptions);
}
function nullIfUndefined<T>(value: T): T | null {
    return typeof value === "undefined" ? null : value;
}
function makeQueryIds() {
    return {
        listPets: (limit?: number) => ["listPets", nullIfUndefined(limit)] as const,
        showPetById: (petId: string) => ["showPetById", petId] as const
    } as const;
}
function makeRequests(axios: AxiosInstance, config?: AxiosConfig) {
    return {
        listPets: (limit?: number) => axios.request<Pets>({
            method: "get",
            url: `/pets`,
            params: {
                ...(limit !== undefined ? { limit } : undefined)
            },
            paramsSerializer: config?.paramsSerializer
        }).then(res => res.data),
        createPets: () => axios.request<unknown>({
            method: "post",
            url: `/pets`
        }).then(res => res.data),
        showPetById: (petId: string) => axios.request<Pet>({
            method: "get",
            url: `/pets/${petId}`
        }).then(res => res.data)
    } as const;
}
function makeQueries(requests: ReturnType<typeof makeRequests>, queryIds: ReturnType<typeof makeQueryIds>) {
    return {
        useListPets: (limit?: number, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof requests.listPets>>, unknown, Awaited<ReturnType<typeof requests.listPets>>, ReturnType<(typeof queryIds)["listPets"]>>, "queryKey" | "queryFn">): UseQueryResult<Awaited<ReturnType<typeof requests.listPets>>, unknown> => useQuery(queryIds.listPets(limit), () => requests.listPets(limit), options),
        useShowPetById: (petId: string, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof requests.showPetById>>, unknown, Awaited<ReturnType<typeof requests.showPetById>>, ReturnType<(typeof queryIds)["showPetById"]>>, "queryKey" | "queryFn">): UseQueryResult<Awaited<ReturnType<typeof requests.showPetById>>, unknown> => useQuery(queryIds.showPetById(petId), () => requests.showPetById(petId), options)
    } as const;
}
type MutationConfigs = {
    useCreatePets?: (queryClient: QueryClient) => Pick<UseMutationOptions<Awaited<ReturnType<ReturnType<typeof makeRequests>["createPets"]>>, unknown, unknown, unknown>, "onSuccess" | "onSettled" | "onError">;
};
function makeMutations(requests: ReturnType<typeof makeRequests>, config?: Config["mutations"]) {
    return {
        useCreatePets: (options?: Omit<UseMutationOptions<Awaited<ReturnType<typeof requests.createPets>>, unknown, unknown, unknown>, "mutationFn">) => useRapiniMutation<Awaited<ReturnType<typeof requests.createPets>>, unknown, unknown>(() => requests.createPets(), config?.useCreatePets, options)
    } as const;
}
