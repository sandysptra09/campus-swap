import React, { useState } from 'react'

import { Accordion, AccordionItem, Button } from '@heroui/react'
import { FAQ_CATEGORIES, FAQ_DATA } from '@/data/faq-data'

export default function SupportFAQAccordion() {

    const [activeCategory, setActiveCategory] = useState('getting-started');

    const faqs = FAQ_DATA[activeCategory] || [];

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10'>
            <div className='flex flex-col gap-4'>
                <div className=''>
                    <h1 className='mb-2 text-3xl md:text-4xl font-bold'>
                        FAQs
                    </h1>
                    <p className='mb-2 text-sm md:text-base text-muted-foreground'>
                        Find answers to the most common questions about using CampusSwap.
                        Browse each category to quickly get the help you need.
                    </p>
                </div>
                <div className='flex flex-wrap gap-3'>
                    {FAQ_CATEGORIES.map((cat) => (
                        <Button
                            key={cat.id}
                            size='sm'
                            radius='full'
                            variant='solid'
                            onPress={() => setActiveCategory(cat.id)}
                            className={` border text-sm font-medium transition
                                ${activeCategory === cat.id
                                    ? 'bg-foreground text-white border-foreground'
                                    : 'bg-white text-foreground border-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            {cat.label}
                        </Button>
                    ))}
                </div>
            </div>
            <div className='md:col-span-2 space-y-4'>
                <Accordion
                    variant='light'

                    itemClasses={{
                        title: 'text-foreground font-semibold text-xl',
                        content: 'text-secondary text-sm md:text-base',
                    }}
                >
                    {faqs.map((faq, idx) => (
                        <AccordionItem
                            key={idx}
                            title={faq.question}
                            aria-label={faq.question}
                        >
                            <p className='text-sm leading-relaxed text-gray-600'>{faq.answer}</p>
                        </AccordionItem>
                    ))}
                </Accordion>
                <div className='rounded-xl border p-5 mt-6 bg-gray-50'>
                    <h3 className='font-semibold text-lg mb-2'>Still have questions?</h3>
                    <p className='text-sm text-gray-600 mb-4'>
                        Reach out to our support team and we’ll help you as fast as possible.
                    </p>

                    <Button color='primary' radius='full'>
                        Contact Support
                    </Button>
                </div>
            </div>
        </div >
    )
}
