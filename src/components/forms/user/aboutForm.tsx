import { useState, useEffect } from 'react';
import Spinner from '@primitives/spinner'
import '../form.css'

const FRONTEND_VERSION = '1.1.0'

interface BackendInfo {
    name: string
    version: string
    description: string
    license: string
    swagger?: string
    graphql?: string
    grafana?: string
    telegram_bot?: string
    feature_flags?: Record<string, boolean>
}

export default function AboutForm() {
    const [backendInfo, setBackendInfo] = useState<BackendInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const backendUri = (import.meta.env.VITE_BACKEND_URI || window.env.VITE_BACKEND_URI || '').replace(/\/graphql$/, '');

        if (!backendUri) {
            setError('Backend URI not configured');
            setLoading(false);
            return;
        }

        fetch(backendUri)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                setBackendInfo(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <Spinner />;
    if (error) return <div className="div_unit_error_message">Failed to load backend info: {error}</div>;
    if (!backendInfo) return null;

    const featureFlags = backendInfo.feature_flags ? Object.entries(backendInfo.feature_flags) : [];

    return (
        <div className="modal_menu_content">

            {featureFlags.length > 0 && (
                <>
                    <div className="about_section_title">Feature Flags</div>
                    <table className="about_table">
                        <thead>
                            <tr>
                                <th>Flag</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {featureFlags.map(([key, value]) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td className={value ? 'about_flag_on' : 'about_flag_off'}>
                                        {value ? '✓' : '✗'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            <div className="about_section_title">Versions</div>
            <table className="about_table">
                <thead>
                    <tr>
                        <th>Component</th>
                        <th>Version</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Frontend</td>
                        <td>{FRONTEND_VERSION}</td>
                    </tr>
                    <tr>
                        <td>Backend</td>
                        <td>{backendInfo.version}</td>
                    </tr>
                </tbody>
            </table>

            <div className="about_section_title">Links</div>
            <div className="buttons_row">
                {backendInfo.swagger && (
                    <a href={backendInfo.swagger} target="_blank" rel="noreferrer" className="button_open_alter">
                        Swagger
                    </a>
                )}
                {backendInfo.graphql && (
                    <a href={backendInfo.graphql} target="_blank" rel="noreferrer" className="button_open_alter">
                        GraphQL
                    </a>
                )}
                {backendInfo.grafana && (
                    <a href={backendInfo.grafana} target="_blank" rel="noreferrer" className="button_open_alter">
                        Grafana
                    </a>
                )}
                {backendInfo.telegram_bot && (
                    <a href={backendInfo.telegram_bot} target="_blank" rel="noreferrer" className="button_open_alter">
                        Telegram Bot
                    </a>
                )}
            </div>

            <button
                className="button_add_alter"
                onClick={() => window.open('https://pepeunit.com/support.html', '_blank')}
            >
                Support Pepeunit Development
            </button>
        </div>
    );
}
