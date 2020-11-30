/// <reference types="react" />
import { QueryCallbacksFor } from '@craftjs/utils';
import { Placement } from './events';
import { Nodes, NodeEventTypes, NodeId } from './nodes';
import { QueryMethods } from '../editor/query';
import { EditorStore } from '../editor/store';
import { useInternalEditorReturnType } from '../editor/useInternalEditor';
import { CoreEventHandlers } from '../events';
export declare type Options = {
    onRender: React.ComponentType<{
        render: React.ReactElement;
    }>;
    onNodesChange: (query: QueryCallbacksFor<typeof QueryMethods>) => void;
    resolver: Resolver;
    enabled: boolean;
    indicator: Record<'success' | 'error', string>;
    handlers: (store: EditorStore) => CoreEventHandlers;
};
export declare type Resolver = Record<string, string | React.ElementType>;
export interface Indicator {
    placement: Placement;
    error: string | false;
}
export declare type EditorEvents = Record<NodeEventTypes, NodeId | null> & {
    indicator: Indicator | null;
};
export declare type EditorState = {
    nodes: Nodes;
    events: EditorEvents;
    options: Options;
    handlers: CoreEventHandlers;
};
export declare type ConnectedEditor<S = null> = useInternalEditorReturnType<S>;
