// src/components/CurrentUserPill.tsx

type CurrentUserPillProps = {
    email: string;
    name?: string | null;
    image?: string | null;
    size?: "sm" | "md";
};

function getInitials(name?: string | null, email?: string | null): string {
    // Prefer name if it's not garbage
    if (name && name.trim().length > 0) {
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) {
            // Single word name -> first two letters
            return parts[0].slice(0, 2).toUpperCase();
        }
        const first = parts[0][0] ?? "";
        const last = parts[parts.length - 1][0] ?? "";
        return (first + last).toUpperCase();
    }

    // Fall back to email
    if (email && email.trim().length > 0) {
        const local = email.split("@")[0] ?? "";
        const letters = local.replace(/[^a-zA-Z0-9]/g, "");
        if (!letters) return "?";
        return letters.slice(0, 2).toUpperCase();
    }

    return "?";
}

export function CurrentUserPill({
                                    email,
                                    name,
                                    image,
                                    size = "sm",
                                }: CurrentUserPillProps) {
    const label =
        name && name.trim().length > 0 ? name.trim() : email;
    const initials = getInitials(name, email);

    const sizing =
        size === "sm"
            ? {
                pill: "h-8 px-3 text-[11px]",
                avatar: "h-6 w-6 text-[11px]",
                showEmail: false,
            }
            : {
                pill: "h-9 px-3.5 text-xs",
                avatar: "h-7 w-7 text-[12px]",
                showEmail: true,
            };

    return (
        <div
            className={`
        inline-flex items-center gap-2 rounded-full
        bg-neutral-900 text-neutral-50
        border border-neutral-700
        ${sizing.pill}
      `}
            title={email}
        >
            {/* Avatar */}
            <div
                className={`
          flex items-center justify-center rounded-full overflow-hidden
          bg-sky-500
          ${sizing.avatar}
        `}
            >
                {image ? (
                    <img
                        src={image}
                        alt={label}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span className="font-semibold leading-none">
            {initials}
          </span>
                )}
            </div>

            {/* Text */}
            <div className="flex flex-col leading-tight">
        <span className="font-medium truncate max-w-[140px]">
          {label}
        </span>
                {sizing.showEmail && email !== label && (
                    <span className="text-[10px] text-neutral-400 truncate max-w-[160px]">
            {email}
          </span>
                )}
            </div>

            {/* Status dot */}
            <span className="ml-1 h-2 w-2 rounded-full bg-emerald-400" />
        </div>
    );
}
