import React, { useEffect, useState } from 'react'


export default function Form() {
    const getLocalItems =()=>{
        let list =localStorage.getItem('lists');

        if(list){
            return JSON.parse(localStorage.getItem('lists'));
        } else{
            return []
        }

    }
    const data = {DriverName:"",VehicleNumber:"", VehicleName:""}
    const [vehicleRegisteration, setVehicleRegisteration] = useState(data)
    function handleInput(e){
        setVehicleRegisteration({...vehicleRegisteration,[e.target.name]:e.target.value})
        console.log(vehicleRegisteration)
        
    }
    const [records, setRecords] = useState(getLocalItems());
    const handleDelete=(id)=>{
        const updateditems = records.filter((elems,ind)=>{
            return ind !== id;
        })
        setRecords(updateditems);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecord = { ...vehicleRegisteration, id: new Date().getTime().toString() };

        // console.log(records)
        setRecords([...records, newRecord]);
        // console.log(records);
        setVehicleRegisteration({
            DriverName: "",
            VehicleNumber: "",
            VehicleName:""
        })
    }
    var showdate = new Date();
    var displaytodaystime = showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();
    useEffect(()=>{
        localStorage.setItem('lists',JSON.stringify(records))

    },[records]);
    return (
        <>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Drivers Name</label>
                <input type="email" autoComplete="off"
                    value={vehicleRegisteration.DriverName}
                    onChange={handleInput}

                    className="form-control" name='DriverName' placeholder="" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Vehicle Number</label>
                <input type="text" autoComplete="off"
                    value={vehicleRegisteration.VehicleNumber}
                    onChange={handleInput}

                    className="form-control" name='VehicleNumber' placeholder="" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Vehicle Name</label>
                <input type="text" autoComplete="off"
                    value={vehicleRegisteration.VehicleName}
                    onChange={handleInput}

                    className="form-control" name='VehicleName' placeholder="" />
            </div>
            {/* <div className="mb-3">
                <label htmlFor="birthday">CheckInDate:</label>
                <input type="time"
                    value={vehicleRegisteration.CheckInTime}
                    onChange={handleInput} 

                    id="birthday" name="CheckInTime" />
            </div> */}
            <input className="btn btn-primary" type="submit" value="Submit" onClick={handleSubmit}></input>


            <div>
                <h1 className="my-3">Parked Vehicles</h1>
                {
                    records.map((currElem,ind) => {
                        return (
                            <div className='d-flex py-3 my-3 container' style={{border: "2px solid black", width:"fit-content"}} key={ind}>
                                <p className='mx-3'>{currElem.DriverName}</p>
                                <p className='mx-3'>{currElem.VehicleNumber}</p>
                                <p className='mx-3'>{currElem.VehicleName}</p>
                                <p className='mx-3'>{displaytodaystime}</p>
                                <button className='mx-3' onClick={()=>handleDelete(ind)}>Delete</button>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <h3>Total Vehicles in the Parking</h3>
                <h3>{records.length}</h3>
            </div>
        </>
    )
}
