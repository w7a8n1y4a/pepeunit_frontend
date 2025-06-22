import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useCheckDataPipeConfigLazyQuery } from '@rootTypes/compositionFunctions'
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import createYamlFile from '@src/utils/createYamlFile';
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
  const [error, setError] = useState<string | null>(null);

  const [validationErrors, setValidationErrors] = useState<Array<{
    stage: string;
    message: string;
  }> | null>(null);

  const { runAsync } = useAsyncHandler();

  const [checkDataPipeConfig] = useCheckDataPipeConfigLazyQuery();

  useEffect(() => {
    setValue(initialValue ? initialValue : '');
  }, [currentNodeData, initialValue]);

  useEffect(() => {
    runAsync(async () => {
      let resultCheckPipe = await checkDataPipeConfig({
          variables: {
              file: createYamlFile(value),
          }
      })
      if (resultCheckPipe.data?.checkDataPipeConfig){
        setValidationErrors(resultCheckPipe.data.checkDataPipeConfig);
      } else {
        setValidationErrors(null);
      }
    })
  }, [value]);

  const handleEditorChange = (newValue: any) => {
    setValue(newValue);
    
    try {
      YAML.parse(newValue);
      setError(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error.message);
    }

    onChange(newValue);
  };

  const hasValidationErrors = error || ( validationErrors && validationErrors.length > 0);

  return (
    <div style={{ width: '100%', position: 'relative', paddingBottom: "10px" }}>
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

      {
        hasValidationErrors && (
          <div className="data_pipe_error">
            {
              error && (
                <div>YAML Syntax Error: {error}</div>
              )
            }
            {validationErrors && validationErrors.map((err, index) => (
              <div key={index}>
                {err.stage.toLowerCase()}: {err.message}
              </div>
            ))}
          </div>
        )
      }

    </div>
  );
};

export default YAMLEditor;