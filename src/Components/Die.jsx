import './Die.css'

export default function Die({value,isHeld,toggle}) {
  
    return (
    
            <div className="die--face" style={{backgroundColor: isHeld === true? "#59E391" : "#ffffff"}} onClick={toggle}>
            <h2>{value}</h2>
            </div>
       
    )
}