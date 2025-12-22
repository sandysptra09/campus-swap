import React, { useState } from 'react'

import { Input, Slider } from '@heroui/react'

interface Props {
    value: [number, number];
    onChange: (val: [number, number]) => void;
}

export default function FilterItemsSlider({ value, onChange }: Props) {

    const allowOnlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowed = [
            'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'
        ];
        if (allowed.includes(e.key)) return;

        if (!/^[0-9]$/.test(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <>
            <Slider
                label='Points'
                step={5}
                minValue={0}
                maxValue={5000}
                value={value}
                onChange={(val: number | number[]) => {
                    if (Array.isArray(val)) onChange([val[0], val[1]]);
                }}
                size='sm'
                color='primary'
                className='max-w-xs'
                showTooltip
            />
            <div className='flex items-center gap-4 mt-4'>
                <div className='flex flex-col items-start'>
                    <span className='text-xs text-muted-foreground mb-1'>From</span>
                    <Input
                        value={value[0].toString()}
                        size='sm'
                        radius='lg'
                        className='w-full'
                        onKeyDown={allowOnlyNumbers}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            onChange([val, value[1]]);
                        }}
                    />
                </div>
                <div className='flex flex-col items-start'>
                    <span className='text-xs text-muted-foreground mb-1'>To</span>
                    <Input
                        value={value[1].toString()}
                        size='sm'
                        radius='lg'
                        className='w-full'
                        onKeyDown={allowOnlyNumbers}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            onChange([value[0], val]);
                        }}
                    />
                </div>
            </div>
        </>
    )
}
