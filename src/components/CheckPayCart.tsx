'use client';
import React, { useState, useEffect } from 'react';
import { ChatBubbleLeftRightIcon, PlusIcon, MinusIcon, CreditCardIcon } from '@heroicons/react/24/outline';

type CartItem = {
    id: string;
    title: string;
    color?: string;
    seller?: string;
    price: number;
    discount?: number;
    qty: number;
    image: string;
    deliveryTags?: string[];
};

type CheckoutSummary = {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
};

type CheckPayCartProps = {
    onSummaryUpdate: (summary: CheckoutSummary) => void;
};

const currency = (num: number) => {
    return num.toLocaleString('fa-IR');
};

export default function CheckPayCart({ onSummaryUpdate }: CheckPayCartProps) {
    const [items, setItems] = useState<CartItem[]>([
        {
            id: '1',
            title: 'هدفون بلوتوثی اوی مدل A897BL',
            color: 'مشکی',
            seller: 'دلفین تک',
            price: 1625000,
            discount: 132500,
            qty: 1,
            image: '/images/headphone.jpg',
            deliveryTags: ['ارسال دیجی‌کالا', 'ارسال سریع (تهران)'],
        },
        {
            id: '2',
            title: 'کابل شارژ Type-C',
            color: 'سفید',
            seller: 'کابل‌چی',
            price: 125000,
            qty: 2,
            image: '/images/cable.jpg',
            deliveryTags: ['ارسال عادی'],
        },
    ]);

    const [address, setAddress] = useState({ fullName: '', phone: '', addressText: '' });
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [discountCode, setDiscountCode] = useState('');
    const [showChat, setShowChat] = useState(false);

    const updateQty = (id: string, delta: number) => {
        setItems(prev => prev.map(it => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it)));
    };

    const subtotal = items.reduce((s, it) => s + it.price * it.qty - (it.discount || 0), 0);
    const shipping = shippingMethod === 'express' ? 50000 : 20000;
    const tax = Math.round(subtotal * 0.09);
    const discountValue = discountCode === 'CHECK10' ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal + shipping + tax - discountValue;

    useEffect(() => {
        onSummaryUpdate({ subtotal, shipping, tax, total });
    }, [subtotal, shipping, tax, total, onSummaryUpdate]);

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">صفحه پرداخت یک‌مرحله‌ای</h1>

            <div className="space-y-4 sm:space-y-6">
                {/* Cart Items */}
                <section className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                    <h2 className="text-base sm:text-lg font-medium mb-3">خلاصه سفارش</h2>
                    <div className="space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="flex flex-col sm:flex-row gap-4 items-start">
                                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gray-50 rounded-md flex items-center justify-center border">
                                    <img src={item.image} alt={item.title} className="object-contain max-h-16 sm:max-h-24" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm sm:text-base font-semibold">{item.title}</h3>
                                    <p className="text-xs sm:text-sm text-gray-500">{item.color} • فروشنده: {item.seller}</p>
                                    <ul className="text-xs sm:text-sm text-gray-500 mt-2">
                                        {item.deliveryTags?.map((t, i) => (
                                            <li key={i}>• {t}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                                    <div className="flex items-center border rounded-md px-2">
                                        <button onClick={() => updateQty(item.id, -1)} className="p-1" aria-label="decrease">
                                            <MinusIcon className="w-4 h-4" />
                                        </button>
                                        <div className="px-2 sm:px-3 text-sm">{item.qty}</div>
                                        <button onClick={() => updateQty(item.id, 1)} className="p-1" aria-label="increase">
                                            <PlusIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs sm:text-sm text-gray-500">قیمت واحد</div>
                                        <div className="font-medium text-sm sm:text-lg">{currency(item.price)}</div>
                                        {item.discount ? <div className="text-xs sm:text-sm text-rose-600">تخفیف {currency(item.discount)}</div> : null}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-start">
                        <button onClick={() => alert('ادامه به خرید بعدی')} className="text-xs sm:text-sm underline">انتقال به خرید بعدی</button>
                    </div>
                </section>

                {/* Address Form */}
                <section className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                    <h2 className="text-base sm:text-lg font-medium mb-3">آدرس ارسال</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            className="border p-2 rounded text-sm w-full"
                            placeholder="نام و نام خانوادگی"
                            value={address.fullName}
                            onChange={e => setAddress({ ...address, fullName: e.target.value })}
                        />
                        <input
                            className="border p-2 rounded text-sm w-full"
                            placeholder="شماره تماس"
                            value={address.phone}
                            onChange={e => setAddress({ ...address, phone: e.target.value })}
                        />
                    </div>
                    <textarea
                        className="border mt-3 p-2 rounded w-full text-sm"
                        placeholder="آدرس کامل"
                        value={address.addressText}
                        onChange={e => setAddress({ ...address, addressText: e.target.value })}
                    />
                    <div className="mt-3 text-xs sm:text-sm text-gray-500">فرض شده که امکان انتخاب موقعیت مکانی هم وجود دارد (آیکون نقشه).</div>
                </section>

                {/* Shipping Method */}
                <section className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                    <h2 className="text-base sm:text-lg font-medium mb-3">روش ارسال و زمان تقریبی</h2>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 text-sm sm:text-base">
                            <input type="radio" name="shipping" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} />
                            <div className="flex-1">ارسال استاندارد — تحویل ۲-۴ روز</div>
                            <div className="font-medium">{currency(20000)}</div>
                        </label>
                        <label className="flex items-center gap-2 text-sm sm:text-base">
                            <input type="radio" name="shipping" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} />
                            <div className="flex-1">ارسال فوری — تحویل امروز/فردا</div>
                            <div className="font-medium">{currency(50000)}</div>
                        </label>
                    </div>
                </section>

                {/* Payment Method */}
                <section className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                    <h2 className="text-base sm:text-lg font-medium mb-3">روش پرداخت</h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-sm sm:text-base">
                        <label className="flex items-center gap-2">
                            <input type="radio" name="pay" defaultChecked />
                            <span>پرداخت اینترنتی</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" name="pay" />
                            <span>پرداخت در محل</span>
                        </label>
                    </div>
                    <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <input
                            value={discountCode}
                            onChange={e => setDiscountCode(e.target.value)}
                            placeholder="کد تخفیف"
                            className="border p-2 rounded flex-1 text-sm w-full"
                        />
                        <button onClick={() => alert('اعمال کد')} className="px-3 py-2 bg-gray-100 rounded text-sm sm:text-base">
                            اعمال
                        </button>
                    </div>
                    <div className="mt-3 flex flex-col sm:flex-row justify-between gap-2">
                        <button
                            className="flex items-center gap-2 text-xs sm:text-sm underline"
                            onClick={() => setShowChat(true)}
                        >
                            <ChatBubbleLeftRightIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                            پشتیبانی فوری
                        </button>
                        <div className="text-right">
                            <div className="text-xs sm:text-sm text-gray-500">جمع جزئی</div>
                            <div className="font-semibold text-sm sm:text-lg">{currency(subtotal)}</div>
                        </div>
                    </div>
                </section>

                {/* Summary Card */}
                <aside className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                    <h3 className="text-base sm:text-lg font-medium mb-3">خلاصه پرداخت</h3>
                    <div className="space-y-2 text-gray-600 text-sm sm:text-base">
                        <div className="flex justify-between">
                            <span>جمع اقلام</span>
                            <span>{currency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>هزینه ارسال</span>
                            <span>{currency(shipping)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>مالیات</span>
                            <span>{currency(tax)}</span>
                        </div>
                        {discountValue > 0 && (
                            <div className="flex justify-between text-rose-600">
                                <span>تخفیف</span>
                                <span>-{currency(discountValue)}</span>
                            </div>
                        )}
                        <div className="border-t mt-3 pt-3 flex justify-between items-center">
                            <div>
                                <div className="text-xs sm:text-sm text-gray-500">مبلغ قابل پرداخت</div>
                                <div className="text-lg sm:text-xl font-bold">{currency(total)}</div>
                            </div>
                            <button
                                className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2 text-sm sm:text-base"
                                onClick={() => alert('پرداخت آزمایشی')}
                            >
                                <CreditCardIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                                پرداخت
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 sm:mt-6">
                        <h4 className="text-sm sm:text-base font-medium mb-2">چک‌لیست آماده‌سازی</h4>
                        <ul className="text-xs sm:text-sm text-gray-600 list-disc pr-5">
                            <li>آدرس وارد شده تایید شده باشد</li>
                            <li>موجودی و قفل پرداخت تست شود</li>
                            <li>درگاه آزمایشی متصل</li>
                        </ul>
                    </div>
                </aside>
            </div>

            {/* Chat Modal */}
            {showChat && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
                    <div className="bg-white w-full max-w-md rounded-xl p-4 sm:p-6">
                        <div className="flex justify-between items-center mb-3">
                            <div className="text-base sm:text-lg font-medium">پشتیبانی سریع (AI)</div>
                            <button onClick={() => setShowChat(false)} className="text-gray-500 text-sm">بستن</button>
                        </div>
                        <div className="h-48 sm:h-56 border rounded p-2 overflow-auto text-xs sm:text-sm text-gray-600">
                            این پنل می‌تواند به یک چت‌بات متصل شود — نمونه پاسخ: سلام! چطور کمکتون کنم؟
                        </div>
                        <div className="mt-3 flex flex-col sm:flex-row gap-2">
                            <input
                                className="flex-1 border rounded p-2 text-sm"
                                placeholder="پیام خود را بنویسید..."
                            />
                            <button className="px-3 py-2 bg-blue-600 text-white rounded text-sm">ارسال</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500 text-center">نسخه MVP — CheckPay</div>
        </div>
    );
}