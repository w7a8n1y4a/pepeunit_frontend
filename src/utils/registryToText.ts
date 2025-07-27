import truncateString from '@utils/truncateString'

function cleanGitUrl(fullUrl: string): string {
    const withoutProtocol = fullUrl.replace(/^https?:\/\//, '');
    const withoutDomain = withoutProtocol.replace(/^[^\/]+\//, '');
    const withoutGit = withoutDomain.replace(/\.git$/, '');
    
    return withoutGit;
}

export function registryToText(repositoryUrl: string): string {
    return truncateString(cleanGitUrl(repositoryUrl), 48)
}