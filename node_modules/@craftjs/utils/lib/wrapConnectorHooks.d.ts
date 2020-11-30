/// <reference types="react" />
export declare function cloneWithRef(element: any, newRef: any): React.ReactElement<any>;
export declare function wrapHookToRecognizeElement(hook: (node: any, opts: any) => void): (elementOrNode: any, opts: any) => any;
export declare type ConnectableElement = React.RefObject<any> | React.ReactElement | Element | null;
export declare type Connector = (elementOrNode: ConnectableElement, options?: any) => React.ReactElement | null;
