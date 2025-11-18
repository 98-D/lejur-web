// JournalEntryDialog.tsx
"use client";

import {
    Button,
    Dialog,
    DialogTrigger,
    Input,
    Label,
    ListBox,
    ListBoxItem,
    Modal,
    Popover,
    ComboBox,
    Group,
    TextField,
} from "react-aria-components";
import { useState, useEffect, useRef, useMemo } from "react";
import type { KeyboardEvent } from "react";

type AccountOption = {
    id: string;
    label: string;
};

type JournalLine = {
    id: string;
    account: string;
    memo: string;
    debit: string;
    credit: string;
};

type JournalEntryValues = {
    date: string;
    memo: string;
    lines: {
        account: string;
        memo: string;
        debit: number;
        credit: number;
    }[];
};

type JournalEntryDialogProps = {
    triggerLabel?: string;
    title?: string;
    accounts?: AccountOption[];
    onSubmit?: (values: JournalEntryValues) => void | Promise<void>;
    // new:
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    hideTrigger?: boolean;
};

const mkId = () =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);

const mkLine = (): JournalLine => ({
    id: mkId(),
    account: "",
    memo: "",
    debit: "",
    credit: "",
});

const cellBase =
    "w-full bg-transparent border-b border-white/14 px-2 py-1.5 text-sm " +
    "focus:outline-none focus:border-white/70 placeholder:text-white/30 tabular-nums";

const rightCell = `${cellBase} text-right`;
const leftCell = `${cellBase} text-left`;

const parseMoney = (raw: string): number => {
    const cleaned = raw.replace(/[^0-9.-]/g, "");
    if (!cleaned || cleaned === "-" || cleaned === ".") return 0;
    const n = parseFloat(cleaned);
    return isNaN(n) ? 0 : n;
};

function RawMoneyInput({
                           value,
                           onValueChange,
                           placeholder = "0.00",
                           className,
                       }: {
    value: string;
    onValueChange: (v: string) => void;
    placeholder?: string;
    className?: string;
}) {
    return (
        <input
            type="text"
            inputMode="decimal"
            className={className}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
                const next = e.target.value;
                if (next === "" || /^\-?\d*\.?\d*$/.test(next)) {
                    onValueChange(next);
                }
            }}
            onBlur={() => {
                const num = parseMoney(value);
                if (num === 0) onValueChange("");
                else onValueChange(num.toFixed(2));
            }}
        />
    );
}

const todayISO = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
};

export function JournalEntryDialog({
                                       triggerLabel = "Record journal entry",
                                       title = "Record journal entry",
                                       accounts = [],
                                       onSubmit,
                                       isOpen: controlledOpen,
                                       onOpenChange,
                                       hideTrigger,
                                   }: JournalEntryDialogProps) {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const isOpen = controlledOpen ?? uncontrolledOpen;
    const setIsOpen = onOpenChange ?? setUncontrolledOpen;

    const [date, setDate] = useState(todayISO());
    const [headerMemo, setHeaderMemo] = useState("");
    const [lines, setLines] = useState<JournalLine[]>([mkLine(), mkLine()]);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const firstAccountRef = useRef<HTMLInputElement>(null);

    const resetForm = () => {
        const iso = todayISO();
        setDate(iso);
        setHeaderMemo("");
        setLines([mkLine(), mkLine()]);
        setError(null);
        setSubmitting(false);
    };

    useEffect(() => {
        if (isOpen) {
            resetForm();
            setTimeout(() => firstAccountRef.current?.focus(), 30);
        }
    }, [isOpen]);

    const updateLine = (id: string, patch: Partial<JournalLine>) => {
        setLines((prev) =>
            prev.map((line) => (line.id === id ? { ...line, ...patch } : line)),
        );
    };

    const addLine = () => setLines((prev) => [...prev, mkLine()]);

    const removeLine = (id: string) => {
        setLines((prev) =>
            prev.length <= 2 ? prev : prev.filter((l) => l.id !== id),
        );
    };

    const { totalDebit, totalCredit, diff, isBalanced } = useMemo(() => {
        const debit = lines.reduce((sum, l) => sum + parseMoney(l.debit), 0);
        const credit = lines.reduce((sum, l) => sum + parseMoney(l.credit), 0);
        const d = debit - credit;
        return {
            totalDebit: debit,
            totalCredit: credit,
            diff: d,
            isBalanced: Math.abs(d) < 0.005,
        };
    }, [lines]);

    const plugBalance = () => {
        if (isBalanced || lines.length === 0) return;

        const amount = Math.abs(diff).toFixed(2);
        const isDebit = diff > 0;

        setLines((prev) => {
            const next = [...prev];
            let target = next[next.length - 1];

            if (target.account || target.memo || target.debit || target.credit) {
                target = mkLine();
                next.push(target);
            }

            next[next.length - 1] = {
                ...target,
                account: target.account || "9999 · Balancing entry",
                memo: target.memo || "Auto-balance",
                debit: isDebit ? amount : "",
                credit: isDebit ? "" : amount,
            };

            return next;
        });
    };

    const handleSubmit = async () => {
        setError(null);

        const usedLines = lines.filter(
            (l) =>
                l.account.trim() ||
                l.memo.trim() ||
                l.debit.trim() ||
                l.credit.trim(),
        );

        if (usedLines.length < 2) {
            setError("At least two non-empty lines required.");
            return;
        }

        for (let i = 0; i < usedLines.length; i++) {
            const l = usedLines[i];
            const lineNo = i + 1;
            const account = l.account.trim();
            const debit = parseMoney(l.debit);
            const credit = parseMoney(l.credit);

            if (!account && (l.memo.trim() || debit || credit)) {
                setError(`Line ${lineNo}: Account is required.`);
                return;
            }

            if (debit > 0 && credit > 0) {
                setError(`Line ${lineNo}: Cannot have both debit and credit.`);
                return;
            }

            if (debit === 0 && credit === 0 && (account || l.memo.trim())) {
                setError(
                    `Line ${lineNo}: Must have a debit or credit amount.`,
                );
                return;
            }
        }

        if (!isBalanced) {
            setError(`Out of balance by ${Math.abs(diff).toFixed(2)}.`);
            return;
        }

        if (!onSubmit) {
            setIsOpen(false);
            return;
        }

        try {
            setSubmitting(true);
            await onSubmit({
                date,
                memo: headerMemo.trim(),
                lines: usedLines.map((l) => ({
                    account: l.account.trim(),
                    memo: l.memo.trim(),
                    debit: parseMoney(l.debit),
                    credit: parseMoney(l.credit),
                })),
            });
            setIsOpen(false);
        } catch (err) {
            setError("Failed to post entry.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault();
            void handleSubmit();
        }
    };

    const fmt = (n: number) =>
        n.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

    return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
            {!hideTrigger && (
                <Button className="px-4 py-2 text-sm font-medium rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition">
                    {triggerLabel}
                </Button>
            )}

            <Modal className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
                <Dialog
                    className="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl bg-neutral-950 text-white border border-white/20 shadow-2xl outline-none flex flex-col"
                    onKeyDown={handleKeyDown}
                >
                    {/* header / body / footer unchanged */}
                    {/* ... */}
                </Dialog>
            </Modal>
        </DialogTrigger>
    );
}
