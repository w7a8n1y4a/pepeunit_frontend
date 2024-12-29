import { NodeType } from '@rootTypes/nodeTypeEnum'

export function getNodeColor(type: NodeType){
    switch (type) {
        case NodeType.Input: return "#4a148c";
        case NodeType.Output: return "#F44336";
        case NodeType.Unit: return "#2196F3";
        case NodeType.Repo: return "#4CAF50";
        case NodeType.User: return "#EF6C00";
        case NodeType.Domain: return "#FF9800";
        default: return "#fff";
    }
};
