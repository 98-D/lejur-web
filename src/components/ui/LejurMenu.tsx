import {
    MenuTrigger,
    Button,
    Popover,
    Menu,
    MenuItem,
    Separator,
} from "react-aria-components";
import { MenuIcon } from "lucide-react";

export function LejurKebabMenu() {
    return (
        <MenuTrigger>
            <Button
                aria-label="Menu"
                className={`
          inline-flex items-center justify-center
          h-7 w-7 rounded-full
          border border-neutral-900/10 bg-white/95 text-neutral-900
          dark:border-white/15 dark:bg-white/5 dark:text-white/90
          shadow-[0_4px_14px_rgba(15,23,42,0.10)]
          hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(15,23,42,0.22)]
          hover:bg-neutral-900/3 dark:hover:bg-white/8
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-neutral-900/60 dark:focus-visible:ring-white/70
          active:translate-y-0 active:shadow-[0_2px_8px_rgba(15,23,42,0.20)]
          transition-all duration-150 ease-out
        `}
            >
                <MenuIcon className="w-3.5 h-3.5" strokeWidth={1.75} />
            </Button>

            <Popover
                offset={6}
                className={`
          z-50
          rounded-2xl
          border border-neutral-900/8 dark:border-white/10
          bg-white/98 dark:bg-neutral-950/98
          shadow-[0_18px_55px_rgba(15,23,42,0.24)]
          backdrop-blur-xl
          px-1.5 py-1.25
          min-w-[160px]
        `}
            >
                <Menu
                    className={`
            flex flex-col gap-0.5
            text-[11px] font-medium
            text-neutral-800 dark:text-neutral-200
          `}
                >
                    <MenuItem
                        id="open"
                        className={({ isFocused, isPressed }) => `
              flex items-center gap-1.5 px-2.25 py-1.5 rounded-xl
              cursor-default select-none
              ${isFocused ? "bg-neutral-900/4 dark:bg-white/6" : ""}
              ${isPressed ? "bg-neutral-900/8 dark:bg-white/10" : ""}
              transition-colors
            `}
                    >
                        Open
                    </MenuItem>

                    <MenuItem
                        id="rename"
                        className={({ isFocused, isPressed }) => `
              flex items-center gap-1.5 px-2.25 py-1.5 rounded-xl
              cursor-default select-none
              ${isFocused ? "bg-neutral-900/4 dark:bg-white/6" : ""}
              ${isPressed ? "bg-neutral-900/8 dark:bg-white/10" : ""}
              transition-colors
            `}
                    >
                        Rename…
                    </MenuItem>

                    <MenuItem
                        id="duplicate"
                        className={({ isFocused, isPressed }) => `
              flex items-center gap-1.5 px-2.25 py-1.5 rounded-xl
              cursor-default select-none
              ${isFocused ? "bg-neutral-900/4 dark:bg-white/6" : ""}
              ${isPressed ? "bg-neutral-900/8 dark:bg-white/10" : ""}
              transition-colors
            `}
                    >
                        Duplicate
                    </MenuItem>

                    <MenuItem
                        id="share"
                        className={({ isFocused, isPressed }) => `
              flex items-center gap-1.5 px-2.25 py-1.5 rounded-xl
              cursor-default select-none
              ${isFocused ? "bg-neutral-900/4 dark:bg-white/6" : ""}
              ${isPressed ? "bg-neutral-900/8 dark:bg-white/10" : ""}
              transition-colors
            `}
                    >
                        Share…
                    </MenuItem>

                    <Separator className="my-0.5 h-px bg-neutral-900/5 dark:bg-white/8" />

                    <MenuItem
                        id="delete"
                        className={({ isFocused, isPressed }) => `
              flex items-center gap-1.5 px-2.25 py-1.5 rounded-xl
              cursor-default select-none
              text-[11px]
              text-red-600/90 dark:text-red-400/95
              ${isFocused ? "bg-red-50 dark:bg-red-500/10" : ""}
              ${isPressed ? "bg-red-100 dark:bg-red-500/18" : ""}
              transition-colors
            `}
                    >
                        Delete…
                    </MenuItem>
                </Menu>
            </Popover>
        </MenuTrigger>
    );
}
