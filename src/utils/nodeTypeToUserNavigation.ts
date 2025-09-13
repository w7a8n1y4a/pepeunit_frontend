function nodeTypeToUserNavigation(nodeType: string): string{

    const aliases: Record<string, string> = {
        'DomainType': 'domain',
        'UserType': 'user',
        'RepositoryRegistryType': 'registry',
        'RepoType': 'repo',
        'UnitType': 'unit',
        'UnitNodeType': 'unit-node',
        'DashboardType': 'dashboard',
        'DashboardPanelType': 'dashboard-panel'
    }

    return aliases[nodeType]  || ''
}

export default nodeTypeToUserNavigation;