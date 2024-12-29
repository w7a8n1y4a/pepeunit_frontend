import { create } from 'zustand';
import { NodeType } from '@rootTypes/nodeTypeEnum'

type NodeTypeStorage = {
  id: string | number;
  type: NodeType;
  color: string;
  data: any;
};

type LinkTypeStorage = {
  source: NodeTypeStorage | string;
  target: NodeTypeStorage | string;
  value?: number;
};

type GraphDataType = {
  nodes: NodeTypeStorage[];
  links: LinkTypeStorage[];
};

type GraphStoreType = {
  graphData: GraphDataType;
  setGraphData: (data: GraphDataType) => void;
  removeNodesAndLinks: (uuids: string | string[]) => void;
};

export const useGraphStore = create<GraphStoreType>((set, get) => ({
  graphData: {
    nodes: [],
    links: [],
  },
  setGraphData: (data: GraphDataType) => set(() => ({ graphData: data })),
  removeNodesAndLinks: (uuids: string | string[]) => set((state) => {
    const uuidArray = Array.isArray(uuids) ? uuids : [uuids];

    const newLinks = state.graphData.links.filter(link => {
      const sourceId = typeof link.source === 'object' ? String(link.source.id) : String(link.source);
      const targetId = typeof link.target === 'object' ? String(link.target.id) : String(link.target);
    
      return !uuidArray.includes(sourceId) && !uuidArray.includes(targetId);
    });

    const newNodes = state.graphData.nodes.filter(node => !uuidArray.includes(String(node.id)));

    return {
      graphData: {
        nodes: newNodes,
        links: newLinks
      }
    };
  }),
  updateNodeData: (uuid: string, newData: any) => set((state) => {
    const updatedNodes = state.graphData.nodes.map((node) =>
      String(node.id) === uuid ? { ...node, ...newData } : node
    );
    return {
      graphData: {
        ...state.graphData,
        nodes: updatedNodes,
      },
    };
  }),
  getNodeByUuid: (uuid: string) => {
    const state = get();
    return state.graphData.nodes.find((node: any) => String(node.id) === uuid);
  },
}));
