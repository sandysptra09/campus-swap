import React from 'react'

import { Radio, RadioGroup } from '@heroui/react'

export default function FilterItemsRadio() {
    return (
        <div>
            <h3 className='text-base text-foreground font-semibold mb-2'>
                Condition
            </h3>
            <RadioGroup
                className=''>
                <Radio value='new'>New</Radio>
                <Radio value='like-new'>Like New</Radio>
                <Radio value='used'>Used</Radio>
            </RadioGroup>
        </div>
    )
}
