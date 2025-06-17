import React, { useState } from 'react'
import { FormHelperText, TextField as MuiTextField } from '@material-ui/core'
import { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField/TextField'
import styled from '@emotion/styled'

export type TextFieldProps = {
    displayCounter?: boolean
} & MuiTextFieldProps

const TextField: React.FC<TextFieldProps> = ({
    helperText,
    displayCounter = false,
    ...props
}: TextFieldProps) => {
    const [length, setLength] = useState(0)
    return (
        <>
            <MuiTextField
                {...props}
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
