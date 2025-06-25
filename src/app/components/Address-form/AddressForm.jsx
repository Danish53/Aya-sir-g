import React, { useState } from "react";
import "./addressForm.css";
import { FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { RiEdit2Line } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function AddressForm(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.onClose();
  };

  return (
    <section className="address_Form p-3">
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        className="address_Form"
      >
        <div className="outer_flex d-flex align-items-center">
          <div className="inner_flex d-flex align-items-center">
            <FiPlus className="plus_icon" />
            <p>Add Address</p>
          </div>
          <RxCross2 className="cross_icon" onClick={handleClose} />
        </div>

        <Modal.Body>
          <Form>
            {[1, 2, 3].map((n) => (
              <div className="address_card mt-3 pb-3" key={n}>
                <h4>Address {n}</h4>
                <div className="parent_div d-flex align-items-center justify-content-between">
                  <div className="left_div">
                    <p>123 Main Street, Gulberg, Lahore, Punjab, Pakistan</p>
                  </div>
                  <div className="d-flex align-items-center right_div justify-content-end icon_div">
                    <RiEdit2Line className="icon" />
                    <RiDeleteBin6Line className="icon" />
                  </div>
                </div>
              </div>
            ))}
          </Form>
        </Modal.Body>
      </Modal>
    </section>
  );
}
