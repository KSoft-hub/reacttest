import React, { useState, useRef } from 'react'
import { Button, Paper } from '@mui/material'
import styled from 'styled-components'
import ConfirmationModal from '../../molecules/ConfirmationModal'
import { FormProvider, useForm } from 'react-hook-form'
import TextField from '../../atoms/TextField'
import { TestTable } from '../../../types/typescript-axios'
import { useSnackbar } from 'notistack'
import { validationSchema } from '../../../utils/validationSchema'

import { useFormContext } from 'react-hook-form'
import TextFields from '../../organisms/TextFields'
import { zodResolver } from '@hookform/resolvers/zod'
import { dataTagErrorSymbol } from '@tanstack/react-query'

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
    // const {
    //     reset,
    //     control,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm<TestTableFormTypes>({
    //     defaultValues: props.defaultValues,
    //     shouldFocusError: false,
    //     resolver: zodResolver(validationSchema)
    // })
    const methods = useForm<TestTableFormTypes>({
        defaultValues: props.defaultValues,
        shouldFocusError: false,
        resolver: zodResolver(validationSchema)
    })


    const [openSaveModal, setOpenSaveModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [data, setData] = useState<TestTableFormTypes>()
    const { enqueueSnackbar } = useSnackbar()


    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(
                    (data) => {
                        console.log(data)
                        enqueueSnackbar('Please check your input', {
                            variant: 'error'
                        })
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
                        <TextFields testTables={props.testTables} />
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
