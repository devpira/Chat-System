import React from 'react';
import { NodeId } from '../interfaces';
export declare const NodeContext: React.Context<any>;
export declare type NodeProvider = {
    id: NodeId;
    related?: boolean;
};
export declare const NodeProvider: React.FC<NodeProvider>;
