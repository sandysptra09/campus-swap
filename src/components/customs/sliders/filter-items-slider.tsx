import React, { useState } from 'react'

import { Input, Slider } from '@heroui/react'

export default function FilterItemsSlider() {

    const [range, setRange] = useState<[number, number]>([400, 1200]);

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
        <div>
            <h3 className='text-base text-foreground font-semibold mb-2'>
                Point Range
            </h3>
            <Slider
                label='Points'
                step={5}
                minValue={0}
                maxValue={4000}
                value={range}
                onChange={(val: number | number[]) => {
                    if (Array.isArray(val)) setRange([val[0], val[1]]);
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
                        value={range[0].toString()}
                        size='sm'
                        radius='lg'
                        className='w-full'
                        onKeyDown={allowOnlyNumbers}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === '') return;
                            const value = Number(val);
                            setRange([
                                Math.max(0, Math.min(value, range[1])),
                                range[1],
                            ]);
                        }}
                    />
                </div>
                <div className='flex flex-col items-start'>
                    <span className='text-xs text-muted-foreground mb-1'>To</span>
                    <Input
                        value={range[1].toString()}
                        size='sm'
                        radius='lg'
                        className='w-full'
                        onKeyDown={allowOnlyNumbers}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === '') return;
                            const value = Number(val);
                            setRange([
                                range[0],
                                Math.min(2000, Math.max(value, range[0])),
                            ]);
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
