import { ICustomer } from './Customer.type';
import './CustomerList.style.css';
import CustomerModal from './CustomerModal';
import { useState } from "react";
import axios from 'axios';

type Props = {
    list: ICustomer[];
    onDeleteClickHnd : (data : ICustomer) => void;
    onEditClickHnd: (data : ICustomer) => void;
};


export const CustomerList = (props: Props) => {
    const { onDeleteClickHnd, onEditClickHnd } = props;
    const [showModal, setShowModal] = useState(false);
    const [dataToShow, setDataToShow] = useState(null as ICustomer | null);
    const [data, setData] = useState<ICustomer[]>([]);


    const viewCustomer = (data : ICustomer) =>
    {
        setDataToShow(data);
        setShowModal(true);
    }

    const onCloseModal = () => setShowModal(false);
    

    const getCustomer = () => {
    
         axios.get('/api/Customer')
         .then(res => {
                setData(res.data);
         }).catch(err => {
            console.log(err);
         })
    }

    getCustomer();

    return <div>
    <table>
        <tr><td>Name</td><td>Address</td>
            
        </tr>
        {data.map(customer => {
            return (<tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.address}</td>
                <td>
                    <input type="button" value="View" onClick={() => viewCustomer(customer)}/>
                    <input type="button" value="Edit" onClick={ () => onEditClickHnd(customer)} />
                    <input type="button" value="Delete" onClick={ () => onDeleteClickHnd(customer)} />
                </td>
            </tr>);
        })}
        </table>    
        {
            showModal && dataToShow !== null && <CustomerModal onClose={onCloseModal} data={dataToShow} />
        }
        
    </div>;
}

export default CustomerList;