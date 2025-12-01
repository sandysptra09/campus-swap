export const FAQ_CATEGORIES = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'trading', label: 'Trading & Borrowing' },
  { id: 'points', label: 'Point System & Rewards' },
  { id: 'listing', label: 'Item Listing' },
  { id: 'safety', label: 'Safety & Verification' },
  { id: 'account', label: 'Account & Technical Issues' },
];

export const FAQ_DATA: Record<
  string,
  { question: string; answer: string }[]
> = {
  'getting-started': [
    {
      question: 'How do I create a CampusSwap account?',
      answer:
        'Simply sign up using your student email. Once verified, you can start listing, trading, and borrowing items right away.',
    },
    {
      question: 'Is CampusSwap free to use?',
      answer:
        'Yes! CampusSwap is completely free for all students and campus communities.',
    },
    {
      question: 'Do I need to verify my student email?',
      answer:
        'Yes. Email verification ensures every user belongs to the same campus community and increases platform safety.',
    },
    {
      question: 'Can I use CampusSwap without uploading an item?',
      answer:
        'Yes, you can browse, borrow, and trade without listing an item. Listing is optional but recommended.',
    },
  ],
  trading: [
    {
      question: 'How do I borrow an item?',
      answer:
        "Go to any item page and tap the 'Borrow' or 'Request Trade' button. The owner will receive your request instantly.",
    },
    {
      question: 'How does item returning work?',
      answer:
        'After the borrow period ends, simply meet the owner and return it. Both users can leave ratings afterwards.',
    },
    {
      question: 'Are there any fees for trading or borrowing?',
      answer:
        'No. All trading and borrowing activities within CampusSwap are free of charge.',
    },
    {
      question: 'Can I cancel a borrowing request?',
      answer:
        "Yes. As long as the owner hasn't accepted your request, you can cancel it anytime from your activity panel.",
    },
  ],
  points: [
    {
      question: 'How do points work?',
      answer:
        'You earn points by completing trades, borrowing responsibly, and maintaining good ratings. These points unlock perks and future rewards.',
    },
    {
      question: 'Do points expire?',
      answer:
        'No. CampusSwap points never expire as long as your account stays active.',
    },
    {
      question: 'Do I lose points for late returns?',
      answer:
        'Yes. Returning borrowed items late may reduce your points and affect your rating.',
    },
    {
      question: 'What can I do with my points?',
      answer:
        'Points can unlock perks such as priority visibility for your listings, badges, and future CampusSwap features.',
    },
  ],
  listing: [
    {
      question: 'How do I list an item?',
      answer:
        "Tap the 'Add Item' button, upload a photo, add details, and publish your listing instantly.",
    },
    {
      question: 'Can I edit a listing after posting?',
      answer:
        'Yes, you can edit price, description, images, or mark it unavailable anytime.',
    },
    {
      question: 'What types of items can I list?',
      answer:
        'You can list study tools, electronics, books, dorm essentials, hobby items, and other campus-friendly items.',
    },
    {
      question: 'How many items can I list at once?',
      answer:
        "There is no limit. List as many items as you'd like as long as they follow community guidelines.",
    },
  ],
  safety: [
    {
      question: 'How is user identity verified?',
      answer:
        'We verify all accounts using student email domains to ensure a trusted campus-only community.',
    },
    {
      question: 'What should I do if I encounter suspicious behavior?',
      answer:
        'Use the report button or contact support immediately. Our team reviews every report within 24 hours.',
    },
    {
      question: 'Are meetups monitored by CampusSwap?',
      answer:
        'No. However, we recommend meeting in public campus spaces such as libraries or cafeterias for safety.',
    },
    {
      question: 'What items are not allowed on CampusSwap?',
      answer:
        'Any dangerous, illegal, or prohibited items—including sharp weapons, alcohol, and counterfeit goods—are strictly banned.',
    },
  ],
  account: [
    {
      question: 'I forgot my password, what should I do?',
      answer:
        "Use the 'Reset Password' option on the login screen. We’ll send instructions to your registered email.",
    },
    {
      question: 'Why can’t I access my account?',
      answer:
        'Your account may be under review due to suspicious activity. Contact support to resolve it quickly.',
    },
    {
      question: 'How do I change my profile information?',
      answer:
        'Go to your profile settings to update your name, profile image, bio, or email preferences.',
    },
    {
      question: 'Why am I not receiving verification emails?',
      answer:
        "Check your spam folder or ensure your campus email is active. If it persists, press 'Resend Email' or contact support.",
    },
  ],
};
