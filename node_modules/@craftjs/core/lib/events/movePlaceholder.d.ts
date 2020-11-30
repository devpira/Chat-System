import { DropAction, DOMInfo } from '../interfaces';
export default function movePlaceholder(pos: DropAction, canvasDOMInfo: DOMInfo, // which canvas is cursor at
bestTargetDomInfo: DOMInfo | null): {
    top: string;
    left: string;
    width: string;
    height: string;
};
