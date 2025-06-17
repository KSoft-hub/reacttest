import React, { useState, useRef } from 'react'
import { Button, Paper } from '@material-ui/core'
import styled from 'styled-components'
import ConfirmationModal from '../../molecules/ConfirmationModal'
import { FormProvider, useForm } from 'react-hook-form'
import TextField from '../../atoms/TextFields'
import { TestTable } from '../../../types/typescript-axios'
import { useSnackbar } from 'notistack'
import { validationSchema } from '../../../utils/validationSchema'

import { useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export type TestTableFormTypes = {
    name: string
}

export interface TestTableFormTemplateProps {
    isEdit: boolean
    testTables: TestTable[]
    defaultValues: TestTableFormTypes
    onClickSave: (data: TestTableFormTypes) => void
    onClickDelete: () => void
    onClickCancel: () => void
}

const TestTableFormTemplate: React.FC<TestTableFormTemplateProps> = (props: TestTableFormTemplateProps) => {
    const methods = useForm<TestTableFormTypes>({
        defaultValues: props.defaultValues,
        shouldFocusError: false,
        resolver: zodResolver(validationSchema)
    })
    // const { register } = useFormContext<any>()
    // const {
    //     register,
    //     watch,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm<TestTableFormTypes>({
    //     defaultValues: props.defaultValues, shouldFocusError: false
    // });


    const [openSaveModal, setOpenSaveModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [data, setData] = useState<TestTableFormTypes>()
    const { enqueueSnackbar } = useSnackbar()

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(
                    (data) => {
                        setData(data)
                        setOpenSaveModal(true)
                    },
                    (errors) => {
                        enqueueSnackbar('Please check your input', {
                            variant: 'error'
                        })
                    }
                )}
            >
                <StyledPaper variant="outlined">
                    <Item>
                        <TextField
                            label="Text field"
                            name="name"
                            inputProps={{ maxLength: 30 }}
                            error={!!methods.formState.errors.name}
                            helperText={methods.formState.errors.name?.message}
                            fullWidth={true}
                            displayCounter={true}
                        />
                    </Item>
                </StyledPaper>
                <ButtonContainer>
                    {props.isEdit && (
                        <StyledButton variant="contained" color="secondary" onClick={() => setOpenDeleteModal(true)}>
                            Delete
                        </StyledButton>
                    )}
                    <StyledButton variant="contained" onClick={props.onClickCancel}>
                        Cancel
                    </StyledButton>
                    <StyledButton type="submit" variant="contained" color="primary">
                        Save
                    </StyledButton>
                </ButtonContainer>
            </form>
            <ConfirmationModal
                onClickAgree={() => {
                    props.onClickSave(data!!)
                    setOpenSaveModal(false)
                }}
                onClickDisagree={() => setOpenSaveModal(false)}
                open={openSaveModal}
            />
            <ConfirmationModal
                onClickAgree={() => {
                    props.onClickDelete()
                    setOpenDeleteModal(false)
                }}
                onClickDisagree={() => setOpenDeleteModal(false)}
                open={openDeleteModal}
            />
        </FormProvider>
    )
}

const Item = styled.div`
  margin-bottom: 24px;
`

const StyledPaper = styled(Paper)`
  padding: 45px;
  min-width: 320px;
  max-width: 1024px;
  margin: 0 auto 16px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 320px;
  max-width: 1024px;
  margin: 0 auto 16px;
`

const StyledButton = styled(Button)`
  width: 120px;
  margin-left: 20px;
`

export default TestTableFormTemplate
