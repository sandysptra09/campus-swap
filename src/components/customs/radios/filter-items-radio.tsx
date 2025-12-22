import React from 'react'

import { Radio, RadioGroup } from '@heroui/react'

interface Props {
    value?: string;
    onChange?: (val: string) => void;
}

export default function FilterItemsRadio({ value = '', onChange }: Props) {
    return (
        <RadioGroup
            className=''
            value={value}
            onValueChange={onChange}
        >
            <Radio value='NEW'>New</Radio>
            <Radio value='LIKE_NEW'>Like New</Radio>
            <Radio value='USED'>Used</Radio>
        </RadioGroup>
    )
}
