import React from 'react';

import { Button } from '@heroui/react';
import { SlidersHorizontal } from 'lucide-react';

interface Props {
    onOpen: () => void;
}

export default function FilterMobileButton({ onOpen }: Props) {
    return (
        <div className='lg:hidden flex justify-end mb-4'>
            <Button
                size='md'
                radius='lg'
                startContent={<SlidersHorizontal size={16} />}
                onPress={onOpen}
                className='text-sm font-semibold'
            >
                Filters
            </Button>
        </div>
    );
}
