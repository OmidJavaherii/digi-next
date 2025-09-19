CheckPay - One-Page Checkout System
CheckPay is a modern, user-friendly one-page checkout system designed for digital stores. Built with a responsive and RTL (right-to-left) interface, it provides a seamless shopping experience for Persian-speaking users. The system allows users to manage their cart, select shipping and payment methods, apply discounts, and access support, all within a single page.
Features

Now, open [https://digi-next-opal.vercel.app/](https://digi-next-opal.vercel.app/) in your browser.

Cart Management:
Display products with images, prices, discounts, and quantity controls.
Includes a headphone icon next to each product title for visual appeal.
Increase/decrease item quantities with real-time price updates.

Delivery Address:
Option to checkout as a guest with fields for first name, last name, phone number, and address.
Placeholder for map-based location selection (currently a demo alert).

Shipping Options:
Multiple shipping methods: Post (20,000 IRR), Courier (50,000 IRR), and Tipax (35,000 IRR).
Select delivery date and time for enhanced user convenience.

Payment Methods:
Support for three payment gateways: Saman Bank, Snap Pay, and Mellat Bank.

Discount Code:
Apply a discount code (e.g., CHECK10 for 10% off) with real-time total updates.

Order Summary:
Displays subtotal, shipping, tax, discount, and total payable amount.
Sticky summary section on large screens for better visibility during scrolling.

Support:
Quick support button (labeled "Support") with a demo chat modal for AI-powered assistance.

Responsive Design:
Fully responsive for mobile (320px-768px), tablet, and desktop (1024px+).
RTL support for Persian text and layout.

Typography:
Uses the Vazirmatn font for a native Persian reading experience.

Technologies

Next.js: Framework for building the UI with server-side rendering (SSR) and static site generation (SSG).
React: For component-based UI and state management.
TypeScript: For type-safe development.
Tailwind CSS: For responsive and RTL-compatible styling.
Heroicons: Modern icons for UI elements (e.g., Headphones, Credit Card).
Vazirmatn: Persian font for enhanced readability.

Prerequisites

Node.js (version 16 or higher)
npm or yarn
Modern browser (for testing the UI)

Installation

Clone the Repository:
git clone https://github.com/your-repo/checkpay.git
cd checkpay

Install Dependencies:
npm install

Run the Project:
npm run dev

The app will be available at http://localhost:3000.

Project Structure
checkpay/
│
├── src/
│ │
│ ├── components/
│ │ └── CheckPayCart.tsx # Main checkout component
│ │
│ ├── app/page.tsx # Main page (CheckoutPage)
│ │
│ ├── styles/globals.css # Global styles
│ │
│ └── layout.tsx # Root layout with Vazirmatn font
│
├── public/
│ └── images/ # Product images (e.g., headphone.jpg)
│
├── package.json # Dependencies and scripts
│
└── README.md # Project documentation

Usage

View Cart:
Products are displayed with images, prices, and quantities.
Use the "+" and "−" buttons to adjust quantities.

Enter Delivery Address:
Check the "Checkout as Guest" box to show fields for first name, last name, phone, and address.
Click "Select Location on Map" for a map-based selection (demo alert for now).

Choose Shipping Method:
Select from Post, Courier, or Tipax.
Specify delivery date and time using the provided inputs.

Select Payment Method:
Choose from Saman Bank, Snap Pay, or Mellat Bank.

Apply Discount Code:
Enter CHECK10 in the discount field and click "Apply" to get a 10% discount.

Review and Pay:
Check the order summary (subtotal, shipping, tax, total).
Click "Final Payment" to proceed (currently triggers a demo alert).

Responsive Design:
Test on various screen sizes using browser dev tools (mobile: 320px-768px, desktop: 1024px+).
Verify the sticky order summary remains fixed on large screens while scrolling.

Functionality:
Adjust item quantities and confirm total updates.
Apply discount code (CHECK10) and verify discount calculation.
Test shipping and payment options.
Open/close the support chat modal.

RTL:
Ensure text, buttons, and inputs align correctly from right to left.

Sample Output:
For default cart (Headphone: 1,625,000 IRR - 132,500 IRR discount, qty: 1; Cable: 125,000 IRR, qty: 2):
Subtotal: 1,742,500 IRR
Shipping: 20,000 IRR (Post)
Tax: ~156,825 IRR
Total: 1,919,325 IRR (or 1,727,392.5 IRR with CHECK10)

Limitations and Future Improvements

Payment Gateway: Currently a demo (alert-based); integrate real payment APIs.
Map Integration: Replace map placeholder with a real map API (e.g., Google Maps, Map.ir).
User Authentication: Add login system for non-guest users.
Input Validation: Implement validation for address and phone fields.
Chatbot Integration: Connect support modal to a real AI chatbot.
Accessibility: Enhance ARIA attributes for better screen reader support.

Contributing
This project is an MVP (Minimum Viable Product). To contribute or report issues, please create an issue or pull request on GitHub.
