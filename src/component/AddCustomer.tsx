import {v4 as uuidv4} from 'uuid';
import { useState } from "react";
import { ICustomer } from "./Customer.type";
import "./CustomerForm.style.css";
import axios from 'axios';

type Props = {
    onBackBtnClickHnd: () => void;
    onSubmitClickHnd: (data : ICustomer) => void;
};

const AddCustomer = (props: Props) => {
    const { onBackBtnClickHnd, onSubmitClickHnd } = props;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

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

        const data : ICustomer = {
            id : uuidv4(),
            name: name,
            email: email,
            phone: phone,
            address: address,
            dateOfBirth: new Date(dateOfBirth.toLocaleString())
        }

        axios.post('/api/Customer', data)
          .then(function (response) {
            console.log(response);
            onSubmitClickHnd(data);
            onBackBtnClickHnd();
          })
          .catch(function (error) {
            console.log(error);
          });

        
    }

    return <div className="form-container">
         <div>
            <h1>Add Customer</h1>
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
                <input type='submit' value='Add' />
            </div>
         </form>
    </div>;
}

export default AddCustomer;