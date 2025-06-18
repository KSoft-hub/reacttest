import React, { useState } from 'react'
import { FormHelperText, TextField as MuiTextField } from '@mui/material'
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import styled from '@emotion/styled'
import { Controller, useFormContext } from 'react-hook-form'

export type TextFieldProps = {
    displayCounter?: boolean
} & MuiTextFieldProps

const TextField: React.FC<TextFieldProps> = ({
    helperText,
    displayCounter = false,
    ...props
}: TextFieldProps) => {
    const { register, formState, control } = useFormContext()
    const [length, setLength] = useState(0)
    return (
        <>

            <MuiTextField
                label="Text field"
                name={`${props.name}`}
                inputProps={{ maxLength: 31 }}
                fullWidth={true}
                onChange={(e) => {
                    setLength(e.target?.value?.length ?? 0)
                    if (props.onChange !== undefined) {
                        props.onChange(e)
                    }
                }}
            />


            <HelperTextDiv>
                {!!helperText && <ErrorText error={true}>{helperText}</ErrorText>}
                {displayCounter && !!props.inputProps?.maxLength && (
                    <MaxLengthText>
                        {length + '/' + props.inputProps?.maxLength}
                    </MaxLengthText>
                )}
            </HelperTextDiv>
        </>
    )
}

const HelperTextDiv = styled.div`
  display: flex;
`

const ErrorText = styled(FormHelperText)`
  width: 80%;
`

const MaxLengthText = styled(FormHelperText)`
  width: 100%;
  text-align: right;
`

export default TextField
