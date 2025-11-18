import {
    MenuTrigger,
    Button,
    Popover,
    Menu,
    MenuItem,
} from "react-aria-components";
import { Link } from "@tanstack/react-router";

const homeButtonClass = [
    "inline-flex items-center justify-center",
    "w-7 h-7 rounded-full",
    "border border-neutral-900/10 bg-white/95 text-neutral-900",
    "dark:border-white/20 dark:bg-white/5 dark:text-white",
    "hover:bg-neutral-900/5 dark:hover:bg-white/10",
    "hover:-translate-y-[0.5px]",
    "hover:shadow-[0_5px_14px_rgba(0,0,0,0.18)]",
    "focus-visible:outline-none focus-visible:ring-1",
    "focus-visible:ring-neutral-900/55 dark:focus-visible:ring-white/65",
    "transition-all duration-140 ease-out",
].join(" ");

const triggerClass = [
    "inline-flex items-center gap-1.5",
    "px-3 py-1.25 rounded-full",
    "text-[10px] font-semibold tracking-[0.14em] uppercase",
    "text-neutral-800 dark:text-white",
    "border border-transparent bg-transparent",
    "hover:bg-neutral-900/5 dark:hover:bg-white/6",
    "hover:border-neutral-900/16 dark:hover:border-white/14",
    "hover:-translate-y-[0.5px]",
    "hover:shadow-[0_5px_16px_rgba(0,0,0,0.14)]",
    "data-[pressed=true]:bg-neutral-900/7 dark:data-[pressed=true]:bg-white/8",
    "data-[pressed=true]:border-neutral-900/20 dark:data-[pressed=true]:border-white/18",
    "data-[expanded=true]:bg-neutral-900/7 dark:data-[expanded=true]:bg-white/8",
    "data-[expanded=true]:border-neutral-900/22 dark:data-[expanded=true]:border-white/20",
    "data-[expanded=true]:shadow-[0_8px_22px_rgba(0,0,0,0.20)]",
    "focus-visible:outline-none focus-visible:ring-1",
    "focus-visible:ring-neutral-900/55 dark:focus-visible:ring-white/60",
    "transition-all duration-140 ease-out",
    "active:scale-[0.98]",
    "select-none",
].join(" ");

const caretClass =
    "text-[7px] translate-y-[0.5px] opacity-80 group-data-[expanded=true]:opacity-100";

const popoverClass = [
    "mt-1.5 min-w-[190px]",
    "rounded-2xl",
    "bg-white/98 dark:bg-[#02040A]/98",
    "border border-neutral-200/85 dark:border-white/14",
    "shadow-[0_16px_52px_rgba(0,0,0,0.22)]",
    "backdrop-blur-xl",
    "py-1 px-1",
    "outline-none",
].join(" ");

const menuClass = "flex flex-col gap-0.5 py-0.5";

const itemClass = [
    "flex items-center justify-between gap-2",
    "px-2.25 py-1.25 rounded-xl",
    "text-[10px] font-normal",
    "text-neutral-900 dark:text-white",
    "cursor-pointer select-none outline-none",
    "hover:bg-neutral-900/4 dark:hover:bg-white/8",
    "data-[hovered=true]:bg-neutral-900/5 dark:data-[hovered=true]:bg-white/10",
    "data-[focused=true]:bg-neutral-900/6 dark:data-[focused=true]:bg-white/12",
    "relative",
    "before:absolute before:left-1.5 before:top-1.25 before:bottom-1.25",
    "before:w-[2px] before:rounded-full before:bg-transparent",
    "hover:before:bg-neutral-900/30 dark:hover:before:bg-white/40",
    "data-[focused=true]:before:bg-neutral-900/50 dark:data-[focused=true]:before:bg-white/60",
    "transition-all duration-120 ease-out",
].join(" ");

const shortcutClass =
    "flex items-center gap-0.5 text-[8px] font-medium text-neutral-500 dark:text-neutral-300";

const kbdClass = [
    "inline-flex items-center justify-center",
    "min-w-[15px] px-1 h-[14px]",
    "rounded-[4px]",
    "border border-neutral-400/40 dark:border-neutral-500/55",
    "bg-neutral-50/95 dark:bg-neutral-900",
    "text-[7.5px] leading-none",
    "text-neutral-800 dark:text-white",
    "font-semibold",
].join(" ");

