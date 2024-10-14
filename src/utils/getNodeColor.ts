import { NodeType } from '@rootTypes/nodeTypeEnum'

export function getNodeColor(type: NodeType){
    switch (type) {
        case NodeType.Domain: return "#FF5733"; // Orange
        case NodeType.Repo: return "#28A745"; // Green
        case NodeType.Unit: return "#3498DB"; // Blue
        case NodeType.Input: return "#95a5a6"; // Gray
        case NodeType.Output: return "#F0AD4E"; // Gold
        default: return "#ccc"; // Default color
    }
};