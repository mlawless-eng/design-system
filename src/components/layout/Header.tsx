import { Bell, Settings, HelpCircle } from "lucide-react";

export function Header() {
    return (
        <header className="h-[60px] bg-header text-header-foreground flex items-center justify-between px-6 shrink-0 z-10 shadow-sm relative">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                    {/* Faking the CashAnalytics Logo */}
                    <div className="flex items-end text-xl font-bold tracking-tight">
                        <span className="text-blue-400 mr-1 text-sm">|il</span> CashAnalytics
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
                    <a href="#" className="hover:text-white transition-colors">Forecasts</a>
                    <a href="#" className="hover:text-white transition-colors">Treasury</a>
                    <a href="#" className="hover:text-white transition-colors">Reports</a>
                    <a href="#" className="hover:text-white transition-colors">SmartLedgers</a>
                </nav>
            </div>

            <div className="flex items-center gap-4 text-gray-300">
                <button className="hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                </button>
                <button className="hover:text-white transition-colors">
                    <HelpCircle className="w-5 h-5" />
                </button>
                <button className="hover:text-white transition-colors">
                    <Settings className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
}
