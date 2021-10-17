import { Alert, Snackbar } from "@mui/material";

interface SnacbarFieldProps {
  message: string;
  open: boolean;
  onClose: () => void;
  type?: ("success" | "error" | "warning" | "info")
}

export const SnacbarField = (props: SnacbarFieldProps) => {
  return (
    <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
      <Alert onClose={props.onClose} severity={props.type || "error"} sx={{ width: '100%' }}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}