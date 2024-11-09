import { useUser } from "@clerk/clerk-react"
import { createContext, useContext, useEffect, useState } from "react"

export interface FinacialRecord {
    _id?: string;
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}

interface FinacialRecordsContextType {
    records: FinacialRecord[];
    addRecord: (record: FinacialRecord) => void;
    updateRecord: (id: string, newRecord: FinacialRecord) => void;
    deleteRecord: (id: string) => void;
}

export const FinacialRecordsContext = createContext<FinacialRecordsContextType | undefined >(undefined);

export const FinacialRecordsProvider = ({children,}: {children: React.ReactNode;}) => {
    const [records, setRecords] = useState<FinacialRecord[]>([]);
    const { user } = useUser();

    const fetchRecords = async () => {
        if(!user) return;
        const response = await fetch(`http://localhost:3001/financial-records/getAllByUserId/${user.id}`);

        if(response.ok) {
            const records = await response.json();
            console.log(records);
            setRecords(records);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, [user]);

    const addRecord = async (record: FinacialRecord) => {
        const response = await fetch("http://localhost:3001/financial-records", {
            method: "POST",
            body: JSON.stringify(record),
            headers: {
                "Content-Type": "application/json",
            },
        });

        try {
            if(response.ok)  {
                const newRecord = await response.json();
                setRecords((prev) => [...prev, newRecord]);
            }
        } catch (error) {
            
        }
    };

    const updateRecord = async (id:string,  newRecord: FinacialRecord) => {
        const response = await fetch(`http://localhost:3001/financial-records/${id}`, {
            method: "PUT",
            body: JSON.stringify(newRecord),
            headers: {
                "Content-Type": "application/json",
            },
        });

        try {
            if(response.ok)  {
                const newRecord = await response.json();
                setRecords((prev) => prev.map((record) => {
                    if (record._id === id) {
                        return newRecord;
                    } else {
                        return record;
                    }
                }));
            }
        } catch (error) {
            
        }
    };

    const deleteRecord = async (id: string) => {
        const response = await fetch(`http://localhost:3001/financial-records/${id}`, {
            method: "DELETE",
        });

        try {
            if(response.ok)  {
                const deleteRecord = await response.json();
                setRecords((prev) => prev.filter((record) => record._id !== deleteRecord._id));
            }
        } catch (error) {
            
        }
    };

    return (<FinacialRecordsContext.Provider value={{records, addRecord, updateRecord, deleteRecord}}>
        {children}
    </FinacialRecordsContext.Provider>);
};

export const useFinancialRecords = () => {
    const context = useContext<FinacialRecordsContextType | undefined>(
        FinacialRecordsContext
    );

    if (!context) {
        throw new Error("useFinancialRecords must be used within a FinancialRecordsProvider ");
    }

    return context;
};