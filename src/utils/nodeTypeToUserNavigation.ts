function nodeTypeToUserNavigation(nodeType: string): string{

    const aliases: Record<string, string> = {
        'DomainType': 'domain',
        'UserType': 'user',
        'RepoType': 'repo',
        'UnitType': 'unit',
        'UnitNodeType': 'unit-node'
    }

    return aliases[nodeType]  || ''
}

export default nodeTypeToUserNavigation;