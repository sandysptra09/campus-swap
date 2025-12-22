import React from 'react'

import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
    Button, Divider
} from '@heroui/react';

import FilterItemsSelect from '../selects/filter-items-select';
import FilterItemsCheckbox from '../checkboxs/filter-items-checkbox';
import FilterItemsRadio from '../radios/filter-items-radio';
import FilterItemsSlider from '../sliders/filter-items-slider';

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    filters: {
        selectedCategory: string[];
        selectedCondition: string;
        priceRange: [number, number];
        sortBy: string;
    };
    setFilters: {
        setSelectedCategory: (val: string[]) => void;
        setSelectedCondition: (val: string) => void;
        setPriceRange: (val: [number, number]) => void;
        setSortBy: (val: string) => void;
    };
}

export default function FilterMobileModal({ isOpen, onOpenChange, filters, setFilters }: Props) {

    const handleReset = () => {
        setFilters.setSelectedCategory([]);
        setFilters.setSelectedCondition('');
        setFilters.setPriceRange([0, 5000]);
        setFilters.setSortBy('newest');
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement='bottom'
            size='3xl'
            scrollBehavior='inside'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className='font-semibold text-xl'>
                            Filters
                        </ModalHeader>

                        <ModalBody className='space-y-5'>
                            <div className=''>
                                <h3 className='text-base text-foreground font-semibold mb-2'>
                                    Sorting
                                </h3>
                                <FilterItemsSelect value={filters.sortBy} onChange={setFilters.setSortBy} />
                            </div>
                            <Divider />
                            <div className=''>
                                <h3 className='text-base font-semibold mb-3'>
                                    Category
                                </h3>
                                <FilterItemsCheckbox value={filters.selectedCategory} onChange={setFilters.setSelectedCategory} />
                            </div>
                            <Divider />
                            <div className=''>
                                <h3 className='text-base text-foreground font-semibold mb-2'>
                                    Condition
                                </h3>
                                <FilterItemsRadio value={filters.selectedCondition} onChange={setFilters.setSelectedCondition} />
                            </div>
                            <Divider />
                            <div className=''>
                                <h3 className='text-base text-foreground font-semibold mb-2'>
                                    Point Range
                                </h3>
                                <FilterItemsSlider value={filters.priceRange} onChange={setFilters.setPriceRange} />
                            </div>
                        </ModalBody>

                        <ModalFooter className='flex gap-3'>
                            <Button
                                variant='flat'
                                className='flex-1 font-medium hover:bg-destructive hover:text-white'
                                onPress={handleReset}
                            >
                                Reset
                            </Button>

                            <Button
                                size='md'
                                color='primary'
                                className='flex-1 font-medium'
                                onPress={onClose}
                            >
                                Apply
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
