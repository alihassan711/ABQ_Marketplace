import Alert from 'react-bootstrap/Alert';

const AlertMessage = (props) => {
  return (
    <>
      {[
        'danger',
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
          {props.message}
        </Alert>
      ))}
    </>
  );
}

export default AlertMessage;