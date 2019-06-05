import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function LocationPromptModal(props) {
  return (
    <Modal isOpen={props.show} toggle={props.toggle} className="arabic">
      <ModalHeader toggle={props.toggle}>تنبيه</ModalHeader>
      <ModalBody>
        <span>
          لكي يعمل الموقع بشكل جيد يرجى تشغيل نظام الملاحة (GPS) ثم الموافقة على
          طلب الحصول على موقعك
        </span>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.toggle}>
          إلغاء
        </Button>
        <Button color="primary" onClick={props.onAcceptedlocationPermission}>
          حسنا
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
}
