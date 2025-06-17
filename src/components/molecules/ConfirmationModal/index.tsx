import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'

export interface ConfirmationModalProps {
    onClickDisagree: () => void
    onClickAgree: () => void
    open: boolean
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = (props: ConfirmationModalProps) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClickDisagree}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent style={{ padding: '34px 24px 0px', minWidth: 320 }}>
                <DialogContentText id="alert-dialog-description" style={{ color: '#000' }}>
                    Do you want to continue?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClickDisagree}>Disagree</Button>
                <Button onClick={props.onClickAgree} color="primary" autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationModal
