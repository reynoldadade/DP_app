// Generated by https://quicktype.io

export interface IActiveLoans {
    Employee_Id: string;
    Employee_Name: string;
    Loan_No: string;
    StaffName: string;
    Loan_Issue_Date: string;
    Deduction_Start_Period: string;
    Loan_Amount: number;
    Loan_Term: number;
    Total_Collectible: number;
    Monthly_Installment: number;
    TotalCommission: number;
    TotalOverider: number;
    LoanType: null;
    TotalOutstanding: string;
    TotalPaid: string;
    TotalRemaining: string;
    ReplacementAmountDue: number;
    OutrightAmountDue: number;
    IsPaid: boolean;
    IsCancelled: boolean;
    ReplacementEligibility: string;
    OutrightEligibility: string;
}

export interface IReplacement {
    Id: number;
    NavLoanId: string;
    NetAmount: number;
}
