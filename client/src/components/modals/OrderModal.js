import { Modal, Button } from "antd";
import { currencyFormatter } from "../../actions/stripe";

function OrderModal({ session, orderedBy, showModal, setShowModal }) {
  function handleClick() {
    return setShowModal(false);
  }

  return (
    <Modal
      visible={showModal}
      title="Order Payment Info"
      onCancel={handleClick}
      onOk={() => {}}
      footer={[
        <Button key="ok" onClick={handleClick}>
          Ok
        </Button>,
      ]}
    >
      <p>Payment Intent: {session.payment_intent}</p>
      <p>Payment Status: {session.payment_status}</p>
      <p>
        Amount Total: {session.currency.toUpperCase()}{" "}
        {session.amount_total / 100}
      </p>
      <p>Stripe Customer Id: {session.customer}</p>
      <p>Customer: {orderedBy.name}</p>
    </Modal>
  );
}

export default OrderModal;
