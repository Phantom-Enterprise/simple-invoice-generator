import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { InvoiceForm } from './components/InvoiceForm';
import { InvoicePreview } from './components/InvoicePreview';
import { Printer } from 'lucide-react';

function App() {
  const [data, setData] = useState({
    invoiceNumber: 'INV-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    currency: '$',
    sender: {
      name: '',
      address: '',
      email: '',
    },
    recipient: {
      name: '',
      address: '',
      email: '',
    },
    items: [
      { id: 1, description: 'Consulting Services', quantity: 1, rate: 100 }
    ],
    notes: 'Thank you for your business!',
    terms: 'Payment due within 14 days.'
  });

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Invoice ${data.invoiceNumber}`,
    onAfterPrint: () => console.log('Print finished'),
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 print:p-0 print:bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Invoice Generator
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePrint}
                className="btn-primary flex items-center gap-2"
              >
                <Printer size={18} />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:block print:w-full print:max-w-none">
          {/* Editor Section */}
          <div className="space-y-6 print:hidden">
            <div className="glass-panel p-6">
              <h2 className="text-lg font-semibold mb-4">Invoice Details</h2>
              <InvoiceForm data={data} onChange={setData} />
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="shadow-xl rounded-none md:rounded-lg overflow-hidden ring-1 ring-slate-900/5 bg-white">
              <div ref={componentRef}>
                <InvoicePreview data={data} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
