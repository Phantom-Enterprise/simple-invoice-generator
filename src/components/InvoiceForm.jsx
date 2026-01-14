import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export function InvoiceForm({ data, onChange }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Handle nested properties (sender.name, items[0].quantity, etc) would be complex with simple name
        // So for top level:
        onChange({ ...data, [name]: value });
    };

    const handleNestedChange = (section, field, value) => {
        onChange({
            ...data,
            [section]: { ...data[section], [field]: value }
        });
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...data.items];
        newItems[index][field] = value;
        onChange({ ...data, items: newItems });
    };

    const addItem = () => {
        onChange({
            ...data,
            items: [...data.items, { id: Date.now(), description: '', quantity: 1, rate: 0 }]
        });
    };

    const removeItem = (index) => {
        const newItems = data.items.filter((_, i) => i !== index);
        onChange({ ...data, items: newItems });
    };

    return (
        <div className="space-y-8">
            {/* Basics */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Invoice Number</label>
                    <input
                        type="text"
                        name="invoiceNumber"
                        value={data.invoiceNumber}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={data.date}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
            </div>

            {/* From / To */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <h3 className="font-medium text-slate-900">From (Sender)</h3>
                    <input
                        placeholder="Name"
                        value={data.sender.name}
                        onChange={(e) => handleNestedChange('sender', 'name', e.target.value)}
                        className="input-field"
                    />
                    <input
                        placeholder="Email"
                        value={data.sender.email}
                        onChange={(e) => handleNestedChange('sender', 'email', e.target.value)}
                        className="input-field"
                    />
                    <textarea
                        placeholder="Address"
                        value={data.sender.address}
                        onChange={(e) => handleNestedChange('sender', 'address', e.target.value)}
                        className="input-field min-h-[80px]"
                    />
                </div>

                <div className="space-y-3">
                    <h3 className="font-medium text-slate-900">To (Client)</h3>
                    <input
                        placeholder="Name"
                        value={data.recipient.name}
                        onChange={(e) => handleNestedChange('recipient', 'name', e.target.value)}
                        className="input-field"
                    />
                    <input
                        placeholder="Email"
                        value={data.recipient.email}
                        onChange={(e) => handleNestedChange('recipient', 'email', e.target.value)}
                        className="input-field"
                    />
                    <textarea
                        placeholder="Address"
                        value={data.recipient.address}
                        onChange={(e) => handleNestedChange('recipient', 'address', e.target.value)}
                        className="input-field min-h-[80px]"
                    />
                </div>
            </div>

            {/* Items */}
            <div>
                <h3 className="font-medium text-slate-900 mb-3">Line Items</h3>
                <div className="space-y-3">
                    {data.items.map((item, index) => (
                        <div key={item.id} className="flex gap-2 items-start">
                            <div className="flex-grow">
                                <input
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                    className="input-field"
                                />
                            </div>
                            <div className="w-20">
                                <input
                                    type="number"
                                    placeholder="Qty"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                                    className="input-field"
                                />
                            </div>
                            <div className="w-24">
                                <input
                                    type="number"
                                    placeholder="Rate"
                                    value={item.rate}
                                    onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                                    className="input-field"
                                />
                            </div>
                            <button
                                onClick={() => removeItem(index)}
                                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={addItem}
                        className="btn-secondary w-full flex items-center justify-center gap-2 mt-4"
                    >
                        <Plus size={16} />
                        <span>Add Item</span>
                    </button>
                </div>
            </div>

            {/* Footer Details */}
            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                    <textarea
                        value={data.notes}
                        onChange={handleChange}
                        name="notes"
                        className="input-field min-h-[80px]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Terms</label>
                    <textarea
                        value={data.terms}
                        onChange={handleChange}
                        name="terms"
                        className="input-field min-h-[80px]"
                    />
                </div>
            </div>
        </div>
    );
}
