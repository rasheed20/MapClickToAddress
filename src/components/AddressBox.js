import { useContext } from "react";
import { addressContext } from "./contexts";

const AddressBox = (props)=>{
    let address = useContext(addressContext)
    return(
        <div id='addressBox'> 
            <div className='text'>
                {/* {props.address}  */}
                {address}
            </div> 
        </div>
    )
}

export default AddressBox;