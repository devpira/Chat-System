export declare const getDOMPadding: (dom: HTMLElement) => {
    left: number;
    right: number;
    bottom: number;
    top: number;
};
export declare const getDOMMargin: (dom: HTMLElement) => {
    left: number;
    right: number;
    bottom: number;
    top: number;
};
export declare const getDOMInfo: (dom: HTMLElement) => {
    x: number;
    y: number;
    top: number;
    left: number;
    bottom: number;
    right: number;
    width: number;
    height: number;
    outerWidth: number;
    outerHeight: number;
    margin: {
        left: number;
        right: number;
        bottom: number;
        top: number;
    };
    padding: {
        left: number;
        right: number;
        bottom: number;
        top: number;
    };
    inFlow: boolean;
};
export declare const getComputedStyle: (dom: HTMLElement) => CSSStyleDeclaration;
export declare const styleInFlow: (el: HTMLElement, parent: HTMLElement) => boolean;
