import { useState } from 'react';
import './Home.style.css';
import CustomerList from './CustomerList';
import AddCustomer from './AddCustomer';
import { ICustomer, PageEnum, testCustomerList } from './Customer.type';
import EditCustomer from './EditCustomer';
import axios from 'axios';


const Home = () =>{
    const [customerList, setCustomerList] = useState(testCustomerList as ICustomer[]);
    const [shownPage, setShownPage] = useState(PageEnum.list);
    const [dataToEdit, setDataToEdit] = useState({} as ICustomer);

    const onAddEmployeeClickHnd = () => {
         setShownPage(PageEnum.add);
    };

    const showListPage = () => {
        setShownPage(PageEnum.list);
        //getCustomer();
   };

   const addCustomerHnd = (data : ICustomer) => {
        setCustomerList([...customerList, data]);
   }

   const editCustomerHnd = (data : ICustomer) => {
    const filteredData = customerList.filter(x => x.id === data.id)[0];
    const indexOfRecord = customerList.indexOf(filteredData);
    const tempData = [...customerList];
    tempData[indexOfRecord] = data;
    setCustomerList(tempData);
}

   const deleteCustomer = (data: ICustomer) => {
      
      axios.delete('/api/Customer/' + data.id)
        .then(response => {
            console.log('Deleted post with ID ' + data.id);
            const indexToDelete = customerList.indexOf(data);
            const tempList =[...customerList];

            tempList.splice(indexToDelete);
            setCustomerList(tempList);
        })
        .catch(error => {
            console.error(error);
        });
   }

   const editCustomer = (data: ICustomer) => {
    setShownPage(PageEnum.edit);
    setDataToEdit(data);
   }

    return (
        <>
           <article className='article-header'>
               <header>
                  <h1>Prototype</h1>
               </header>
           </article>

           {shownPage === PageEnum.list && (<section className='section-content'>
               <article className='list-header'>
                    <h3>Customer List</h3>
               </article>
               <input type="button" value="Add Customer" onClick={onAddEmployeeClickHnd}
                className="add-customer-btn"/>
               <CustomerList list={customerList} onDeleteClickHnd={deleteCustomer} onEditClickHnd={editCustomer} />
           </section>)}

           {shownPage === PageEnum.add && (<section className='section-content'>
               <AddCustomer onBackBtnClickHnd={showListPage} onSubmitClickHnd={addCustomerHnd} />
           </section>)} 
           
           {shownPage === PageEnum.edit && (<section className='section-content'>
               <EditCustomer data={dataToEdit} onBackBtnClickHnd={showListPage} onSubmitClickHnd={editCustomerHnd}/>
           </section>)}


        </>
    );
};

export default Home;