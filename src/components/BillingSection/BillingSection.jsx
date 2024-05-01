import { useState } from "react";
import './BillingSection.css';
import userIcon from '../../assets/icons/user.svg';
import BillingResult  from '../BillingResult/BillingResult';

const tipOptions = [5, 10, 15, 25, 50];

const BillingSection = () => {
    const [selectedOption, setSelectedOption] = useState(-1);
    const [tipAmount, setTipAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [history, setHistory] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const bill = parseInt(data.get('bill-input'));
        const numberOfPeople = parseInt(data.get('number-of-people-input'));

        console.log(bill, numberOfPeople, selectedOption);

        const tipTotal = bill * (tipOptions[selectedOption] / 100);
        const tipTotalPerPerson = tipTotal / numberOfPeople;

        const orderTotal = bill + tipTotal;
        const orderTotalPerPerson = orderTotal / numberOfPeople;
        
         // Crează o nouă comandă
        const newOrder = {
        bill: bill,
        tip: tipTotal,
        numberOfPeople: numberOfPeople,
        total: orderTotal
       };
        
        
        // Actualizează istoricul cu noua comandă
        setHistory([...history, newOrder]);

        setTipAmount(tipTotalPerPerson);
        setTotalAmount(orderTotalPerPerson);
    };

    const handleClick = (optionIndex) => {
        setSelectedOption(optionIndex);
    };

    const getAverageBillAmount = () => {
        if (history.length === 0) {
            return 0; // În cazul în care nu există istoric de comenzi, returnează 0
        }
        let totalBill = 0;
        // Iterează prin istoricul de comenzi și adună suma totală a facturilor
        for (let i = 0; i < history.length; i++) {
            totalBill += history[i].bill;
        }
        // Calculează media facturilor
        const averageBill = totalBill / history.length;
        return averageBill;
    }

    const getAverageTipAmount =() =>{
        if (history.length === 0) {
            return 0; // În cazul în care nu există istoric de comenzi, returnează 0
        }
        let totalTip=0;
        for(let i=0; i<history.length; i++){
            totalTip += history[i].tip;
        }
        const averageTip= totalTip/history.length;
        return averageTip;

    }

    const getAveragePeople =() =>{
        if (history.length === 0) {
            return 0; // În cazul în care nu există istoric de comenzi, returnează 0
        }
        let totalPerson=0;
        for(let i=0; i<history.length; i++){
            totalPerson += history[i].numberOfPeople;
        }
        const averagePeople= totalPerson/history.length;
        return averagePeople;
    }


    
    return (
        <section>
            <h1 className="billing-section-title"> SPLI TTER </h1>
            <div className="billing-container">
                <form onSubmit={handleSubmit} className="billing-form">
                    <div className="input-container">
                        <label className="standard-label" htmlFor="bill-input"> Bill </label>
                        <input className="standard-input" id="bill-input" name="bill-input" type="number" defaultValue={0} />
                        <p className="standard-input-indicator"> $ </p>
                    </div>
                    <div className="tip-options-container">
                        <p className="standard-label"> Select Tip % </p>
                        <div className="tip-options">
                            {tipOptions.map((option, index) => (
                                <button type="button" className={index === selectedOption ? 'selected' : ''} onClick={() => handleClick(index)} key={option}> {option}% </button>
                            ))}
                        </div>
                    </div>
                    <div className="input-container">
                        <label className="standard-label" htmlFor="number-of-people-input"> Number of People </label>
                        <input className="standard-input" id="number-of-people-input" name="number-of-people-input" type="number" defaultValue={0} />
                        <img className="standard-input-indicator" src={userIcon} />
                    </div>
                    <button type="submit" className="calculate-billing"> Calculate </button>
                </form>
                <div className="billing-result-container">
                    <div className="billing-result">
                        <div>
                            <p className="billing-result-heading"> Tip Amount </p>
                            <p className="billing-result-sub-heading"> /person </p>
                        </div>
                        <p className="billing-result-number"> ${tipAmount} </p>
                    </div>
                    <div className="billing-result">
                        <div>
                            <p className="billing-result-heading"> Total </p>
                            <p className="billing-result-sub-heading"> /person </p>
                        </div>
                        <p className="billing-result-number"> ${totalAmount} </p>
                    </div>
                </div>
            </div>

            {/* <ul>
                {history.map((order) => (
                    <li>  {order.bill} - {order.tip} </li>
                ))}
            </ul> */}

           
               <h1 className="billing-section-title"> Stats </h1>
               <div className="stats-container">
                  <div className="stats-avg-section">
                    <h3> Avg bill  </h3>
                    <p>$ {getAverageBillAmount()}</p>
                  </div>

                  <div className="stats-avg-section">
                     <h3>Avg tip</h3>
                     <p>$ {getAverageTipAmount()}</p>
                   </div>

                   <div className="stats-avg-section">
                     <h3>Avg People</h3>
                     <p>{getAveragePeople()}</p>
                   </div>
               </div>

               <h1 className="billing-section-title">History</h1>
               <div className="history-container">
                <ul>
                {history.map((order, index) => (
                    <li key={index} className="history-section">
                        <p> Bill: ${order.bill} </p>
                        <p> Tip: ${order.tip} </p>
                        <p> Number of People: {order.numberOfPeople} </p> 
                    </li>
                ))} 
                </ul>
               </div>
           
           
        </section>
    )
}

export default BillingSection;