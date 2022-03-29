import Alert from '@components/atoms/Alert/Alert';
import { ErrorMessage } from '@hookform/error-message';

import { FieldErrors } from 'react-hook-form';

type Props<T> = {
  errors: FieldErrors<T>;
} & (
  | { isSuccess?: never; successMessage?: never }
  | { isSuccess: boolean; successMessage: string }
);

function ErrorSummary<T>({ errors, isSuccess, successMessage }: Props<T>) {
  if (isSuccess) {
    return (
      <Alert role="sucess">
        <p className="text-green-700">{successMessage}</p>
      </Alert>
    );
  }

  if (
    Object.keys(errors).length === 0 ||
    !Object.keys(errors).find((key) => key === 'api')
  ) {
    return null;
  }

  return (
    <Alert role="error">
      {Object.keys(errors).map((key) =>
        key === 'api' ? (
          <ErrorMessage
            errors={errors}
            key={key}
            name={key as never}
            as="p"
            className="text-red-700"
          />
        ) : null
      )}
    </Alert>
  );
}

export default ErrorSummary;
