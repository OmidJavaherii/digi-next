'use client';
import React, { useState, useEffect } from 'react';
import { ChatBubbleLeftRightIcon, PlusIcon, MinusIcon, CreditCardIcon, MegaphoneIcon } from '@heroicons/react/24/outline';

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

type Address = {
    id: string;
    fullName: string;
    phone: string;
    addressText: string;
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

    const [address, setAddress] = useState({ fullName: '', phone: '', addressText: '', id: '' });
    const [isGuest, setIsGuest] = useState(true);
    const [shippingMethod, setShippingMethod] = useState('post');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('saman');
    const [discountCode, setDiscountCode] = useState('');
    const [showChat, setShowChat] = useState(false);

    // Mock address data for non-guest users
    const savedAddresses: Address[] = [
        {
            id: '1',
            fullName: 'علی محمدی',
            phone: '09123456789',
            addressText: 'تهران، خیابان آزادی، کوچه بهار، پلاک ۱۲',
        },
        {
            id: '2',
            fullName: 'زهرا احمدی',
            phone: '09351234567',
            addressText: 'تهران، خیابان ولیعصر، کوچه گلستان، پلاک ۵',
        },
    ];

    const updateQty = (id: string, delta: number) => {
        setItems(prev => prev.map(it => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it)));
    };
    const selectAddress = (selectedAddress: Address) => {
        setAddress(selectedAddress);
    };

    const subtotal = items.reduce((s, it) => s + it.price * it.qty - (it.discount || 0), 0);
    const shippingCosts = {
        post: 20000,
        courier: 50000,
        tipax: 35000,
    };
    const shipping = shippingCosts[shippingMethod as keyof typeof shippingCosts];
    const tax = Math.round(subtotal * 0.09);
    const discountValue = discountCode === 'CHECK10' ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal + shipping + tax - discountValue;

    useEffect(() => {
        onSummaryUpdate({ subtotal, shipping, tax, total });
    }, [subtotal, shipping, tax, total]);

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
                                    <div className="flex items-center gap-2">
                                        <MegaphoneIcon className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" />
                                        <h3 className="text-sm sm:text-base font-semibold">{item.title}</h3>
                                    </div>
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
                                    <div className="text-center w-full">
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
                    <label className="flex items-center gap-2 mb-3 text-sm sm:text-base">
                        <input
                            type="checkbox"
                            checked={isGuest}
                            onChange={() => {
                                setIsGuest(!isGuest);
                                setAddress({ fullName: '', phone: '', addressText: '', id: '' })
                            }}
                        />
                        <span>خرید به عنوان مهمان</span>
                    </label>
                    {isGuest ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                                className="border p-2 rounded text-sm w-full"
                                placeholder="نام"
                                value={address.fullName.split(' ')[0] || ''}
                                onChange={e => setAddress({ ...address, fullName: e.target.value + ' ' + (address.fullName.split(' ')[1] || '') })}
                            />
                            <input
                                className="border p-2 rounded text-sm w-full"
                                placeholder="نام خانوادگی"
                                value={address.fullName.split(' ')[1] || ''}
                                onChange={e => setAddress({ ...address, fullName: (address.fullName.split(' ')[0] || '') + ' ' + e.target.value })}
                            />
                            <input
                                className="border p-2 rounded text-sm w-full"
                                placeholder="شماره تماس"
                                value={address.phone}
                                onChange={e => setAddress({ ...address, phone: e.target.value })}
                            />
                            <input
                                className="border p-2 rounded text-sm w-full"
                                placeholder="کد ملی"
                                value={address.id}
                                onChange={e => setAddress({ ...address, id: e.target.value })}
                            />
                            <input
                                className="border p-2 rounded text-sm w-full sm:col-span-2"
                                placeholder="آدرس کامل"
                                value={address.addressText}
                                onChange={e => setAddress({ ...address, addressText: e.target.value })}
                            />
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <h3 className="text-sm sm:text-base font-medium">انتخاب آدرس</h3>
                            {savedAddresses.map(addr => (
                                <label key={addr.id} className="flex items-center gap-2 text-sm sm:text-base border rounded p-3">
                                    <input
                                        type="radio"
                                        name="address"
                                        checked={address.id === addr.id}
                                        onChange={() => selectAddress(addr)}
                                    />
                                    <div>
                                        <div>{addr.fullName}</div>
                                        <div className="text-gray-500">{addr.phone}</div>
                                        <div className="text-gray-500">{addr.addressText}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}
                </section>

                {/* Shipping Method */}
                <section className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                    <h2 className="text-base sm:text-lg font-medium mb-3">روش ارسال و زمان تحویل</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Shipping Options */}
                        <div className="flex flex-col justify-center gap-2">
                            <label className="flex items-center gap-2 text-sm sm:text-base">
                                <input
                                    type="radio"
                                    name="shipping"
                                    checked={shippingMethod === 'post'}
                                    onChange={() => setShippingMethod('post')}
                                />
                                <div className="flex-1">پست — تحویل ۳-۵ روز</div>
                                <div className="font-medium">{currency(20000)}</div>
                            </label>
                            <label className="flex items-center gap-2 text-sm sm:text-base">
                                <input
                                    type="radio"
                                    name="shipping"
                                    checked={shippingMethod === 'courier'}
                                    onChange={() => setShippingMethod('courier')}
                                />
                                <div className="flex-1">پیک — تحویل امروز/فردا</div>
                                <div className="font-medium">{currency(50000)}</div>
                            </label>
                            <label className="flex items-center gap-2 text-sm sm:text-base">
                                <input
                                    type="radio"
                                    name="shipping"
                                    checked={shippingMethod === 'tipax'}
                                    onChange={() => setShippingMethod('tipax')}
                                />
                                <div className="flex-1">تیپاکس — تحویل ۲-۴ روز</div>
                                <div className="font-medium">{currency(35000)}</div>
                            </label>
                        </div>
                        {/* Delivery Date and Time */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm sm:text-base">تاریخ تحویل</label>
                            <input
                                type="date"
                                className="border p-2 rounded text-sm w-full"
                                value={deliveryDate}
                                onChange={e => setDeliveryDate(e.target.value)}
                            />
                            <label className="text-sm sm:text-base mt-2">ساعت تحویل</label>
                            <select
                                className="border p-2 rounded text-sm w-full"
                                value={deliveryTime}
                                onChange={e => setDeliveryTime(e.target.value)}
                            >
                                <option value="">انتخاب کنید</option>
                                <option value="9-12">۹:۰۰ - ۱۲:۰۰</option>
                                <option value="12-15">۱۲:۰۰ - ۱۵:۰۰</option>
                                <option value="15-18">۱۵:۰۰ - ۱۸:۰۰</option>
                                <option value="18-21">۱۸:۰۰ - ۲۱:۰۰</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Payment Method */}
                <section className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
                    <h2 className="text-base sm:text-lg font-medium mb-3">روش پرداخت</h2>
                    <div className="flex justify-around gap-2 text-sm sm:text-base">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === 'saman'}
                                onChange={() => setPaymentMethod('saman')}
                            />
                            <span>بانک سامان</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === 'snappay'}
                                onChange={() => setPaymentMethod('snappay')}
                            />
                            <span>اسنپ پی</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === 'mellat'}
                                onChange={() => setPaymentMethod('mellat')}
                            />
                            <span>بانک ملت</span>
                        </label>
                    </div>
                </section>

                {/* Summary, Discount, and Final Payment */}
                <section className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
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
                                <span>{currency(discountValue)}-</span>
                            </div>
                        )}
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
                    <div className="border-t mt-3 pt-3 flex flex-col sm:flex-row justify-between items-center gap-2">
                        <div>
                            <div className="text-xs sm:text-sm text-gray-500">مبلغ قابل پرداخت</div>
                            <div className="text-lg sm:text-xl font-bold">{currency(total)}</div>
                        </div>
                        <button
                            className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto"
                            onClick={() => alert('پرداخت نهایی')}
                        >
                            <CreditCardIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                            پرداخت نهایی
                        </button>
                    </div>
                </section>

                {/* Chat Button */}
                <div className="flex justify-start">
                    <button
                        className="flex items-center gap-2 text-xs sm:text-sm underline"
                        onClick={() => setShowChat(true)}
                    >
                        <ChatBubbleLeftRightIcon className="w-4 sm:w-5 h-4 sm:h-5" />
                        پشتیبانی
                    </button>
                </div>
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

