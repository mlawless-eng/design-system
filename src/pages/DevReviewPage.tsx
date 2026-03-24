import { useState } from "react";
import { Search, Plus, Upload, MoreHorizontal } from "lucide-react";
import { EditBusinessUnitModal } from "@/components/EditBusinessUnitModal";

export function DevReviewPage() {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const lineItems = [
        { name: "Tickets Receipt", type: "Receipt", archived: "No" },
        { name: "Credit Facility", type: "Receipt", archived: "No" },
        { name: "Investments", type: "Receipt", archived: "No" },
        { name: "Capital Expenditures", type: "Receipt", archived: "No" },
        { name: "Intracompany Flows", type: "Receipt", archived: "No" },
        { name: "Exchange", type: "Receipt", archived: "No" },
        { name: "Cash Poool Actual", type: "Receipt", archived: "No" },
        { name: "Corporate Accounts", type: "Receipt", archived: "No" },
        { name: "MM_payments", type: "Receipt", archived: "No" },
        { name: "Target Balance Sweep", type: "Receipt", archived: "No" },
        { name: "VAT Payment", type: "Receipt", archived: "No" },
        { name: "Balance Adj", type: "Receipt", archived: "No" },
        { name: "A/R Cash Collections", type: "Receipt", archived: "No" },
        { name: "FX Trading", type: "Receipt", archived: "No" },
        { name: "Bond Redemption", type: "Receipt", archived: "No" },
        { name: "Bond Interest", type: "Receipt", archived: "No" },
        { name: "Tickets Receipt", type: "Special", archived: "Yes" },
        { name: "Payroll", type: "Payments", archived: "Yes" },
    ];

    return (
        <div className="flex flex-col h-full bg-white relative">
            {/* Table Header Bar */}
            <div className="bg-tableheader text-tableheader-foreground px-6 py-4 flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-xl font-normal tracking-wide">Line items list</h1>
                    <p className="text-sm opacity-80 mt-1">Displaying 600 of 6000 items</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-64 pl-4 pr-10 py-1.5 rounded bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all text-sm"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>

                    <button className="text-white hover:text-gray-200 transition-colors">
                        <Plus className="w-5 h-5" />
                    </button>

                    <button className="text-white hover:text-gray-200 transition-colors">
                        <Upload className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Table Data */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-sm text-left font-medium">
                    <thead className="text-xs text-gray-400 uppercase border-b border-gray-100 bg-white sticky top-0 z-10">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Type</th>
                            <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Archived</th>
                            <th scope="col" className="px-6 py-4 w-12 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100/60 bg-white">
                        {lineItems.map((item, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-50/80 transition-colors group cursor-pointer"
                                onClick={() => setIsEditModalOpen(true)}
                            >
                                <td className="px-6 py-4 text-gray-700">{item.name}</td>
                                <td className="px-6 py-4 text-gray-500">{item.type}</td>
                                <td className="px-6 py-4 text-gray-500">{item.archived}</td>
                                <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        className="text-primary hover:text-blue-700 p-1 rounded hover:bg-blue-50"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsEditModalOpen(true);
                                        }}
                                    >
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Slide-over Modal */}
            <EditBusinessUnitModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            />
        </div>
    );
}
