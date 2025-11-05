import React, { useEffect, useState } from 'react';
import { CustomerService } from '../services/customerservice';

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({ id: null, fullName: "", phoneNo: null, emailAddress: "" });

    useEffect(() => {
        CustomerService.getAll().then(setCustomers);
    }, [])


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    function handleadd() {
        if (!form.fullName || !form.emailAddress || !form.phoneNo) {
            alert("Details not set, validation failed");
            return;
        }
        CustomerService.add(form).then(() => {
            CustomerService.getAll().then(setCustomers)
        })

    }

    function handleUpdate() {
        console.log(form);

        if (!form.fullName || !form.emailAddress || !form.phoneNo) {
            alert("Details not set, validation failed");
            return;
        }

        CustomerService.update(form).then(() => {
            CustomerService.getAll().then(setCustomers);
        })
    }


    function handleDelete(id) {
        CustomerService.delete(id).then(() => {
            CustomerService.getAll().then(setCustomers);
        })
    }

    return (
        <>
            <h1>Customer Management Software</h1><hr />
                <div className="container row">
                    <div className="col-md-8 container row">
                                {

                                    customers.map((cst) => {
                                        return (
                                            <div key={cst.id} className='col-md-6 p-3'>
                                                <div className="card">
                                                    <div className="card-title text-primary text-center mt-4"> {cst.fullName} </div>
                                                    <hr />
                                                    <div className="card-body">
                                                        <p>Id: {cst.id}</p>
                                                        <p>Contact No: {cst.phoneNo}</p>
                                                        <p>Email Address: {cst.emailAddress}</p>

                                                        <button
                                                            onClick={() => handleDelete(cst.id)}
                                                            className=' btn btn-secondary position-absolute top-0 end-0'
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                    </div>
                    <div className="col-md-4 text-center">
                        <h2>New Record Adding</h2>
                        <hr />
                        <input className='form-control m-3' name='id' value={form.id} onChange={handleChange} placeholder='id' />
                        <input className='form-control m-3' name='fullName' value={form.fullName} onChange={handleChange} placeholder='FullName' />
                        <input className='form-control m-3' name='phoneNo' value={form.phoneNo} onChange={handleChange} placeholder='phoneNo' />
                        <input className='form-control m-3' name='emailAddress' value={form.emailAddress} onChange={handleChange} placeholder='emailAddress' />
                        <button onClick={handleadd} className='btn btn-success ms-5'><i class="fa-solid fa-plus"></i></button>
                        <button onClick={handleUpdate} className='btn btn-secondary mx-2'><i class="fa-solid fa-user-pen"></i></button>


                    </div>
                </div>
        </>
    )





}


