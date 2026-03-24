import { ArrowRightLeft, Layers } from "lucide-react";

export function Sidebar() {
    return (
        <aside className="w-64 bg-sidebar border-r border-border h-full flex flex-col pt-6 shrink-0">
            <nav className="flex flex-col gap-1 px-3">
                {/* Manage Bu's Link */}
                <a
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-primary rounded-md transition-colors"
                >
                    <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Manage Bu's</span>
                </a>

                {/* Manage Line Items Link (Active State) */}
                <a
                    href="#"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-primary bg-accent/50 rounded-md relative"
                >
                    {/* Active left indicator */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-primary rounded-r-md" />
                    <ArrowRightLeft className="w-4 h-4 text-primary" />
                    <span className="font-semibold">Manage Line items</span>
                </a>

                {/* Design System Link */}
                <a
                    href="/design-system"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-primary rounded-md transition-colors"
                >
                    <Layers className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Design System</span>
                </a>
            </nav>
        </aside>
    );
}
