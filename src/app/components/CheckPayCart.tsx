// CheckPay Cart Page - Single-file React component
// Framework: Next.js (React)
// Language: TypeScript (tsx)
// Styling: Tailwind CSS
// Usage: Place this file in /components or /app/(page) and import into a Next.js page.
// Suggested additional packages: heroicons (for icons) -> npm i @heroicons/react
// Notes: This is a standalone component implementing the cart page wireframe you sketched.

import React, { useState } from 'react';
import { ChatAlt2Icon, PlusIcon, MinusIcon, CashIcon, CreditCardIcon } from '@heroicons/react/outline';

type CartItem = {
    id: string;
    title: string;
    color?: string;
    seller?: string;
    price: number; // base price
    discount?: number; // discount amount
    qty: number;
    image: string;
    deliveryTags?: string[];
};

const currency = (num: number) => {
    return num.toLocaleString('fa-IR');
};

export default function CheckPayCart() {
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

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">CheckPay — صفحه پرداخت یک‌مرحله‌ای</h1>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* LEFT: Cart items & address form (col-span 2) */}
                <div className="lg:col-span-2 space-y-4">
                    <section className="bg-white rounded-lg p-4 shadow-sm">
                        <h2 className="font-medium mb-3">خلاصه سفارش</h2>
                        <div className="space-y-3">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-4 items-start">
                                    <div className="w-28 h-28 bg-gray-50 rounded-md flex items-center justify-center border">
                                        <img src={item.image} alt={item.title} className="object-contain max-h-24" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-semibold">{item.title}</h3>
                                        <p className="text-sm text-gray-500">{item.color} • فروشنده: {item.seller}</p>
                                        <ul className="text-sm text-gray-500 mt-2">
                                            {item.deliveryTags?.map((t, i) => (
                                                <li key={i}>• {t}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex items-center border rounded-md px-2">
                                            <button onClick={() => updateQty(item.id, -1)} className="p-1" aria-label="decrease">
                                                <MinusIcon className="w-4 h-4" />
                                            </button>
                                            <div className="px-3">{item.qty}</div>
                                            <button onClick={() => updateQty(item.id, 1)} className="p-1" aria-label="increase">
                                                <PlusIcon className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-sm text-gray-500">قیمت واحد</div>
                                            <div className="font-medium text-lg">{currency(item.price)}</div>
                                            {item.discount ? <div className="text-sm text-rose-600">تخفیف {currency(item.discount)}</div> : null}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex justify-start">
                            <button onClick={() => alert('ادامه به خرید بعدی')} className="text-sm underline">انتقال به خرید بعدی</button>
                        </div>
                    </section>

                    <section className="bg-white rounded-lg p-4 shadow-sm">
                        <h2 className="font-medium mb-3">آدرس ارسال</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input className="border p-2 rounded" placeholder="نام و نام خانوادگی" value={address.fullName} onChange={e => setAddress({ ...address, fullName: e.target.value })} />
                            <input className="border p-2 rounded" placeholder="شماره تماس" value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} />
                        </div>
                        <textarea className="border mt-3 p-2 rounded w-full" placeholder="آدرس کامل" value={address.addressText} onChange={e => setAddress({ ...address, addressText: e.target.value })} />
                        <div className="mt-3 text-sm text-gray-500">فرض شده که امکان انتخاب موقعیت مکانی هم وجود دارد (آیکون نقشه).</div>
                    </section>

                    <section className="bg-white rounded-lg p-4 shadow-sm">
                        <h2 className="font-medium mb-3">روش ارسال و زمان تقریبی</h2>
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="shipping" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} />
                                <div className="flex-1">ارسال استاندارد — تحویل ۲-۴ روز</div>
                                <div className="font-medium">{currency(20000)}</div>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="shipping" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} />
                                <div className="flex-1">ارسال فوری — تحویل امروز/فردا</div>
                                <div className="font-medium">{currency(50000)}</div>
                            </label>
                        </div>
                    </section>

                    <section className="bg-white rounded-lg p-4 shadow-sm">
                        <h2 className="font-medium mb-3">روش پرداخت</h2>
                        <div className="flex items-center gap-3">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="pay" defaultChecked />
                                <span>پرداخت اینترنتی</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="pay" />
                                <span>پرداخت در محل</span>
                            </label>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                            <input value={discountCode} onChange={e => setDiscountCode(e.target.value)} placeholder="کد تخفیف" className="border p-2 rounded flex-1" />
                            <button onClick={() => alert('اعمال کد')} className="px-3 py-2 bg-gray-100 rounded">اعمال</button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <button className="flex items-center gap-2 text-sm underline" onClick={() => setShowChat(true)}>
                                <ChatAlt2Icon className="w-5 h-5" />پشتیبانی فوری
                            </button>
                            <div className="text-right">
                                <div className="text-sm text-gray-500">جمع جزئی</div>
                                <div className="font-semibold text-lg">{currency(subtotal)}</div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* RIGHT: Summary card */}
                <aside className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm sticky top-6">
                        <h3 className="font-medium mb-3">خلاصه پرداخت</h3>
                        <div className="flex justify-between text-sm text-gray-500"><span>جمع اقلام</span><span>{currency(subtotal)}</span></div>
                        <div className="flex justify-between text-sm text-gray-500 mt-1"><span>هزینه ارسال</span><span>{currency(shipping)}</span></div>
                        <div className="flex justify-between text-sm text-gray-500 mt-1"><span>مالیات</span><span>{currency(tax)}</span></div>
                        {discountValue > 0 && <div className="flex justify-between text-sm text-rose-600 mt-1"><span>تخفیف</span><span>-{currency(discountValue)}</span></div>}
                        <div className="border-t mt-3 pt-3 flex justify-between items-center">
                            <div>
                                <div className="text-sm text-gray-500">مبلغ قابل پرداخت</div>
                                <div className="text-xl font-bold">{currency(total)}</div>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2" onClick={() => alert('پرداخت آزمایشی')}>
                                <CreditCardIcon className="w-5 h-5" />پرداخت
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h4 className="font-medium mb-2">چک‌لیست آماده‌سازی</h4>
                        <ul className="text-sm text-gray-600 list-disc pr-5">
                            <li>آدرس وارد شده تایید شده باشد</li>
                            <li>موجودی و قفل پرداخت تست شود</li>
                            <li>درگاه آزمایشی متصل</li>
                        </ul>
                    </div>
                </aside>
            </div>

            {/* Chat modal */}
            {showChat && (
                <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-t-xl md:rounded-xl p-4">
                        <div className="flex justify-between items-center mb-3">
                            <div className="font-medium">پشتیبانی سریع (AI)</div>
                            <button onClick={() => setShowChat(false)} className="text-gray-500">بستن</button>
                        </div>
                        <div className="h-56 border rounded p-2 overflow-auto text-sm text-gray-600">این پنل می‌تواند به یک چت‌بات متصل شود — نمونه پاسخ: سلام! چطور کمکتون کنم؟</div>
                        <div className="mt-3 flex gap-2">
                            <input className="flex-1 border rounded p-2" placeholder="پیام خود را بنویسید..." />
                            <button className="px-3 py-2 bg-blue-600 text-white rounded">ارسال</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 text-sm text-gray-500 text-center">نسخه MVP — CheckPay</div>
        </div>
    );
}
