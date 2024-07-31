import { ICustomer } from './Customer.type';
import './CustomerModal.style.css';

type Props = {
    onClose : () => void;
    data: ICustomer
}
const CustomerModal = (prop: Props) => {
    
    const { onClose, data } = prop

    return <div id="myModal" className="modal">
    <div className="modal-content">
      <span className="close" onClick={onClose}>&times;</span>
      <h3>Employee Data</h3>
      <div>
                <label>Name : {data.name}</label>

            </div>
            <div>
                <label>Email : {data.email}</label>

            </div>
            <div>
                <label>Phone : {data.phone}</label>

            </div>
            <div>
                <label>Address : {data.address}</label>

            </div>
            <div>
                <label>Date of Birth : {data.dateOfBirth.toString()}</label>

            </div>
    </div>
  
  </div>;
}

export default CustomerModal;