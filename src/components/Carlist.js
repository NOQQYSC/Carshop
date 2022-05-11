import React, { useState, useEffect, Component } from "react";
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from'@mui/material/Button';
import Addcar from "./Addcar";
import Editcar from "./Editcar";



export default function Carlist() {
    const [cars, setCars] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    }

    
    

        const deleteCar = (link) => {
            if (window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
            }

        }
          
        const saveCar = (car) => {
            fetch('https://carstockrest.herokuapp.com/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(car)
            })
            .then(res => fetchData())
            .catch(err => console.error(err))
        }

        const updateCar = (car, link) => {
            fetch(link, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(car)
            })
            .then(res => fetchData())
            .catch(err => console.error(err))
        }

        const columns = [
            {headerName: 'Brand', field: 'brand', sortable: true, filter: true, floatingFilter: true},
            {headerName: 'Model', field: 'model', sortable: true, filter: true, floatingFilter: true},
            {headerName: 'Color', field: 'color', sortable: true, filter: true, floatingFilter: true},
             {headerName: 'Fuel', field: 'fuel', sortable: true, filter: true, floatingFilter: true},
             {headerName: 'Year', field: 'year', sortable: true, filter: true, floatingFilter: true},
             {headerName: 'Price', field: 'price', sortable: true, filter: true, floatingFilter: true},
             {
                headerName: '',
                sortable: false, filter: false, floatingFilter: false, width: 100,
                cellRenderer: row => <Editcar car={row.data} updateCar={updateCar} />
                
             },
             {
                sortable: false, filter: false, floatingFilter: false, width: 100,
                headerName: '',
                 field: '_links.self.href',
                 cellRenderer: row => <Button size="small" color="secondary" onClick={() => deleteCar(row.value)}>Delete</Button>
            },
             
             //<Button color="secondary" onClick={() => deleteCar(row.value)}>Delete</Button> 
            
             
            ]

    return (
        
            <div className="ag-theme-material"
                style={{height: '700px', width: '100%', margin: 'auto'}} >
            <Addcar saveCar={saveCar} />
            <AgGridReact
            
            columnDefs={columns}
            rowData={cars}
            >
            </AgGridReact>

        </div>
    );
}