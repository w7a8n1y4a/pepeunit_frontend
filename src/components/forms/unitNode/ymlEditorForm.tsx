import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import * as YAML from 'yaml';

interface YAMLEditorProps {
  initialValue?: string | object;
  onChange?: (yamlText: string, parsedData: any, error?: Error) => void;
}

const YAMLEditor = ({
  initialValue = '',
  onChange,
}: YAMLEditorProps) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const parsedValue = typeof initialValue === 'string' 
        ? initialValue 
        : YAML.stringify(initialValue);
      setValue(parsedValue);
      setIsValid(true);
      setError('');
    } catch (err) {
      setError('Invalid initial YAML value');
      setIsValid(false);
    }
  }, [initialValue]);

  const handleEditorChange = (newValue: any) => {
    setValue(newValue);
    
    try {
      console.log(newValue)
      const parsed = YAML.parse(newValue);
      setIsValid(true);
      setError('');
      if (onChange) {
        onChange(newValue, parsed);
      }
    } catch (err) {
      
      const error = err instanceof Error ? err : new Error(String(err));
      setIsValid(false);
      setError(error.message);
      if (onChange) {
        onChange("", newValue, error);
      }
    }
  };


  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <Editor
        height='500px'
        defaultLanguage="yaml"
        value={value}
        onChange={handleEditorChange}
        theme='vs-dark'
        options={{
          fontSize: 16,                  // Размер шрифта
          fontFamily: "Consolas, monospace", // Шрифт
          lineHeight: 20,                 // Высота строки
          minimap: { enabled: false },    // Отключение мини-карты
          scrollBeyondLastLine: false,    // Отключение прокрутки после последней строки
          lineNumbers: "on",             // Номера строк ("on", "off", "relative")
          wordWrap: "on",                // Перенос строк ("on", "off", "wordWrapColumn")
          folding: true,                 // Сворачивание блоков кода
          bracketPairColorization: { enabled: true }, // Подсветка парных скобок
          autoClosingBrackets: "always", // Автозакрытие скобок
          autoIndent: "full",            // Автоотступ
          cursorStyle: "line",           // Стиль курсора ("line", "block", "underline")
          renderWhitespace: "selection", // Отображение пробелов ("none", "boundary", "selection", "all")
        }}
      />
      {!isValid && (
        <div style={{
          color: 'red',
          padding: '8px',
          backgroundColor: '#ffebee',
          borderTop: '1px solid #ffcdd2',
        }}>
          YAML Error: {error}
        </div>
      )}
    </div>
  );
};

export default YAMLEditor;