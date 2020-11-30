import { Connector } from '@craftjs/utils';
import { EditorStore } from '../editor/store';
export declare type CraftDOMEvent<T extends Event> = T & {
    craft: {
        stopPropagation: () => void;
        blockedEvents: Record<string, boolean>;
    };
};
export declare type CraftEventListener = [string, (e: CraftDOMEvent<Event>, opts: any) => void, boolean];
export declare const defineEventListener: (name: string, handler: (e: CraftDOMEvent<Event>, payload: any) => void, capture?: boolean) => [string, (e: CraftDOMEvent<Event>, opts: any) => void, boolean];
export declare type Handler = {
    /**
     * The DOM manipulations to perform on the attached DOM element
     * @returns function that reverts the DOM manipulations performed
     */
    init: (el: HTMLElement, opts: any) => any;
    /**
     * List of Event Listeners to add to the attached DOM element
     */
    events: readonly CraftEventListener[];
};
export declare type ConnectorsForHandlers<T extends Handlers> = ReturnType<T['connectors']>;
/**
 * Creates Event Handlers
 */
export declare abstract class Handlers<T extends string = null> {
    private wm;
    protected store: EditorStore;
    constructor(store: any);
    abstract handlers(): Record<T, Partial<Omit<Handler, 'events'> & {
        events: any;
    }>>;
    connectors(): Record<T, Connector>;
    static getConnectors<T extends Handlers, U extends any[]>(this: {
        new (...args: U): T;
    }, ...args: U): ReturnType<T['connectors']>;
}
