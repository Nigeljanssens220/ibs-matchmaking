import { RadioGroup as RG } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import Typography from '../Typography'

interface RadioGroupItemProps {
    name: string
    description: string
}

interface RadioGroupProps {
    items: RadioGroupItemProps[]
}
const RadioGroup: React.FC<RadioGroupProps> = ({ items }) => {
    const [selected, setSelected] = useState(items[0])

    return (
        <>
            <div className="max-w-md w-full">
                <RG value={selected} onChange={setSelected}>
                    <div className="space-y-2">
                        {items.map((item) => (
                            <RG.Option
                                key={item.name}
                                value={item}
                                className={({ checked }) =>
                                    `
                      ${
                          checked
                              ? 'bg-gray-900 bg-opacity-75 text-gray-100'
                              : 'bg-gray-100'
                      }
                        flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                }
                            >
                                {({ checked }) => (
                                    <>
                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="text-sm">
                                                    <RG.Label
                                                        as="p"
                                                        className={`font-medium  ${
                                                            checked
                                                                ? 'text-white'
                                                                : 'text-gray-900'
                                                        }`}
                                                    >
                                                        {item.name}
                                                    </RG.Label>
                                                    <RG.Description
                                                        as="span"
                                                        className={`inline ${
                                                            checked
                                                                ? 'text-sky-100'
                                                                : 'text-gray-500'
                                                        }`}
                                                    >
                                                        <Typography
                                                            component="span"
                                                            variant="sm"
                                                        >
                                                            {item.description}
                                                        </Typography>
                                                    </RG.Description>
                                                </div>
                                            </div>
                                            {checked && (
                                                <div className="shrink-0 text-white">
                                                    <CheckIcon className="h-6 w-6" />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </RG.Option>
                        ))}
                    </div>
                </RG>
            </div>
        </>
    )
}

export default RadioGroup
