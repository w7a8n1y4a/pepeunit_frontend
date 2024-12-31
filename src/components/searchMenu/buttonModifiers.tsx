import { useEffect } from 'react';
import useButtonStore, {useButtonHandlers} from '@stores/modifiersStore';
import { useSearchNodeStore } from '@stores/baseStore';
import {getNodeColor} from '@utils/getNodeColor'
import './searchMenu.css'


const ButtonModifiers = () => {
  const { buttons, initialize } = useButtonStore();
  const { toggleButton } = useButtonHandlers();

  const { currentSearchNodeData } = useSearchNodeStore();

  const predefinedLists: { [key: string]: number[] } = {
      'UserType': [1, 2, 3],
      'RepoType': [2, 3, 4],
      'UnitType': [3, 4, 5],
    };
    
  function transformStringToList(input: string): number[] {
      return predefinedLists[input];
  }

  useEffect(() => {
    initialize(transformStringToList(currentSearchNodeData.__typename));
  }, [initialize, currentSearchNodeData]);

  return (
    <div style={{ display: 'flex' }}>
      {buttons.map((button) =>
        button.isVisible ? (
          <button
            className="search-button"
            key={button.id}
            onClick={() =>  toggleButton(button.id)}
            style={{
              border: '2px solid ' + (button.isActive ? getNodeColor(button.nodeType) : '#282828')
            }}
          >
            {button.nodeType == currentSearchNodeData.__typename.toLowerCase().slice(0, -4) ? currentSearchNodeData.name || currentSearchNodeData.login : button.nodeType}
          </button>
        ) : null
      )}
    </div>
  );
};

export default ButtonModifiers;
