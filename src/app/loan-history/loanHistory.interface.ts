
export interface LoanSummary {
    'TotalCommission': number;
    'TotalLoans': number;
    'TotalOverider': number;
}


export interface LoanInterface {
    'Id': number;
    'LoanRefId': string;
    'ClientRefId': string;
    'ClientName': string;
    'LoanType': string;
    'TransactionType': string;
    'Branch': string;
    'PaymentMethod': string;
    'AccountNumber': string;
    'TNT_DPCode': string;
    'Deal_DPCode': string;
    'MobileNumber': string;
    'ContactNumber': string;
    'TLCode': string;
    'EmployerName': string;
    'Tenor': string;
    'GrossAmount': string;
    'NetAmount': string;
    'TransactionStatus': string;
    'IsReplaced': true;
    'ErrorCode': string;
    'ErrorReason': string;
    'StatusByUser': string;
    'StatusDate': string;
    'SelfieFileName': string;
    'VoterFileName': string;
    'PassportPictureFileName': string;
    'LoanAdvanceFormFileName': string;
    'SelfieCode': string;
    'FormAFileName': string;
    'AppointmentLetterFileName': string;
    'TransferFileName': string;
    'NavLoanId': string;
    'Commission': number;
    'Overider': number;
    'CreatedByUser': string;
    'CreatedByDate': string;
    'MandateNumber': string;
    'MandateNumber2': string;
    'LoanAdvanceNumber': string;
    'AuthorityNoteNumber': string;
    'IDCardNumber': string;
    'EmployerTypeId': string;
    'Affordability': number;
    'Instructions': string;
    'TinNumber': string;
    'Comments': string;
    'UserBranch': string;
    'paymentBranchAlt': string;
    'paymentMethodAlt': string;
    'paymentNumberAlt': string;
    'paymentProviderAlt': string;
    'bankAccountNumber': string;
    'paymentmobileNumber': string;
    'refundmessage': string;
    'monthlyinstallments': number;
    'PaymentName': string;
    'AltType': string;
    'SelfieToken': string;
    'AutoPostResult': string;
}
