import { useCollector, QueryCallbacksFor } from '@craftjs/utils';
import { EditorContext } from './EditorContext';
import { QueryMethods } from './query';
import { ActionMethodsWithConfig } from './store';
import { EventConnectors } from '../events/CoreEventHandlers';
import { EditorState } from '../interfaces';
export declare type EditorCollector<C> = (state: EditorState, query: QueryCallbacksFor<typeof QueryMethods>) => C;
export declare type useInternalEditorReturnType<C = null> = (C extends null ? useCollector<typeof ActionMethodsWithConfig, typeof QueryMethods> : useCollector<typeof ActionMethodsWithConfig, typeof QueryMethods, C>) & {
    inContext: boolean;
    store: EditorContext;
    connectors: EventConnectors;
};
export declare function useInternalEditor(): useInternalEditorReturnType;
export declare function useInternalEditor<C>(collector: EditorCollector<C>): useInternalEditorReturnType<C>;
