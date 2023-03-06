import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import "../style/statusbar.css"

type SubmissionMessageType = {
    apiStatusCode: string, 
    apiMsg: string,
    open: boolean,
    setOpen: any,
    severity: "success" | "info" | "warning" | "error",
}

export default function SubmissionMessage(props: SubmissionMessageType) {
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={props.open}>
        <Alert
          severity={props?.severity ? props.severity : "info" }
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                props.setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          { props.apiMsg }
        </Alert>
      </Collapse>
    </Box>
  );
}