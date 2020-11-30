import { Patch } from 'immer';
declare type Timeline = Array<{
    patches: Patch[];
    inversePatches: Patch[];
    timestamp: number;
}>;
export declare const HISTORY_ACTIONS: {
    UNDO: string;
    REDO: string;
    THROTTLE: string;
    IGNORE: string;
};
export declare class History {
    timeline: Timeline;
    pointer: number;
    throttledInversePatch: Patch[];
    add(patches: Patch[], inversePatches: Patch[]): void;
    throttleAdd(patches: Patch[], inversePatches: Patch[], throttleRate?: number): void;
    canUndo(): boolean;
    canRedo(): boolean;
    undo(state: any): any;
    redo(state: any): any;
}
export {};
