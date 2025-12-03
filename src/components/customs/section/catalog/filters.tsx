'use client';

import React from 'react'

import { Button, Divider } from '@heroui/react';
import FilterItemsSelect from '../../selects/filter-items-select';
import FilterItemsCheckbox from '../../checkboxs/filter-items-checkbox';
import FilterItemsRadio from '../../radios/filter-items-radio';


import FilterItemsSlider from '../../sliders/filter-items-slider';

export default function FiltersSection() {
    return (
        <div className='border border-default-200 rounded-2xl shadow-sm p-5 space-y-2'>
            <h2 className='text-xl font-semibold'>
                Filters Items
            </h2>
            <div className=''>
                <h3 className='text-base text-foreground font-semibold mb-2'>
                    Sorting
                </h3>
                <FilterItemsSelect />
            </div>
            <Divider className='my-4' />
            <div className=''>
                <h3 className='text-base font-semibold mb-3'>
                    Category
                </h3>
                <FilterItemsCheckbox />
            </div>
            <Divider className='my-4' />
            <div className=''>
                <h3 className='text-base text-foreground font-semibold mb-2'>
                    Condition
                </h3>
                <FilterItemsRadio />
            </div>
            <Divider className='my-4' />
            <div className=''>
                <h3 className='text-base text-foreground font-semibold mb-2'>
                    Point Range
                </h3>
                <FilterItemsSlider />
            </div>
            <Button type='reset' className='w-full hover:bg-destructive hover:text-white 
            text-sm font-medium mt-5'>
                Reset Filters
            </Button>
        </div>
    )
}
