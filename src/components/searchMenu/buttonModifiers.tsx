import { useEffect } from 'react';
import useButtonStore, {useButtonHandlers} from '@stores/modifiersStore';
import { useSearchNodeStore } from '@stores/baseStore';
import {getNodeColor} from '@utils/getNodeColor'
import './searchMenu.css'

interface ButtonModifiersProps {
    initialActiveIds: number[];
}

const ButtonModifiers = ({ initialActiveIds }: ButtonModifiersProps) => {
  const { buttons, initialize } = useButtonStore();
  const { toggleButton } = useButtonHandlers();

  const { currentSearchNodeData } = useSearchNodeStore();

  useEffect(() => {
    initialize(initialActiveIds);
  }, [initialize, initialActiveIds]);

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
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
