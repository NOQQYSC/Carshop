import React from "react";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';



export default function Editcar(props) {

const [open, setOpen] = React.useState(false);
const [car, setCar] = React.useState({
    brand: '', model: '', color: '', fuel: '', year: '', price: ''
});

const handleClickOpen = () => {
    console.log(props.car)
    setCar({
        brand: props.car.brand, 
        model: props.car.model, 
        color: props.car.color, 
        year: props.car.year, 
        fuel: props.car.fuel, 
        price: props.car.price
            })
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

const handleInputChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value})
}

const updateCar = () => {
    props.updateCar(car, props.car._links.car.href);
    handleClose();
}

return(
    <div>
    <Button color="primary" onClick={handleClickOpen}>
        Edit
    </Button>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Edit Car
        </DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                name="brand"
                value={car.brand}
                onChange={e => handleInputChange(e)}
                label="Brand"
                fullWidth
            />
            <TextField
                margin="dense"
                name="model"
                value={car.model}
                onChange={e => handleInputChange(e)}
                label="Model"
                fullWidth
            />
            <TextField
                margin="dense"
                name="color"
                value={car.color}
                onChange={e => handleInputChange(e)}
                label="Color"
                fullWidth
            />
            <TextField
                margin="dense"
                name="year"
                value={car.year}
                onChange={e => handleInputChange(e)}
                label="Year"
                fullWidth
            />
            <TextField
                margin="dense"
                name="fuel"
                value={car.fuel}
                onChange={e => handleInputChange(e)}
                label="Fuel"
                fullWidth
            />
            <TextField
                margin="dense"
                name="price"
                value={car.price}
                onChange={e => handleInputChange(e)}
                label="Price"
                fullWidth
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={updateCar} color="primary">
                Save
            </Button>
        </DialogActions>
      </Dialog>
    </div>
);
}