export function TopNav() {
    return (
        <nav className="mt-2 ml-6">
            <div className="flex items-center gap-3">
                {/* Home / chart of accounts */}
                <Link
                    to="/app/"
                    preload="intent"
                    aria-label="Go to home (Chart of accounts)"
                    className={homeButtonClass}
                >
                    {/* Simple minimal home icon */}
                    <svg
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="w-4.5 h-4.5"
                    >
                        <path
                            d="M3.5 8.2 10 3.5l6.5 4.7v7.1a.9.9 0 0 1-.9.9h-3.7v-4.1H8.1v4.1H4.4a.9.9 0 0 1-.9-.9V8.2Z"
                            className="fill-current"
                        />
                    </svg>
                </Link>

                {/* Transactions */}
                <MenuTrigger>
                    <Button
                        aria-label="Transactions menu"
                        className={triggerClass + " group"}
                    >
                        <span>Transactions</span>
                        <span className={caretClass}>▾</span>
                    </Button>
                    <Popover className={popoverClass}>
                        <Menu className={menuClass}>
                            <MenuItem className={itemClass} id="expense">
                                <span>Record expense</span>
                                <span className={shortcutClass}>
                  <kbd className={kbdClass}>Ctrl</kbd>
                  <span>+</span>
                  <kbd className={kbdClass}>Shift</kbd>
                  <span>+</span>
                  <kbd className={kbdClass}>E</kbd>
                </span>
                            </MenuItem>
                            <MenuItem className={itemClass} id="revenue">
                                <span>Record revenue</span>
                                <span className={shortcutClass}>
                  <kbd className={kbdClass}>Ctrl</kbd>
                  <span>+</span>
                  <kbd className={kbdClass}>Shift</kbd>
                  <span>+</span>
                  <kbd className={kbdClass}>R</kbd>
                </span>
                            </MenuItem>
                            <MenuItem className={itemClass} id="ap">
                                <span>AP entry</span>
                                <span className={shortcutClass}>
                  <kbd className={kbdClass}>Ctrl</kbd>
                  <span>+</span>
                  <kbd className={kbdClass}>Shift</kbd>
                  <span>+</span>
                  <kbd className={kbdClass}>B</kbd>
                </span>
                            </MenuItem>
                            <MenuItem className={itemClass} id="ar">
                                <span>AR entry</span>
                                <span className={shortcutClass}>
                  <kbd className={kbdClass}>Ctrl</kbd>
                  <span>+</span>
                  <kbd className={kbdClass}>Shift</kbd>
                  <span>+</span>
                  <kbd className={kbdClass}>N</kbd>
                </span>
                            </MenuItem>
                            <MenuItem className={itemClass} id="journal">
                                <span>General journal entry</span>
                                <span className={shortcutClass}>
                  <kbd className={kbdClass}>Ctrl</kbd>
                  <span>+</span>
                  <kbd className={kbdClass}>Shift</kbd>
                  <span>+</span>
                  <kbd className={kbdClass}>J</kbd>
                </span>
                            </MenuItem>
                        </Menu>
                    </Popover>
                </MenuTrigger>

                {/* Vendors */}
                <MenuTrigger>
                    <Button
                        aria-label="Contacts menu"
                        className={triggerClass + " group"}
                    >
                        <span>Contacts</span>
                        <span className={caretClass}>▾</span>
                    </Button>
                    <Popover className={popoverClass}>
                        <Menu className={menuClass}>
                            <MenuItem className={itemClass} id="add-vendor">
                                <span>Add new vendor</span>
                            </MenuItem>
                            <MenuItem className={itemClass} id="manage-vendors">
                                <span>Manage vendors</span>
                            </MenuItem>
                            <MenuItem className={itemClass} id="add-customer">
                                <span>Add new customer</span>
                            </MenuItem>
                            <MenuItem className={itemClass} id="manage-customers">
                                <span>Manage customers</span>
                            </MenuItem>
                        </Menu>
                    </Popover>
                </MenuTrigger>



                {/* Reports */}
                <MenuTrigger>
                    <Button
                        aria-label="Reports menu"
                        className={triggerClass + " group"}
                    >
                        <span>Reports</span>
                        <span className={caretClass}>▾</span>
                    </Button>
                    <Popover className={popoverClass}>
                        <Menu className={menuClass}>
                            <MenuItem className={itemClass} id="tb">
                                <span>Trial balance</span>
                            </MenuItem>
                            <MenuItem className={itemClass} id="bs">
                                <span>Balance sheet</span>
                            </MenuItem>
                            <MenuItem className={itemClass} id="pl">
                                <span>Profit &amp; loss</span>
                            </MenuItem>
                            <MenuItem className={itemClass} id="gl">
                                <span>General ledger</span>
                            </MenuItem>
                            <MenuItem className={itemClass} id="ar-aged">
                                <span>AR aged</span>
                            </MenuItem>
                            <MenuItem className={itemClass} id="ap-aged">
                                <span>AP aged</span>
                            </MenuItem>
                        </Menu>
                    </Popover>
                </MenuTrigger>
            </div>
        </nav>
    );
}
