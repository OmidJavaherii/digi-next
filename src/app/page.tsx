'use client';
import React from 'react';
import CheckPayCart from '@/components/CheckPayCart';

type CheckoutSummary = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

export default function CheckoutPage() {
  const [summary, setSummary] = React.useState<CheckoutSummary>({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  });

  const currency = (num: number) => {
    return num.toLocaleString('fa-IR');
  };

  const handleSummaryUpdate = (newSummary: CheckoutSummary) => {
    setSummary(newSummary);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">چک پی</h1>
          <nav className="mt-2 sm:mt-0 flex justify-center items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">خانه</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">پشتیبانی</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Cart Section */}
          <section className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl shadow-md">
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">سبد خرید شما</h2>
            <CheckPayCart onSummaryUpdate={handleSummaryUpdate} />
          </section>

          {/* Summary Section */}
          <aside className="bg-white p-4 sm:p-6 rounded-2xl shadow-md lg:sticky lg:top-4 h-fit">
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-700">خلاصه سفارش</h2>
            <div className="space-y-3 text-gray-600 text-sm sm:text-base">
              <div className="flex justify-between">
                <span>جمع اقلام</span>
                <span>{currency(summary.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>هزینه ارسال</span>
                <span>{currency(summary.shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>مالیات</span>
                <span>{currency(summary.tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-800 border-t pt-3">
                <span>مبلغ قابل پرداخت</span>
                <span>{currency(summary.total)}</span>
              </div>
            </div>
            <button
              className="mt-4 sm:mt-6 w-full bg-blue-600 text-white py-2 sm:py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm sm:text-base"
              onClick={() => alert('پرداخت آزمایشی')}
            >
              پرداخت
            </button>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-6 sm:mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-center text-xs sm:text-sm text-gray-500">
          © 2025 چک پی. تمامی حقوق محفوظ است.
        </div>
      </footer>
    </main>
  );
}