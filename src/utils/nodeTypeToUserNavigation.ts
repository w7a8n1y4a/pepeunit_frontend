function nodeTypeToUserNavigation(nodeType: string): string{

    const aliases: Record<string, string> = {
        'DomainType': 'domain',
        'UserType': 'user',
        'RepositoryRegistryType': 'registry',
        'RepoType': 'repo',
        'UnitType': 'unit',
        'UnitNodeType': 'unit-node',
        'DashboardType': 'dashboard'
    }

    return aliases[nodeType]  || ''
}

export default nodeTypeToUserNavigation;