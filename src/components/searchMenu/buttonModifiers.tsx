import { useEffect } from 'react';
import useButtonStore from '@stores/modifiersStore';
import {getNodeColor} from '@utils/getNodeColor'
import './searchMenu.css'

interface ButtonModifiersProps {
    initialActiveIds: number[];
}

const ButtonModifiers = ({ initialActiveIds }: ButtonModifiersProps) => {
  const { buttons, initialize, toggleButton } = useButtonStore();

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
            onClick={() => toggleButton(button.id)}
            style={{
              border: '2px solid ' + (button.isActive ? getNodeColor(button.nodeType) : '#282828')
            }}
          >
            {button.nodeType}
          </button>
        ) : null
      )}
    </div>
  );
};

export default ButtonModifiers;
