import React from 'react'
import styled from 'styled-components'
import { useFormContext } from 'react-hook-form'
import TextField from '../../atoms/TextField'
import { TestTableFormTypes } from '../../templates/TestTableFormTemplate'
import { useSnackbar } from 'notistack'
import { TestTable } from '../../../types/typescript-axios'

export type TextFieldsProps = {
    testTables: TestTable[]
}

const TextFields: React.FC<TextFieldsProps> = (props: TextFieldsProps) => {
    const { formState } = useFormContext<TestTableFormTypes>()

    const { enqueueSnackbar } = useSnackbar()

    return (
        <>
            <Item>
                <TextField
                    label="Text field"
                    name="name"
                    inputProps={{ maxLength: 30 }}
                    error={!!formState.errors.name}
                    helperText={formState.errors.name?.message}
                    fullWidth={true}
                    displayCounter={true}
                />
            </Item>
        </>
    )

}

const Item = styled.div`
    margin-bottom: 24px;
    `

export default TextFields
