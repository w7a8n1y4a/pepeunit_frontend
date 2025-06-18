function createYamlFile(yamlContent: string | null, fileName: string = 'config.yaml'): File {
  
  if (yamlContent === "" || yamlContent === null){
    throw new Error("YAML content cannot be empty or null");
  }
  
  const blob = new Blob([yamlContent], { type: 'application/yaml' });
  
  return new File([blob], fileName, {
    type: 'application/yaml',
    lastModified: Date.now()
  });
}

export default createYamlFile;