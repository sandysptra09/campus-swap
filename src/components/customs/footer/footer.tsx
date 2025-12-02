import React from 'react'
import CampusSwapFooterLogo from '../logo/campus-swap-footer-logo'
import Link from 'next/link'

export default function CampusSwapFooter() {
    return (
        <footer className='w-full bg-white px-6 md:px-12 lg:px-[134px] py-[80px] text-sm lg:text-sm'>
            <div className='grid gap-12 lg:gap-20 lg:grid-cols-12'>

                <div className='lg:col-span-5 max-w-md'>
                    <CampusSwapFooterLogo size={100} />

                    <p className='mt-5 text-sm text-gray-700 leading-relaxed'>
                        CampusSwap is a points-based platform for students to exchange used items.
                        It supports reuse, reduce, and recycle for a more sustainable campus.
                    </p>
                </div>

                <div className='lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10'>

                    <div>
                        <p className='text-base font-semibold text-gray-900 mb-3'>CampusSwap</p>
                        <ul className='space-y-3'>
                            <li><Link href='/' className='text-gray-600 hover:text-primary transition-colors'>Home</Link></li>
                            <li><Link href='/' className='text-gray-600 hover:text-primary transition-colors'>Catalog</Link></li>
                            <li><Link href='/' className='text-gray-600 hover:text-primary transition-colors'>Exchange</Link></li>
                            <li><Link href='/' className='text-gray-600 hover:text-primary transition-colors'>My Items</Link></li>
                            <li><Link href='/' className='text-gray-600 hover:text-primary transition-colors'>Transactions</Link></li>
                        </ul>
                    </div>

                    <div>
                        <p className='font-semibold text-gray-900 mb-3'>About</p>
                        <ul className='space-y-3'>
                            <li><Link href='/about' className='text-gray-600 hover:text-primary transition-colors'>About Us</Link></li>
                            <li><Link href='/mission' className='text-gray-600 hover:text-primary transition-colors'>Mission</Link></li>
                            <li><Link href='/how-it-works' className='text-gray-600 hover:text-primary transition-colors'>How It Works</Link></li>
                        </ul>
                    </div>

                    <div>
                        <p className='font-semibold text-gray-900 mb-3'>Support</p>
                        <ul className='space-y-3'>
                            <li><Link href='/support/help-center' className='text-gray-600 hover:text-primary transition-colors'>Help Center</Link></li>
                            <li><Link href='/support/faq' className='text-gray-600 hover:text-primary transition-colors'>FAQ</Link></li>
                            <li><Link href='/support/privacy-policy' className='text-gray-600 hover:text-primary transition-colors'>Privacy Policy</Link></li>
                            <li><Link href='/support/terms-conditions' className='text-gray-600 hover:text-primary transition-colors'>Terms & Conditions</Link></li>
                        </ul>
                    </div>

                </div>
            </div>
            <hr className='my-6' />
            <div className='flex flex-col sm:flex-row justify-between items-center'>
                <p className='text-sm text-gray-600'>
                    © {new Date().getFullYear()} CampusSwap. All rights reserved.
                </p>

                <div className='flex items-center space-x-5 mt-4 sm:mt-0'>
                    <Link href='#' className='text-gray-500 hover:text-green-600 transition'>Terms</Link>
                    <Link href='#' className='text-gray-500 hover:text-green-600 transition'>Privacy</Link>
                </div>
            </div>
        </footer>
    )
}
