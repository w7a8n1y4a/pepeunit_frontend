import formatDateTime from '@utils/formatDateTime';
import copy_img from '/images/copy.svg'
import copyToClipboard from '@utils/copyToClipboard'
import showClipboardNotification from '@utils/showClipboardNotification'
import {
    enumToLabel,
    formatCount,
    formatPing,
    instanceDomain,
    parseInstanceState,
    settingLabel,
} from '@utils/instanceHelpers';
import { GetInstancesQuery } from '@rootTypes/compositionFunctions';
import '../form.css';

type InstanceRow = GetInstancesQuery['getInstances']['instances'][number];

interface InstanceDetailsFormProps {
    instance: InstanceRow | null
}

function DetailRow({ label, value }: { label: string, value: string }) {
    return (
        <tr>
            <td>{label}</td>
            <td>{value || '—'}</td>
        </tr>
    );
}

export default function InstanceDetailsForm({ instance }: InstanceDetailsFormProps) {
    if (!instance) return null;

    const state = parseInstanceState(instance.state);
    const flags = state?.featureFlags ?? [];
    const settings = state?.settings ?? [];
    const testsLabel = state?.integrationTestsStatus
        ? `${enumToLabel(state.integrationTestsStatus)}${
            state.integrationTestsSuccessPercentage != null
                ? ` ${Math.round(state.integrationTestsSuccessPercentage)}%`
                : ''
        }`
        : '';

    const metrics = [
        ['Users', state?.userCount],
        ['Registries', state?.repositoryRegistryCount],
        ['Repos', state?.repoCount],
        ['Units', state?.unitCount],
        ['UnitNodes', state?.unitNodeCount],
        ['Edges', state?.unitNodeEdgeCount],
    ] as const;

    return (
        <div className="modal_menu_content instance_details">
            <div className="instance_details_grid">
                <section>
                    <div className="about_section_title">Collection</div>
                    <table className="about_table about_table_compact">
                        <tbody>
                            <DetailRow label="Domain" value={instanceDomain(instance.url)} />
                            <DetailRow label="Trust" value={enumToLabel(instance.trustStatus)} />
                            <DetailRow label="Status" value={enumToLabel(instance.lastCollectionStatus)} />
                            <DetailRow label="Ping" value={formatPing(instance.lastPing)} />
                            <DetailRow label="Success" value={formatDateTime(instance.lastSuccessDatetime)} />
                            <DetailRow label="Attempt" value={formatDateTime(instance.lastAttemptDatetime)} />
                            <DetailRow label="Streak" value={String(instance.consecutiveSuccessCount)} />
                            <DetailRow label="Added" value={formatDateTime(instance.createDatetime)} />
                        </tbody>
                    </table>
                </section>

                <section>
                    <div className="about_section_title">Identity</div>
                    <table className="about_table about_table_compact">
                        <tbody>
                            <DetailRow label="Name" value={state?.name ?? ''} />
                            <DetailRow label="Version" value={state?.version ?? ''} />
                            <DetailRow label="Schema" value={state?.schemaVersion ?? ''} />
                            <DetailRow label="License" value={state?.license ?? ''} />
                            <DetailRow label="Instance time" value={formatDateTime(state?.instanceDatetime)} />
                            <DetailRow label="Tests" value={testsLabel} />
                            <DetailRow label="Tests run" value={formatDateTime(state?.integrationTestsDatetime)} />
                            {state?.email && <DetailRow label="Email" value={state.email} />}
                            {state?.telegram && <DetailRow label="Telegram" value={state.telegram} />}
                        </tbody>
                    </table>
                </section>
            </div>

            {instance.lastCollectionError && (
                <div className="instance_details_error">{instance.lastCollectionError}</div>
            )}

            {state?.description && (
                <div className="instance_details_about">{state.description}</div>
            )}

            <div className="about_section_title">Current URL</div>
            <div className="repo_link">
                <span className="about_current_url">{instance.url}</span>
                <button
                    className="repo_link_button"
                    onClick={(event) => {
                        copyToClipboard(instance.url);
                        showClipboardNotification(event);
                    }}
                >
                    <img src={copy_img} width="24" height="24" alt="Copy instance URL"/>
                </button>
            </div>

            {state && (
                <>
                    <div className="instance_metrics_row">
                        {metrics.map(([label, value]) => (
                            <div key={label} className="instance_metric_chip">
                                {label} {formatCount(value)}
                            </div>
                        ))}
                    </div>

                    {(state.swagger || state.graphql || state.grafana || state.telegramBot) && (
                        <div className="buttons_row instance_details_links">
                            {state.swagger && (
                                <a href={state.swagger} target="_blank" rel="noreferrer" className="button_open_alter">
                                    Swagger
                                </a>
                            )}
                            {state.graphql && (
                                <a href={state.graphql} target="_blank" rel="noreferrer" className="button_open_alter">
                                    GraphQL
                                </a>
                            )}
                            {state.grafana && (
                                <a href={state.grafana} target="_blank" rel="noreferrer" className="button_open_alter">
                                    Grafana
                                </a>
                            )}
                            {state.telegramBot && (
                                <a href={state.telegramBot} target="_blank" rel="noreferrer" className="button_open_alter">
                                    Telegram Bot
                                </a>
                            )}
                        </div>
                    )}

                    {flags.length > 0 && (
                        <>
                            <div className="about_section_title">Feature Flags</div>
                            <div className="instance_metrics_row">
                                {flags.map((flag) => (
                                    <div
                                        key={flag.key}
                                        className={`instance_metric_chip ${flag.enabled ? 'about_flag_on' : 'about_flag_off'}`}
                                    >
                                        {settingLabel(flag.key)} {flag.enabled ? '✓' : '✗'}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {settings.length > 0 && (
                        <>
                            <div className="about_section_title">Settings</div>
                            <div className="instance_settings_grid">
                                {settings.map((setting) => (
                                    <div key={setting.key} className="instance_setting_item">
                                        <span>{settingLabel(setting.key)}</span>
                                        <span>{setting.value}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
