"use client";

import {
    Button,
    Dialog,
    DialogTrigger,
    Heading,
    Input,
    Label,
    Modal,
    TextField,
} from "react-aria-components";

type TransactionValues = {
    date: string;
    memo: string;
    amount: number;
};

type TransactionDialogProps = {
    triggerLabel?: string;
    title?: string;
    onSubmit?: (values: TransactionValues) => void | Promise<void>;
};

export function TransactionDialog({
                                      triggerLabel = "Record transaction",
                                      title = "Record transaction",
                                      onSubmit,
                                  }: TransactionDialogProps) {
    return (
        <DialogTrigger>
            <Button
                className="
          inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium
          rounded-xl border border-white/10 bg-white/5 text-black/80
          hover:bg-white/10
          focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
        "
            >
                {triggerLabel}
            </Button>

            <Modal
                isDismissable
                className="
          fixed inset-0 z-50 flex items-center justify-center
          bg-black/60 backdrop-blur-sm
        "
            >
                <Dialog
                    className="
            w-full max-w-xl rounded-2xl
            bg-black text-white
            border border-white/12 shadow-2xl
            p-5 space-y-4
            outline-none
          "
                >
                    <form
                        className="space-y-4"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const fd = new FormData(e.currentTarget);
                            const date = (fd.get("date") as string) || "";
                            const memo = (fd.get("memo") as string) || "";
                            const amountRaw = (fd.get("amount") as string) || "0";
                            const amount = parseFloat(amountRaw.replace(/,/g, "") || "0");

                            if (onSubmit) {
                                await onSubmit({ date, memo, amount });
                            }
                            // Button with slot="close" will actually close the dialog.
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3">
                            <Heading
                                slot="title"
                                className="text-sm font-medium tracking-tight"
                            >
                                {title}
                            </Heading>

                            <Button
                                slot="close"
                                aria-label="Close"
                                className="
                  h-6 w-6 inline-flex items-center justify-center
                  rounded-full border border-white/15 text-[10px]
                  hover:bg-white/10 hover:border-white/40
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
                "
                            >
                                ✕
                            </Button>
                        </div>

                        {/* Fields */}
                        <div className="grid grid-cols-2 gap-3 text-[11px]">
                            <TextField className="space-y-1">
                                <Label className="text-[11px] uppercase tracking-[0.14em] text-white/80">
                                    Date
                                </Label>
                                <Input
                                    name="date"
                                    type="date"
                                    required
                                    className="
                    w-full bg-transparent border-b border-white/18
                    px-1 py-1 text-[11px]
                    focus:outline-none focus:border-white/70
                  "
                                />
                            </TextField>

                            <TextField className="space-y-1 col-span-1">
                                <Label className="text-[9px] uppercase tracking-[0.14em] text-white/40">
                                    Amount
                                </Label>
                                <Input
                                    name="amount"
                                    inputMode="decimal"
                                    required
                                    className="
                    w-full bg-transparent border-b border-white/18
                    px-1 py-1 text-[11px] text-right
                    focus:outline-none focus:border-white/70
                  "
                                />
                            </TextField>

                            <TextField className="space-y-1 col-span-2">
                                <Label className="text-[9px] uppercase tracking-[0.14em] text-white/40">
                                    Memo
                                </Label>
                                <Input
                                    name="memo"
                                    placeholder="(optional) describe the transaction"
                                    className="
                    w-full bg-transparent border-b border-white/18
                    px-1 py-1 text-[11px]
                    placeholder:text-white/25
                    focus:outline-none focus:border-white/70
                  "
                                />
                            </TextField>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/8">
                            <Button
                                slot="close"
                                type="button"
                                className="
                  px-2.5 py-1.5 text-[10px] rounded-lg
                  border border-white/10 text-white/55
                  hover:bg-white/6 hover:text-white
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                "
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                slot="close"
                                className="
                  px-3 py-1.5 text-[10px] font-medium rounded-lg
                  bg-white text-black
                  hover:bg-white/90
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                "
                            >
                                Post
                            </Button>
                        </div>
                    </form>
                </Dialog>
            </Modal>
        </DialogTrigger>
    );
}
