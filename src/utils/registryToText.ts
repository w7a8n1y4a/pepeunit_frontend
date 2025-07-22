import {
    RepositoryRegistryType
} from '@rootTypes/compositionFunctions';
import {stringToFormat} from '@utils/stringToFormat'
import truncateString from '@utils/truncateString'

function cleanGitUrl(fullUrl: string): string {
    const withoutProtocol = fullUrl.replace(/^https?:\/\//, '');
    const withoutDomain = withoutProtocol.replace(/^[^\/]+\//, '');
    const withoutGit = withoutDomain.replace(/\.git$/, '');
    
    return withoutGit;
}

export function registryToText(registry: RepositoryRegistryType): string {
    let platform = stringToFormat(registry.platform) ? stringToFormat(registry.platform) : ''
    return truncateString(platform + ' ' + cleanGitUrl(registry.repositoryUrl), 48)
}