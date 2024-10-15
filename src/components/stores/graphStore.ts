import { create } from 'zustand';
import { NodeType } from '@rootTypes/nodeTypeEnum'
import { getNodeColor } from '@utils/getNodeColor'

type NodeTypeStorage = {
  id: string | number;
  type: string;
  color: string;
  data: any; // Или RepoType, если тип известен
};

type LinkTypeStorage = {
  source: NodeTypeStorage | string;
  target: NodeTypeStorage | string;
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
  removeNodesAndLinks: (uuids: string | string[]) => set((state) => {
    const uuidArray = Array.isArray(uuids) ? uuids : [uuids];

    console.log(state)

    // Удаляем связи, связанные с узлами по UUID
    const newLinks = state.graphData.links.filter(link => {
      // Извлекаем id из source и target
      const sourceId = typeof link.source === 'object' ? String(link.source.id) : String(link.source);
      const targetId = typeof link.target === 'object' ? String(link.target.id) : String(link.target);
    
      // Сравниваем id с массивом UUID
      return !uuidArray.includes(sourceId) && !uuidArray.includes(targetId);
    });

    // Удаляем узлы по UUID
    const newNodes = state.graphData.nodes.filter(node => !uuidArray.includes(String(node.id)));

    console.log(uuidArray)
    console.log(newLinks)

    return {
      graphData: {
        nodes: newNodes,
        links: newLinks
      }
    };
  }),
}));
