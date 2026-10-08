import { useEffect, useState } from 'react';
import { useAsyncHandler } from '@handlers/useAsyncHandler';
import DefaultInput from '@primitives/defaultInput';
import Spinner from '@primitives/spinner';
import {
    useGetNotificationSettingsLazyQuery,
    useUpdateNotificationSettingsMutation,
} from '@rootTypes/compositionFunctions';
import { TELEGRAM_BOT_ENABLE_FLAG, isFeatureEnabled, useBackendInfoStore } from '@stores/backendInfoStore';
import { useErrorStore } from '@stores/errorStore';
import { useModalStore } from '@stores/baseStore';
import '../form.css';

const UTC_TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

function validateUtcTime(value: string): string | null {
    if (UTC_TIME_PATTERN.test(value)) return null;
    return 'Use HH:MM in UTC';
}

function SettingToggle({
    checked,
    label,
    onChange,
}: {
    checked: boolean;
    label: string;
    onChange: (value: boolean) => void;
}) {
    return (
        <div className="toggle_container">
            <label className="toggle">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => onChange(event.target.checked)}
                />
                <span className="slider"></span>
            </label>
            <div className="toggle_text">
                {label}
            </div>
        </div>
    );
}

export default function NotificationSettingsForm() {
    const { isLoaderActive, runAsync } = useAsyncHandler();
    const { setHappy, setAngry, setError } = useErrorStore();
    const { activeModal } = useModalStore();
    const { backendInfo } = useBackendInfoStore();
    const isTelegramEnabled = isFeatureEnabled(backendInfo, TELEGRAM_BOT_ENABLE_FLAG);

    const [scheduledEnabled, setScheduledEnabled] = useState(true);
    const [scheduledTime, setScheduledTime] = useState('16:00');
    const [dataPipeEnabled, setDataPipeEnabled] = useState(true);
    const [telegramEnabled, setTelegramEnabled] = useState(true);
    const [isTimeError, setIsTimeError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const [getNotificationSettings] = useGetNotificationSettingsLazyQuery();
    const [updateNotificationSettings] = useUpdateNotificationSettingsMutation();

    useEffect(() => {
        if (activeModal !== 'notificationSettings') return;

        setLoaded(false);
        runAsync(async () => {
            const result = await getNotificationSettings();
            if (result.error) {
                setError(result.error);
                return;
            }
            const settings = result.data?.getNotificationSettings;
            if (!settings) return;

            setScheduledEnabled(settings.isScheduledAlertEnable);
            setScheduledTime(settings.scheduledNotificationTime);
            setDataPipeEnabled(settings.isDataPipeAlertEnable);
            setTelegramEnabled(settings.isTelegramAlertEnable);
            setLoaded(true);
        });
        // Load fresh settings each time the modal opens.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeModal]);

    const handleSave = () => {
        if (validateUtcTime(scheduledTime)) {
            setAngry('Use HH:MM in UTC');
            return;
        }

        runAsync(async () => {
            const result = await updateNotificationSettings({
                variables: {
                    data: {
                        isScheduledAlertEnable: scheduledEnabled,
                        scheduledNotificationTime: scheduledTime,
                        isDataPipeAlertEnable: dataPipeEnabled,
                        ...(isTelegramEnabled ? { isTelegramAlertEnable: telegramEnabled } : {}),
                    },
                },
            });

            if (result.data?.updateNotificationSettings) {
                setHappy('Notification settings saved');
            }
        });
    };

    return (
        <>
            {isLoaderActive && <Spinner />}
            <form>
                <SettingToggle
                    checked={scheduledEnabled}
                    label="Daily summaries"
                    onChange={setScheduledEnabled}
                />
                <div className="ntf_hint">
                    Instance and unit summaries are sent at this UTC time.
                </div>
                <DefaultInput
                    id="scheduled_notification_time"
                    type="text"
                    placeholder="HH:MM UTC"
                    value={scheduledTime}
                    validateState={scheduledTime}
                    onChange={setScheduledTime}
                    validateFunc={validateUtcTime}
                    setIsErrorExist={setIsTimeError}
                />
                <SettingToggle
                    checked={dataPipeEnabled}
                    label="Data pipe alerts"
                    onChange={setDataPipeEnabled}
                />
                <div className="ntf_hint">
                    A unit node raises these from the alerts section of its data pipe.
                </div>
                {isTelegramEnabled && (
                    <SettingToggle
                        checked={telegramEnabled}
                        label="Telegram delivery"
                        onChange={setTelegramEnabled}
                    />
                )}
                <button
                    className="button_main_action ntf_save_button"
                    type="button"
                    onClick={handleSave}
                    disabled={!loaded || isTimeError}
                >
                    Save
                </button>
            </form>
        </>
    );
}
