import { create } from 'zustand';
import { NodeType } from '../types/nodeTypeEnum'
import { getNodeColor } from '../utils/getNodeColor'

type NodeTypeStorage = {
  id: string | number;
  type: string;
  color: string;
  data: any; // Или RepoType, если тип известен
};

type LinkTypeStorage = {
  source: string;
  target: string;
};

type GraphDataType = {
  nodes: NodeTypeStorage[];
  links: LinkTypeStorage[];
};

type GraphStoreType = {
  graphData: GraphDataType;
  setGraphData: (data: GraphDataType) => void;
};

export const useGraphStore = create<GraphStoreType>((set) => ({
  graphData: {
    nodes: [
      {
        id: import.meta.env.VITE_INSTANCE_NAME,
        type: NodeType.Domain,
        color: getNodeColor(NodeType.Domain),
        data: {
          name: import.meta.env.VITE_INSTANCE_NAME
        }
      }
    ],
    links: [],
  },
  setGraphData: (data: GraphDataType) => set(() => ({ graphData: data })),
}));
