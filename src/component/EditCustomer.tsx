import { ICustomer } from "./Customer.type";
import { useState } from "react";
import axios from 'axios';

type Props = {
  data: ICustomer;
  onBackBtnClickHnd: () => void;
    onSubmitClickHnd: (data : ICustomer) => void;
};

const EditCustomer = (props: Props) => {
  const { data, onBackBtnClickHnd, onSubmitClickHnd } = props;
  const [name, setName] = useState(data.name);
    const [email, setEmail] = useState(data.email);
    const [phone, setPhone] = useState(data.phone);
    const [address, setAddress] = useState(data.address);
    const [dateOfBirth, setDateOfBirth] = useState(data.dateOfBirth.toLocaleString());

    const onNameChangeHnd = (e : any) => {
      setName(e.target.value);
  }

  const onEmailChangeHnd = (e : any) => {
      setEmail(e.target.value);
  }

  const onAddressChangeHnd = (e : any) => {
      setAddress(e.target.value);
  }

  const onPhoneChangeHnd = (e : any) => {
      setPhone(e.target.value);
  }

  const onDobChangeHnd = (e : any) => {
      setDateOfBirth(e.target.value);
  }

  const onSubmitBtnClickHnd = (e: any) => {
      e.preventDefault();

      const updatedData : ICustomer = {
          id : data.id,
          name: name,
          email: email,
          phone: phone,
          address: address,
          dateOfBirth: new Date(dateOfBirth.toLocaleString())
      }
   


    axios.put('/api/Customer/' + data.id, updatedData)
    .then(response => {
        console.log(response);
        onSubmitClickHnd(updatedData);
        onBackBtnClickHnd();
    })
    .catch(error => {
        if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        } else if (error.request) {
        console.log(error.request);
        } else {
        console.log('Error', error.message);
        }
        console.log(error.config);
    });
      
  }

  return <div className="form-container">
         <div>
            <h1>Edit Customer</h1>
         </div>
         <form onSubmit={onSubmitBtnClickHnd}>
            <div>
                <label>Name :</label>
                <input type='text' value={name} onChange={onNameChangeHnd}/>
            </div>
            <div>
                <label>Email :</label>
                <input type='text' value={email} onChange={onEmailChangeHnd}/>
            </div>
            <div>
                <label>Phone :</label>
                <input type='text' value={phone} onChange={onPhoneChangeHnd}/>
            </div>
            <div>
                <label>Address :</label>
                <input type='text' value={address} onChange={onAddressChangeHnd}/>
            </div>
            <div>
                <label>Date of Birth :</label>
                <input type='text' value={dateOfBirth} onChange={onDobChangeHnd}/>
            </div>
            <div>
                <input type='button' value='Back' onClick={onBackBtnClickHnd} />
                <input type='submit' value='Update' />
            </div>
         </form>
    </div>;
}

export default EditCustomer