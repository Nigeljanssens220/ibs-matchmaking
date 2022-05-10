import Form from '@/components/Form'
import FormSection from '@/components/Form/FormSection'
import FormSectionHeader from '@/components/Form/FormSection/FormSectionHeader'
import FormTextField from '@/components/Form/FormTextField'
import RadioGroup from '@/components/RadioGroup'
import Switch from '@/components/Switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const options = [
    {
        name: 'Startup',
        description: '12GB',
    },
    {
        name: 'Business',
        description: '16GB',
    },
    {
        name: 'Enterprise',
        description: '32GB',
    },
]

const UserSettings = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
})

const Profile: NextPage = () => {
    const { data: session } = useSession()
    const [enabled, setEnabled] = React.useState(false)
    const formProps = useForm({
        resolver: zodResolver(UserSettings),
    })

    const onSubmit = (data: typeof UserSettings) => console.log(data)
    return (
        <>
            <div>
                <Switch checked={enabled} onChange={() => setEnabled} />
                <RadioGroup items={options} />
            </div>
            <Form {...formProps} onSubmit={formProps.handleSubmit(onSubmit)}>
                <FormSection
                    header={<FormSectionHeader header="Personalia" />}
                    className="max-w-md border"
                >
                    {/* <input {...formProps.register('name')} /> */}
                    <FormTextField name="name" label="Name" className="" />
                </FormSection>
                <input type="submit" />
            </Form>
        </>
    )
}

export default Profile
