import { useSelector,useDispatch } from "react-redux";
import {deletecart,editCart} from '../cart-components/redux/slice/cardslice'
import './CartList.css'
import { useState,useEffect } from "react";
function AddToCart(){
    const state =useSelector((state)=>state.cart.data)
    // console.log("addto card quantity value",state[0].quantity)
    //id:id,title:title,price:price,description:description,image:image,quantity:quantity
    let total =0;
    state.map((item)=>{
       return total +=item.quantity* item.price;
    })
    return(
        <div className="add-cart-container pt-4">
          {state.length?state.map((item,index)=><AddItem title={item.title} price={item.price} quantity={item.quantity} image={item.image} index={index}/>):<h1 className="text-center text-white">No Item Added To the Cart</h1>}
          <p style={{fontWeight:"bolder",backgroundColor:"white",color:"black",width:"30%",borderRadius:"15px"}} className="text-center p-2 m-2" >Total Amount : ₹{Math.round(total)}</p>
        </div>
    )
}
export default AddToCart;

function AddItem({title,price,quantity,image,index}){
    const dispatch = useDispatch();
    const [isedit,setIsedit]=useState(false);
    const [decrementbtn,setDecrementbtn] =useState(true);
    const [quantitys,setQuantitys]=useState(quantity);
    useEffect(()=>{
        checkValue()
    },[quantitys]);
    const checkValue = ()=>{
        if(quantitys!==1){
            setDecrementbtn(false)
            return;
        }
        setDecrementbtn(true);
        return;
    }
    const editquantity= ()=>{
        dispatch(editCart({index:index,quantity:quantitys}));
        setIsedit(false)
    }
     
    const increment = ()=>{
        console.log("before increment",quantity);
        setQuantitys(quantitys+1); 
        console.log("After increment",quantity)      
    }
    const decrement = () =>{
        setQuantitys(quantitys-1);
    }
    
    return(
            <div className="additem-container p-3  m-2 mt-0" style={{width: "98%",display:"flex",alignItems:"center",border:"5px solid gold",borderRadius:"25px",backgroundColor:"white",color:"black"}}>
                <img src={image} className="card-img-top" alt="..." style={{height:"10rem" ,width:"10rem"}}></img>
                <div className="card-body ps-5">
                    <p className="card-text"><span style={{fontWeight:"bold"}}>Product Name:</span> <span className="ms-2">{title}</span></p>
                    <p className="card-text "><span style={{fontWeight:"bold"}}>Price:</span> <span className="ms-2 text-success">₹{price}</span></p>
                    <p className="card-text" style={{display:"flex",alignItems:"center"}}><span style={{fontWeight:"bold"}}>Quantity:</span> <span className="text-primary ">
                        {
                           isedit?
                            <span style={{display:"flex",alignItems:"center",}} className="ms-5"> <button type="button" className="btn btn-outline-danger" onClick={decrement} disabled={decrementbtn}>-</button>
                            <p style={{width:"2rem"}} className="text-center mb-0">{quantitys}</p>
                            <button type="button" className="btn btn-outline-success" onClick={increment}>+</button>
                            </span>
                            :
                             <span className="text-primary ms-3" style={{fontSize:"1.2rem"}}>{quantity}</span>
                        }
                            </span></p>
                    <p><span style={{fontWeight:"bolder"}} className="text-danger">Total Price: <span className="text-success">₹{price * quantity}</span></span></p>
                </div>
                {!isedit?<div className="card-btn p-5">
                    <i class="fa-regular fa-pen-to-square pe-3 text-warning" style={{fontSize:"2rem"}} onClick={()=>setIsedit(true)}></i>
                    <i class="fa-solid fa-trash text-danger"  style={{fontSize:"2rem"}} onClick={()=>dispatch(deletecart({index:index}))}></i>
                </div>
                :<div className="card-btn p-5">
                    <i class="fa-solid fa-check pe-3 text-success"  style={{fontSize:"2rem"}} onClick={editquantity} ></i>
                </div>
                }
            </div>
    )
}