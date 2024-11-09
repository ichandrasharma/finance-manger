import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";

export const FinancialRecordForm = () => {
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("");

    const {addRecord} = useFinancialRecords();
    const {user} = useUser();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newRecord = {
            userId: user?.id ?? "",
            date: new Date(),
            description: description,
            amount: parseFloat(amount),
            category: category,
            paymentMethod: paymentMethod,
        };

        addRecord(newRecord);
        setDescription("");
        setAmount("");
        setPaymentMethod("");
    };

  return (
    <div className="form-container">
        <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label>Description:</label>
                <input type="text"
                required
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="form-field">
                <label>Amount:</label>
                <input type="number"
                required
                className="input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="form-field">
                <label>Category:</label>
                <select 
                required
                className="input"
                value={category}
                onChange={(e) => setCategory(e.target.value)} >
                <option value="">Choose a Category</option>
                <option value="EMI">EMI</option>
                <option value="Rasan">Rasan</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Gym">Gym</option>
                <option value="Rent">Rent</option>
                <option value="Salary">Salary</option>
                <option value="Externel Project">Externel Project</option>
                <option value="Movies">Movies</option>
                <option value="Restorent">Restorent</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>
                </select>
            </div>
            <div className="form-field">
                <label>Payment By:</label>
                <select 
                required
                className="input"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)} >
                    <option value="">Choose Payment Option</option>
                    <option value="UPI">UPI</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option> 
                    <option value="Cash">Cash</option>
                    <option value="Bank">Bank</option>
                </select>
            </div>
            <button type="submit" className="button">
                Add Record
            </button>
        </form>      
    </div>
  )
}