import { CallbacksFor, MethodsOrOptions, StateFor, QueryCallbacksFor, QueryMethods, SubscriberAndCallbacksFor } from './useMethods';
declare type Actions<M extends MethodsOrOptions, Q extends QueryMethods> = {
    actions: CallbacksFor<M>;
    query: QueryCallbacksFor<Q>;
};
export declare type useCollector<M extends MethodsOrOptions, Q extends QueryMethods | null, C = null> = C extends null ? Actions<M, Q> : C & Actions<M, Q>;
export declare function useCollector<M extends MethodsOrOptions, Q extends QueryMethods | null>(store: SubscriberAndCallbacksFor<M, Q>): useCollector<M, Q>;
export declare function useCollector<M extends MethodsOrOptions, Q extends QueryMethods | null, C>(store: SubscriberAndCallbacksFor<M, Q>, collector: (state: StateFor<M>, query: Q) => C): useCollector<M, Q, C>;
export {};
