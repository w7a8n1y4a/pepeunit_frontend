import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import * as YAML from 'yaml';
import '../form.css'

import { useNodeStore } from '@stores/baseStore';

interface YAMLEditorProps {
  initialValue?: string | null;
  onChange: (ymlText: string) => void;
}

const YAMLEditor = ({
  initialValue = '',
  onChange,
}: YAMLEditorProps) => {

  const { currentNodeData } = useNodeStore();

  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsedValue = typeof initialValue === 'string' 
        ? initialValue 
        : YAML.stringify(initialValue);
      setValue(parsedValue);
      setIsValid(true);
      setError(null);
    } catch (err) {
      setError('Invalid initial YAML value');
      setIsValid(false);
    }
  }, [currentNodeData, initialValue]);

  const handleEditorChange = (newValue: any) => {
    setValue(newValue);
    
    try {
      YAML.parse(newValue);
      setIsValid(true);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setIsValid(false);
      setError(error.message);
    }

    onChange(newValue);
  };


  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <Editor
        height='570px'
        defaultLanguage="yaml"
        value={value}
        onChange={handleEditorChange}
        theme='vs-dark'
        options={{
          fontSize: 16,
          fontFamily: "Consolas, monospace",
          lineHeight: 20,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: "on",
          wordWrap: "on",
          folding: true,
          bracketPairColorization: { enabled: true },
          autoClosingBrackets: "always",
          autoIndent: "full",
          cursorStyle: "line",
          renderWhitespace: "selection",
        }}
      />
      {!isValid && (
        <div className="data_pipe_error">
          YAML Error: {error}
        </div>
      )}
    </div>
  );
};

export default YAMLEditor;