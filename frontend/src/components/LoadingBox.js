import Spinner from 'react-bootstrap/Spinner';
import { Trans } from 'react-i18next'

export default function LoadingBox() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden"><Trans>Loading...</Trans></span>
    </Spinner>
  );
}
