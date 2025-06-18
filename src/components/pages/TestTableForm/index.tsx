import React, { useCallback, useEffect, useRef, useState } from 'react'
import TestTableFormTemplate, { TestTableFormTypes } from '../../templates/TestTableFormTemplate'
import TestTableApi from '../../../utils/restClient'
import {
    TestTable,
    TestTableRequest,
} from '../../../types/typescript-axios'
import { useSnackbar } from 'notistack'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'


const TestTableForm: React.FC = () => {
    const [initialized, setInitialized] = useState(false)

    const [defaultValues, setDefaultValues] = useState<TestTableFormTypes>({
        name: '',
    })
    const [TestTables, setTestTables] = useState<TestTable[]>([])
    const { enqueueSnackbar } = useSnackbar()
    const saveProcessing = useRef(false)
    let history = useNavigate();
    const { id } = useParams();

    // 全件検索後、idよりテストテーブルを取得し、TestTablesにセットする
    useEffect(() => {
        TestTableApi
            .getTestTables()
            .then((response: any) => {
                const TestTables = response.data.filter((TestTable: any) => TestTable.id?.toString() !== id)
                setTestTables(TestTables)
            })
            .catch((e: any) => {
                enqueueSnackbar(`Failed to get TestTables`, {
                    variant: 'error'
                })
            })


    }, [])

    useEffect(() => {
        // 基本ここにははいらないはず
        if (!id) {
            setInitialized(true)
            return
        }
        TestTableApi
            .getTestTable(Number(id))
            .then((response) => {
                console.log("★apiの情報をセット" + response.data.name)
                setDefaultValues({
                    name: response.data.name ?? defaultValues.name,
                })
                setInitialized(true)
            })
            .catch((e) => {
                enqueueSnackbar(`Failed to get TestTable`, {
                    variant: 'error'
                })
            })

    }, [defaultValues.name, id
    ])

    const handleClickSave = useCallback(
        (data: TestTableFormTypes) => {
            console.log("押された：" + data.name);
            if (saveProcessing.current) {
                return
            }
            saveProcessing.current = true
            const TestTable = {
                name: data.name,
            } as TestTableRequest
            if (!id) {
                TestTableApi
                    .add(TestTable)
                    .then((response: any) => {
                        history(`/TestTables/edit/${response.data.id}`)
                        enqueueSnackbar('Saved', { variant: 'success' })
                    })
                    .catch((e: any) => {
                        enqueueSnackbar('Failed to save', { variant: 'error' })
                    })
                    .finally(() => {
                        setTimeout(() => {
                            saveProcessing.current = false
                        }, 2000)
                    })
            } else {
                // TODO
                // TestTableApi
                //     .update(Number(id), TestTable)
                //     .then((response: any) => {
                //         enqueueSnackbar('Saved', { variant: 'success' })
                //     })
                //     .catch((e) => {
                //         enqueueSnackbar('Failed to save', { variant: 'error' })
                //     })
                //     .finally(() => {
                //         setTimeout(() => {
                //             saveProcessing.current = false
                //         }, 2000)
                //     })
            }
        },
        [enqueueSnackbar, history, id]
    )

    const handleClickDelete = useCallback(() => {
        // TOD
        // TestTableApi
        //     ._delete(Number(id))
        //     .then(() => {
        //         enqueueSnackbar('Deleted', { variant: 'success' })
        //         history('/')
        //     })
        //     .catch((e: any) => {
        //         enqueueSnackbar('Failed to delete', { variant: 'error' })
        //     })
    }, [enqueueSnackbar, history, id])

    const handleClickCancel = useCallback(() => {
        history('/')
    }, [history])

    return initialized ? (
        <TestTableFormTemplate
            isEdit={!!id}
            testTables={TestTables}
            onClickSave={handleClickSave}
            defaultValues={defaultValues}
            onClickCancel={handleClickCancel}
            onClickDelete={handleClickDelete}
        />
    ) : null

}

export default TestTableForm
