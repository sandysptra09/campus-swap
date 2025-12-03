import React from 'react'

import { Radio, RadioGroup } from '@heroui/react'

export default function FilterItemsRadio() {
    return (
        <RadioGroup
            className=''>
            <Radio value='new'>New</Radio>
            <Radio value='like-new'>Like New</Radio>
            <Radio value='used'>Used</Radio>
        </RadioGroup>
    )
}
