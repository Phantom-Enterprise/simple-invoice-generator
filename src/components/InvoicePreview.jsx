import React from 'react';

export function InvoicePreview({ data }) {
    const calculateResult = () => {
        const subtotal = data.items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
        const tax = 0; // Simple for now
        const total = subtotal + tax;
        return { subtotal, total };
    };

    const { subtotal, total } = calculateResult();

    return (
        <div className="w-full bg-white p-8 md:p-12 text-slate-900 text-sm md:text-base">
            {/* Header */}
            <div className="flex justify-between items-start mb-12">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">INVOICE</h1>
                    <p className="text-slate-500 font-medium">#{data.invoiceNumber}</p>
                </div>
                <div className="text-right">
                    <div className="text-slate-500 mb-1">Date</div>
                    <div className="font-semibold mb-4">{data.date}</div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">From</div>
                    <div className="font-semibold text-lg mb-1">{data.sender.name || 'Your Name'}</div>
                    <div className="text-slate-500 whitespace-pre-wrap">{data.sender.address}</div>
                    <div className="text-slate-500 mt-1">{data.sender.email}</div>
                </div>
                <div className="text-right">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bill To</div>
                    <div className="font-semibold text-lg mb-1">{data.recipient.name || 'Client Name'}</div>
                    <div className="text-slate-500 whitespace-pre-wrap">{data.recipient.address}</div>
                    <div className="text-slate-500 mt-1">{data.recipient.email}</div>
                </div>
            </div>

            {/* Items Table */}
            <div className="mb-12">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-slate-100">
                            <th className="text-left py-3 font-semibold">Description</th>
                            <th className="text-right py-3 font-semibold w-20">Qty</th>
                            <th className="text-right py-3 font-semibold w-24">Rate</th>
                            <th className="text-right py-3 font-semibold w-24">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {data.items.map((item) => (
                            <tr key={item.id}>
                                <td className="py-4 text-slate-700">{item.description}</td>
                                <td className="py-4 text-right text-slate-700">{item.quantity}</td>
                                <td className="py-4 text-right text-slate-700">{data.currency}{item.rate.toFixed(2)}</td>
                                <td className="py-4 text-right font-medium text-slate-900">
                                    {data.currency}{(item.quantity * item.rate).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-12">
                <div className="w-64 space-y-3">
                    <div className="flex justify-between text-slate-500">
                        <span>Subtotal</span>
                        <span>{data.currency}{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-slate-900 pt-3 border-t border-slate-100">
                        <span>Total</span>
                        <span>{data.currency}{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Footer Notes */}
            <div className="grid grid-cols-2 gap-8 border-t border-slate-100 pt-8">
                <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Notes</div>
                    <div className="text-slate-500 text-sm whitespace-pre-wrap">{data.notes}</div>
                </div>
                <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Terms</div>
                    <div className="text-slate-500 text-sm whitespace-pre-wrap">{data.terms}</div>
                </div>
            </div>
        </div>
    );
}
