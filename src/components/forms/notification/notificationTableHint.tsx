import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface NotificationTableHintProps {
    text: string
    children: string
}

export default function NotificationTableHint({ text, children }: NotificationTableHintProps) {
    const anchorRef = useRef<HTMLSpanElement>(null);
    const tooltipRef = useRef<HTMLPreElement>(null);
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0, ready: false });

    const show = () => {
        const rect = anchorRef.current?.getBoundingClientRect();
        if (!rect) return;
        setPosition({ top: rect.bottom + 6, left: rect.left, ready: false });
        setOpen(true);
    };

    useLayoutEffect(() => {
        if (!open || !anchorRef.current || !tooltipRef.current) return;

        const margin = 8;
        const anchor = anchorRef.current.getBoundingClientRect();
        const tooltip = tooltipRef.current;
        const maxHeight = Math.min(420, window.innerHeight - margin * 2);
        tooltip.style.maxHeight = `${maxHeight}px`;

        const box = tooltip.getBoundingClientRect();
        let left = anchor.left;
        let top = anchor.bottom + 6;

        if (left + box.width > window.innerWidth - margin) {
            left = Math.max(margin, window.innerWidth - box.width - margin);
        }
        if (top + box.height > window.innerHeight - margin) {
            const above = anchor.top - box.height - 6;
            top = above >= margin ? above : margin;
        }

        setPosition({ top, left, ready: true });
    }, [open, text]);

    return (
        <>
            <span
                ref={anchorRef}
                className="ntf_preview"
                onMouseEnter={show}
                onMouseLeave={() => setOpen(false)}
            >
                {children}
            </span>
            {open && createPortal(
                <pre
                    ref={tooltipRef}
                    className="ntf_table_tooltip"
                    style={{
                        top: position.top,
                        left: position.left,
                        visibility: position.ready ? 'visible' : 'hidden',
                    }}
                >
                    {text}
                </pre>,
                document.body,
            )}
        </>
    );
}
