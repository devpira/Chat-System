import { Node } from '../interfaces';
import { useInternalNodeReturnType } from '../nodes/useInternalNode';
export declare type useNodeReturnType<S = null> = useInternalNodeReturnType<S> & Pick<useInternalNodeReturnType<S>['actions'], 'setProp'>;
export declare function useNode(): useNodeReturnType;
export declare function useNode<S = null>(collect?: (node: Node) => S): useNodeReturnType<S>;
