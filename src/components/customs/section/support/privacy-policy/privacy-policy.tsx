'use client';

import React from 'react'

export default function PrivacyPolicySection() {
    return (
        <section className='max-w-4xl mx-auto px-6 md:px-10 lg:px-20 py-12'>
            <div className='mb-10'>
                <h1 className='text-3xl md:text-4xl font-bold mb-3'>Privacy Policy</h1>
                <p className='text-sm text-muted-foreground'>
                    Last updated: December 2025
                </p>
            </div>
            <div className='space-y-10'>
                <div className='space-y-4'>
                    <h2 className='text-xl font-semibold'>1. Introduction</h2>
                    <p className='text-base text-muted-foreground leading-relaxed'>
                        CampusSwap (“we”, “our”, “us”) is committed to protecting your privacy and ensuring your data is handled securely.
                        This Privacy Policy explains how we collect, use, store, and safeguard your information when you use our platform.
                    </p>
                </div>
                <div className='space-y-4'>
                    <h2 className='text-xl font-semibold'>2. Information We Collect</h2>
                    <p className='text-base text-muted-foreground leading-relaxed'>
                        We collect information to provide safe and personalized services. This includes:
                    </p>

                    <ul className='text-base list-disc ml-6 text-muted-foreground space-y-2'>
                        <li><strong>Account Information:</strong> Name, student email, profile photo, and campus verification data.</li>
                        <li><strong>Usage Data:</strong> Search history, saved items, session logs, and interaction patterns.</li>
                        <li><strong>Transaction Data:</strong> Borrowing history, item listings, chat interactions, and ratings.</li>
                        <li><strong>Device Information:</strong> IP address, device type, browser, and app performance data.</li>
                    </ul>
                </div>
                <div className='space-y-4'>
                    <h2 className='text-xl font-semibold'>3. How We Use Your Information</h2>
                    <p className='text-base text-muted-foreground leading-relaxed'>
                        Your information is used to improve platform safety and user experience. Specifically:
                    </p>

                    <ul className='text-base list-disc ml-6 text-muted-foreground space-y-2'>
                        <li>To verify student identity and maintain a trusted campus-only environment.</li>
                        <li>To match you with relevant items and recommendations.</li>
                        <li>To detect suspicious activities and enforce platform rules.</li>
                        <li>To enhance features such as chat, item listings, and search.</li>
                        <li>To improve app reliability, performance, and security.</li>
                    </ul>
                </div>
                <div className='space-y-4'>
                    <h2 className='text-xl font-semibold'>4. Sharing of Information</h2>
                    <p className='text-base text-muted-foreground leading-relaxed'>
                        We do <strong>not sell</strong> your personal data. However, we may share limited information with:
                    </p>

                    <ul className='text-base list-disc ml-6 text-muted-foreground space-y-2'>
                        <li><strong>Other users:</strong> Your profile name, photo, rating, and transaction-related details.</li>
                        <li><strong>Service providers:</strong> Cloud hosting, analytics tools, and security systems.</li>
                        <li><strong>Campus authorities:</strong> Only when required for safety or policy violations.</li>
                    </ul>
                </div>
                <div className='space-y-4'>
                    <h2 className='text-xl font-semibold'>5. Data Storage & Security</h2>
                    <p className='text-base text-muted-foreground leading-relaxed'>
                        We use encrypted databases and industry-standard security to protect your data.
                        Access is restricted and monitored to prevent unauthorized use.
                    </p>
                    <p className='text-base text-muted-foreground leading-relaxed'>
                        While we work hard to keep your data safe, no method of electronic storage is 100% secure.
                        We continuously improve our systems based on best practices.
                    </p>
                </div>
                <div className='space-y-4'>
                    <h2 className='text-xl font-semibold'>6. Your Rights</h2>
                    <p className='text-base text-muted-foreground leading-relaxed'>
                        You have full control over your information. You may:
                    </p>

                    <ul className='text-base list-disc ml-6 text-muted-foreground space-y-2'>
                        <li>Update or edit your profile information.</li>
                        <li>Request deletion of your account.</li>
                        <li>Export your data (coming soon).</li>
                        <li>Control notification and privacy settings.</li>
                    </ul>
                </div>
                <div className='space-y-4'>
                    <h2 className='text-xl font-semibold'>7. Children & Eligibility</h2>
                    <p className='text-base text-muted-foreground leading-relaxed'>
                        CampusSwap is exclusively for students with valid campus email addresses.
                        We do not knowingly collect data from minors outside this requirement.
                    </p>
                </div>
                <div className='space-y-4'>
                    <h2 className='text-xl font-semibold'>8. Changes to This Policy</h2>
                    <p className='text-base text-muted-foreground leading-relaxed'>
                        We may update this policy periodically. Changes will be reflected on this page with a new “Last updated” date.
                    </p>
                </div>
                <div className='space-y-4'>
                    <h2 className='text-xl font-semibold'>9. Contact Us</h2>
                    <p className='text-base text-muted-foreground leading-relaxed'>
                        If you have any questions or privacy concerns, reach out to our support team at:
                    </p>
                    <p className='text-basetext-muted-foreground'>
                        <strong>Email:</strong> support@campusswap.app
                    </p>
                </div>
            </div>
        </section>
    )
}
