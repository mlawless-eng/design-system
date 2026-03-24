import { X, HelpCircle } from "lucide-react";

export function EditBusinessUnitModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-start bg-black/20 backdrop-blur-sm">
            <div
                className="w-[500px] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0"
                style={{ marginLeft: "256px" }} // offset by sidebar width roughly if we want it overlaying main content, or 0 if it covers sidebar too
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Edit $Business unit</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Scrollable Form Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* Section: Business unit details */}
                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Business unit details</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium flex items-center gap-1.5 text-gray-700">
                                    Business unit name*
                                    <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                                </label>
                                <input type="text" className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium flex items-center gap-1.5 text-gray-700">
                                    Short Code
                                    <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                                </label>
                                <input type="text" className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium flex items-center gap-1.5 text-gray-700">
                                Description
                            </label>
                            <textarea
                                rows={3}
                                defaultValue="Description"
                                className="w-full border border-gray-200 rounded px-3 py-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium flex items-center gap-1.5 text-gray-700">
                                    Local Currency*
                                    <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                                </label>
                                <select className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                                    <option>select currency</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium flex items-center gap-1.5 text-gray-700">
                                    Country*
                                    <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                                </label>
                                <select className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                                    <option>Select Country</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <hr className="border-gray-100" />

                    {/* Section: Custom fields */}
                    <section className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Custom fields</h3>

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium flex items-center justify-between text-gray-700">
                                    Amount limited *
                                    <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                                </label>
                                <select className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                                    <option>Amount limited?</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium flex items-center justify-between text-gray-700">
                                    Business type*
                                    <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                                </label>
                                <select className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                                    <option>Business type*</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium flex items-center justify-between text-gray-700">
                                    Legal type*
                                    <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                                </label>
                                <select className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                                    <option>Legal type</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium flex items-center justify-between text-gray-700">
                                    Percentage cash locked*
                                    <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                                </label>
                                <select className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                                    <option>Percentage cash locked</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium flex items-center justify-between text-gray-700">
                                    Functional area*
                                    <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
                                </label>
                                <select className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                                    <option>Functional area</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <label className="text-xs font-medium text-gray-700">Historic discharge ? (do not update)</label>
                                <div className="w-10 h-5 bg-blue-400 rounded-full relative cursor-pointer border border-blue-500 shadow-sm">
                                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform" />
                                </div>
                            </div>

                        </div>
                    </section>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-gray-100 flex justify-end bg-gray-50/50">
                    <button
                        onClick={onClose}
                        className="px-8 py-2 bg-[#2d9dd9] hover:bg-[#258ac2] text-white font-medium text-sm rounded transition-colors shadow-sm"
                    >
                        SAVE
                    </button>
                </div>

            </div>
        </div>
    );
}
