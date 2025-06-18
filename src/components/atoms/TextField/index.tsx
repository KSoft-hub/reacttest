import React, { ChangeEvent, useEffect, useState } from 'react'
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

    // カウント
    const [length, setLength] = useState(0)

    // 文字列および変更時の処理
    const [value, setValue] = useState("ain");
    const onChangeHandler = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setValue(event.target.value);
    };



    return (
        <>
            <Controller
                name={`${props.name}`}
                control={control}
                render={({ field, fieldState }) => (
                    <MuiTextField
                        {...field}
                        fullWidth={props.fullWidth}
                        // カウンタが機能しないのでコメントアウト
                        // onChange={(e) => {
                        //     //setLength(e.target?.value?.length ?? 0)
                        //     //if (props.onChange !== undefined) {
                        //     //    props.onChange(e)
                        //     //}
                        // }}
                        error={fieldState.invalid}
                    />
                )}

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
