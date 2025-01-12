import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'primereact/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionsBtns = ({ rowData, onEdit, onDelete, onView }) => {
  const navigate = useNavigate();

  return (
    <div className="actionbtn flex align-content-center">
      <Button
        icon={<FontAwesomeIcon icon={faPencil} />}
        className="p-button p-button-success mr-2"
        onClick={() => {
          if (onEdit) {
            onEdit(rowData);
          } else {
            navigate(`/sales/newsales?saleId=${rowData.saleId}`);
          }
        }}
      />
      <Button
        icon={<FontAwesomeIcon icon={faTrash} />}
        className="p-button p-button-danger mr-2"
        onClick={() => onDelete && onDelete(rowData)}
      />
      <Button
        icon={<FontAwesomeIcon icon={faEye} />}
        className="p-button p-button-info mr-2"
        onClick={() => onView && onView(rowData)}
      />
    </div>
  );
};

export default ActionsBtns;