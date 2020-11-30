/// <reference types="react" />
import { SubscriberAndCallbacksFor } from '@craftjs/utils';
import { QueryMethods } from './query';
import { EditorState, Options } from '../interfaces';
export declare const editorInitialState: EditorState;
export declare const ActionMethodsWithConfig: {
    methods: (state: EditorState, query: {
        node: (id: string) => {
            isCanvas(): boolean;
            isRoot(): boolean;
            /**
             * On every undo/redo, we remove events pointing to deleted Nodes
             */
            isLinkedNode(): boolean;
            isTopLevelNode(): any;
            isDeletable(): boolean;
            isParentOfTopLevelNodes: () => boolean;
            isParentOfTopLevelCanvas(): any;
            get(): import("../interfaces").Node;
            ancestors(deep?: boolean): string[];
            descendants(deep?: boolean, includeOnly?: "linkedNodes" | "childNodes"): string[];
            linkedNodes(): string[];
            childNodes(): string[];
            isDraggable(onError?: (err: string) => void): boolean;
            isDroppable(target: string | import("../interfaces").Node, onError?: (err: string) => void): boolean;
            toSerializedNode(): import("../interfaces").SerializedNode;
            toNodeTree(includeOnly?: "linkedNodes" | "childNodes"): {
                rootNodeId: string;
                nodes: any;
            };
            decendants(deep?: boolean): any;
            isTopLevelCanvas(): boolean;
        };
        getDropPlaceholder: (source: string | import("../interfaces").Node, target: string, pos: {
            x: number;
            y: number;
        }, nodesToDOM?: (node: import("../interfaces").Node) => HTMLElement) => import("../interfaces").Indicator;
        getOptions: () => Options;
        getSerializedNodes: () => Record<string, import("../interfaces").SerializedNode>;
        serialize: () => string;
        parseReactElement: (reactElement: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)>) => {
            toNodeTree(normalize?: (node: import("../interfaces").Node, jsx: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)>) => void): import("../interfaces").NodeTree;
        };
        parseSerializedNode: (serializedNode: import("../interfaces").SerializedNode) => {
            toNode(normalize?: (node: import("../interfaces").Node) => void): import("../interfaces").Node;
        };
        parseFreshNode: (node: import("../interfaces").FreshNode) => {
            toNode(normalize?: (node: import("../interfaces").Node) => void): import("../interfaces").Node;
        };
        createNode: (reactElement: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)>, extras?: any) => any;
        getState: () => EditorState;
    } & {
        history: {
            canUndo: () => boolean;
            canRedo: () => boolean;
        };
    }) => {
        setState(cb: (state: EditorState, actions: Pick<{
            setDOM: (id: string, dom: HTMLElement) => void;
            setNodeEvent: (eventType: import("../interfaces").NodeEventTypes, id: string) => void;
            selectNode: (nodeId?: string) => void;
            clearEvents: () => void;
            setOptions: (cb: (options: Partial<Options>) => void) => void;
            setIndicator: (indicator: import("../interfaces").Indicator) => void;
            addLinkedNodeFromTree: (tree: import("../interfaces").NodeTree, parentId: string, id: string) => void;
            add: (nodeToAdd: import("../interfaces").Node | import("../interfaces").Node[], parentId: string, index?: number) => void;
            addNodeTree: (tree: import("../interfaces").NodeTree, parentId?: string, index?: number) => void;
            delete: (id: string) => void;
            deserialize: (input: string | Record<string, import("../interfaces").SerializedNode>) => void;
            move: (targetId: string, newParentId: string, index: number) => void;
            replaceNodes: (nodes: Record<string, import("../interfaces").Node>) => void;
            reset: () => void;
            setCustom: (id: string, cb: (data: any) => void) => void;
            setHidden: (id: string, bool: boolean) => void;
            setProp: (id: string, cb: (props: any) => void) => void;
        } & {
            history: {
                undo: () => void;
                redo: () => void;
                throttle: (rate?: number) => Pick<{
                    setDOM: (id: string, dom: HTMLElement) => void;
                    setNodeEvent: (eventType: import("../interfaces").NodeEventTypes, id: string) => void;
                    selectNode: (nodeId?: string) => void;
                    clearEvents: () => void;
                    setOptions: (cb: (options: Partial<Options>) => void) => void;
                    setIndicator: (indicator: import("../interfaces").Indicator) => void;
                    addLinkedNodeFromTree: (tree: import("../interfaces").NodeTree, parentId: string, id: string) => void;
                    add: (nodeToAdd: import("../interfaces").Node | import("../interfaces").Node[], parentId: string, index?: number) => void;
                    addNodeTree: (tree: import("../interfaces").NodeTree, parentId?: string, index?: number) => void;
                    delete: (id: string) => void;
                    deserialize: (input: string | Record<string, import("../interfaces").SerializedNode>) => void;
                    move: (targetId: string, newParentId: string, index: number) => void;
                    replaceNodes: (nodes: Record<string, import("../interfaces").Node>) => void;
                    reset: () => void;
                    setCustom: (id: string, cb: (data: any) => void) => void;
                    setHidden: (id: string, bool: boolean) => void;
                    setProp: (id: string, cb: (props: any) => void) => void;
                }, "setDOM" | "setNodeEvent" | "selectNode" | "clearEvents" | "setOptions" | "setIndicator" | "addLinkedNodeFromTree" | "add" | "addNodeTree" | "delete" | "deserialize" | "move" | "replaceNodes" | "reset" | "setCustom" | "setHidden" | "setProp">;
                ignore: () => Pick<{
                    setDOM: (id: string, dom: HTMLElement) => void;
                    setNodeEvent: (eventType: import("../interfaces").NodeEventTypes, id: string) => void;
                    selectNode: (nodeId?: string) => void;
                    clearEvents: () => void;
                    setOptions: (cb: (options: Partial<Options>) => void) => void;
                    setIndicator: (indicator: import("../interfaces").Indicator) => void;
                    addLinkedNodeFromTree: (tree: import("../interfaces").NodeTree, parentId: string, id: string) => void;
                    add: (nodeToAdd: import("../interfaces").Node | import("../interfaces").Node[], parentId: string, index?: number) => void;
                    addNodeTree: (tree: import("../interfaces").NodeTree, parentId?: string, index?: number) => void;
                    delete: (id: string) => void;
                    deserialize: (input: string | Record<string, import("../interfaces").SerializedNode>) => void;
                    move: (targetId: string, newParentId: string, index: number) => void;
                    replaceNodes: (nodes: Record<string, import("../interfaces").Node>) => void;
                    reset: () => void;
                    setCustom: (id: string, cb: (data: any) => void) => void;
                    setHidden: (id: string, bool: boolean) => void;
                    setProp: (id: string, cb: (props: any) => void) => void;
                }, "setDOM" | "setNodeEvent" | "selectNode" | "clearEvents" | "setOptions" | "setIndicator" | "addLinkedNodeFromTree" | "add" | "addNodeTree" | "delete" | "deserialize" | "move" | "replaceNodes" | "reset" | "setCustom" | "setHidden" | "setProp">;
            };
        }, "setDOM" | "setNodeEvent" | "selectNode" | "clearEvents" | "setOptions" | "setIndicator" | "addLinkedNodeFromTree" | "add" | "addNodeTree" | "delete" | "deserialize" | "move" | "replaceNodes" | "reset" | "setCustom" | "setHidden" | "setProp">) => void): void;
        addLinkedNodeFromTree(tree: import("../interfaces").NodeTree, parentId: string, id: string): void;
        add(nodeToAdd: import("../interfaces").Node | import("../interfaces").Node[], parentId: string, index?: number): void;
        addNodeTree(tree: import("../interfaces").NodeTree, parentId?: string, index?: number): void;
        delete(id: string): void;
        deserialize(input: string | Record<string, import("../interfaces").SerializedNode>): void;
        move(targetId: string, newParentId: string, index: number): void;
        replaceNodes(nodes: Record<string, import("../interfaces").Node>): void;
        clearEvents(): void;
        reset(): void;
        setOptions(cb: (options: Partial<Options>) => void): void;
        setNodeEvent(eventType: import("../interfaces").NodeEventTypes, id: string): void;
        setCustom<T extends string>(id: T, cb: (data: any) => void): void;
        setDOM(id: string, dom: HTMLElement): void;
        setIndicator(indicator: import("../interfaces").Indicator): void;
        setHidden(id: string, bool: boolean): void;
        setProp(id: string, cb: (props: any) => void): void;
        selectNode(nodeId?: string): void;
    };
    ignoreHistoryForActions: readonly ["setDOM", "setNodeEvent", "selectNode", "clearEvents", "setOptions", "setIndicator"];
    normalizeHistory: (state: any) => void;
};
export declare type EditorStore = SubscriberAndCallbacksFor<typeof ActionMethodsWithConfig, typeof QueryMethods>;
export declare const useEditorStore: (options: Partial<Options>) => SubscriberAndCallbacksFor<{
    methods: (state: EditorState, query: {
        node: (id: string) => {
            isCanvas(): boolean;
            isRoot(): boolean;
            /**
             * On every undo/redo, we remove events pointing to deleted Nodes
             */
            isLinkedNode(): boolean;
            isTopLevelNode(): any;
            isDeletable(): boolean;
            isParentOfTopLevelNodes: () => boolean;
            isParentOfTopLevelCanvas(): any;
            get(): import("../interfaces").Node;
            ancestors(deep?: boolean): string[];
            descendants(deep?: boolean, includeOnly?: "linkedNodes" | "childNodes"): string[];
            linkedNodes(): string[];
            childNodes(): string[];
            isDraggable(onError?: (err: string) => void): boolean;
            isDroppable(target: string | import("../interfaces").Node, onError?: (err: string) => void): boolean;
            toSerializedNode(): import("../interfaces").SerializedNode;
            toNodeTree(includeOnly?: "linkedNodes" | "childNodes"): {
                rootNodeId: string;
                nodes: any;
            };
            decendants(deep?: boolean): any;
            isTopLevelCanvas(): boolean;
        };
        getDropPlaceholder: (source: string | import("../interfaces").Node, target: string, pos: {
            x: number;
            y: number;
        }, nodesToDOM?: (node: import("../interfaces").Node) => HTMLElement) => import("../interfaces").Indicator;
        getOptions: () => Options;
        getSerializedNodes: () => Record<string, import("../interfaces").SerializedNode>;
        serialize: () => string;
        parseReactElement: (reactElement: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)>) => {
            toNodeTree(normalize?: (node: import("../interfaces").Node, jsx: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)>) => void): import("../interfaces").NodeTree;
        };
        parseSerializedNode: (serializedNode: import("../interfaces").SerializedNode) => {
            toNode(normalize?: (node: import("../interfaces").Node) => void): import("../interfaces").Node;
        };
        parseFreshNode: (node: import("../interfaces").FreshNode) => {
            toNode(normalize?: (node: import("../interfaces").Node) => void): import("../interfaces").Node;
        };
        createNode: (reactElement: import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, string | any | (new (props: any) => import("react").Component<any, any, any>)>) | (new (props: any) => import("react").Component<any, any, any>)>, extras?: any) => any;
        getState: () => EditorState;
    } & {
        history: {
            canUndo: () => boolean;
            canRedo: () => boolean;
        };
    }) => {
        setState(cb: (state: EditorState, actions: Pick<{
            setDOM: (id: string, dom: HTMLElement) => void;
            setNodeEvent: (eventType: import("../interfaces").NodeEventTypes, id: string) => void;
            selectNode: (nodeId?: string) => void;
            clearEvents: () => void;
            setOptions: (cb: (options: Partial<Options>) => void) => void;
            setIndicator: (indicator: import("../interfaces").Indicator) => void;
            addLinkedNodeFromTree: (tree: import("../interfaces").NodeTree, parentId: string, id: string) => void;
            add: (nodeToAdd: import("../interfaces").Node | import("../interfaces").Node[], parentId: string, index?: number) => void;
            addNodeTree: (tree: import("../interfaces").NodeTree, parentId?: string, index?: number) => void;
            delete: (id: string) => void;
            deserialize: (input: string | Record<string, import("../interfaces").SerializedNode>) => void;
            move: (targetId: string, newParentId: string, index: number) => void;
            replaceNodes: (nodes: Record<string, import("../interfaces").Node>) => void;
            reset: () => void;
            setCustom: (id: string, cb: (data: any) => void) => void;
            setHidden: (id: string, bool: boolean) => void;
            setProp: (id: string, cb: (props: any) => void) => void;
        } & {
            history: {
                undo: () => void;
                redo: () => void;
                throttle: (rate?: number) => Pick<{
                    setDOM: (id: string, dom: HTMLElement) => void;
                    setNodeEvent: (eventType: import("../interfaces").NodeEventTypes, id: string) => void;
                    selectNode: (nodeId?: string) => void;
                    clearEvents: () => void;
                    setOptions: (cb: (options: Partial<Options>) => void) => void;
                    setIndicator: (indicator: import("../interfaces").Indicator) => void;
                    addLinkedNodeFromTree: (tree: import("../interfaces").NodeTree, parentId: string, id: string) => void;
                    add: (nodeToAdd: import("../interfaces").Node | import("../interfaces").Node[], parentId: string, index?: number) => void;
                    addNodeTree: (tree: import("../interfaces").NodeTree, parentId?: string, index?: number) => void;
                    delete: (id: string) => void;
                    deserialize: (input: string | Record<string, import("../interfaces").SerializedNode>) => void;
                    move: (targetId: string, newParentId: string, index: number) => void;
                    replaceNodes: (nodes: Record<string, import("../interfaces").Node>) => void;
                    reset: () => void;
                    setCustom: (id: string, cb: (data: any) => void) => void;
                    setHidden: (id: string, bool: boolean) => void;
                    setProp: (id: string, cb: (props: any) => void) => void;
                }, "setDOM" | "setNodeEvent" | "selectNode" | "clearEvents" | "setOptions" | "setIndicator" | "addLinkedNodeFromTree" | "add" | "addNodeTree" | "delete" | "deserialize" | "move" | "replaceNodes" | "reset" | "setCustom" | "setHidden" | "setProp">;
                ignore: () => Pick<{
                    setDOM: (id: string, dom: HTMLElement) => void;
                    setNodeEvent: (eventType: import("../interfaces").NodeEventTypes, id: string) => void;
                    selectNode: (nodeId?: string) => void;
                    clearEvents: () => void;
                    setOptions: (cb: (options: Partial<Options>) => void) => void;
                    setIndicator: (indicator: import("../interfaces").Indicator) => void;
                    addLinkedNodeFromTree: (tree: import("../interfaces").NodeTree, parentId: string, id: string) => void;
                    add: (nodeToAdd: import("../interfaces").Node | import("../interfaces").Node[], parentId: string, index?: number) => void;
                    addNodeTree: (tree: import("../interfaces").NodeTree, parentId?: string, index?: number) => void;
                    delete: (id: string) => void;
                    deserialize: (input: string | Record<string, import("../interfaces").SerializedNode>) => void;
                    move: (targetId: string, newParentId: string, index: number) => void;
                    replaceNodes: (nodes: Record<string, import("../interfaces").Node>) => void;
                    reset: () => void;
                    setCustom: (id: string, cb: (data: any) => void) => void;
                    setHidden: (id: string, bool: boolean) => void;
                    setProp: (id: string, cb: (props: any) => void) => void;
                }, "setDOM" | "setNodeEvent" | "selectNode" | "clearEvents" | "setOptions" | "setIndicator" | "addLinkedNodeFromTree" | "add" | "addNodeTree" | "delete" | "deserialize" | "move" | "replaceNodes" | "reset" | "setCustom" | "setHidden" | "setProp">;
            };
        }, "setDOM" | "setNodeEvent" | "selectNode" | "clearEvents" | "setOptions" | "setIndicator" | "addLinkedNodeFromTree" | "add" | "addNodeTree" | "delete" | "deserialize" | "move" | "replaceNodes" | "reset" | "setCustom" | "setHidden" | "setProp">) => void): void;
        addLinkedNodeFromTree(tree: import("../interfaces").NodeTree, parentId: string, id: string): void;
        add(nodeToAdd: import("../interfaces").Node | import("../interfaces").Node[], parentId: string, index?: number): void;
        addNodeTree(tree: import("../interfaces").NodeTree, parentId?: string, index?: number): void;
        delete(id: string): void;
        deserialize(input: string | Record<string, import("../interfaces").SerializedNode>): void;
        move(targetId: string, newParentId: string, index: number): void;
        replaceNodes(nodes: Record<string, import("../interfaces").Node>): void;
        clearEvents(): void;
        reset(): void;
        setOptions(cb: (options: Partial<Options>) => void): void;
        setNodeEvent(eventType: import("../interfaces").NodeEventTypes, id: string): void;
        setCustom<T extends string>(id: T, cb: (data: any) => void): void;
        setDOM(id: string, dom: HTMLElement): void;
        setIndicator(indicator: import("../interfaces").Indicator): void;
        setHidden(id: string, bool: boolean): void;
        setProp(id: string, cb: (props: any) => void): void;
        selectNode(nodeId?: string): void;
    };
    ignoreHistoryForActions: readonly ["setDOM", "setNodeEvent", "selectNode", "clearEvents", "setOptions", "setIndicator"];
    normalizeHistory: (state: any) => void;
}, typeof QueryMethods>;
