import { ImageUploadService } from './../components/image-upload/image-upload.service';
import { Branches } from './branches.models';
import { IPaymentMethods } from './paymentMethods.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostLoanService } from './post-loan.service';
import { IReplacement, IActiveLoans } from '../active-loans/active-loans.model';
import { IEligibiity as IEligibility } from '../active-loans/eligibility.model';
import { ITeam } from './teamMembers.model';

@Component({
    selector: 'app-post-loan',
    templateUrl: './post-loan.page.html',
    styleUrls: ['./post-loan.page.scss'],
})
export class PostLoanPage implements OnInit, OnDestroy {
    requestLoanForm: FormGroup;
    paymentMethods: Array<IPaymentMethods>;
    loanTypes = ['DALEX', 'SNAP', 'SWIFT'];
    branches: Array<Branches>;
    previousBalance: number;
    isValid: boolean;
    replacementBalance: number;
    replacementLoanArray = [] as Array<IActiveLoans>;
    eligibilityData: IEligibility;
    activeLoans: Array<IActiveLoans>;
    loanTenors = [3, 6, 12, 18, 24, 36, 48, 54];
    teamMembers: Array<ITeam>;
    userInfo;

    constructor(
        private fb: FormBuilder,
        private postLoanService: PostLoanService,
        private imageUploadService: ImageUploadService
    ) {}

    ngOnInit() {
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        // check replacement balance
        // this.checkForReplacementBalance();
        // get eligiblity Data
        this.eligibilityData = JSON.parse(
            sessionStorage.getItem('eligibilityData')
        );

        if (
            this.imageUploadService.allRequiredImagesUploaded.observers.length <
            1
        ) {
            this.subscribeToImageEvent();
        }

        this.activeLoans = JSON.parse(sessionStorage.getItem('activeloans'));
        this.getPaymentMethods();
        this.getBranches();

        this.requestLoanForm = this.fb.group({
            staffid: [this.eligibilityData.EmployeeID, Validators.required],
            grossAmount: [0, Validators.required],
            netAmount: ['', Validators.required],
            existingBalance: [this.replacementBalance, Validators.required],
            tenor: [
                parseInt(this.eligibilityData.Tenor, 10),
                Validators.compose([
                    Validators.required,
                    Validators.max(parseInt(this.eligibilityData.Tenor, 10)),
                    Validators.min(0),
                ]),
            ],
            loantype: ['', Validators.required],
            paymentBranch: ['', Validators.required],
            paymentMethod: ['', Validators.compose([Validators.required])],
            DealDPCode: ['', Validators.required],
            contactNumber: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(10),
                ]),
            ],
            paymobileNumber: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(10),
                ]),
            ],
            selfieDPCode: ['', Validators.required],
            TLCode: ['', Validators.required],
            bankAccountNumber: [],
            clientName: [this.eligibilityData.FullName, Validators.required],
            mandatenumber: ['', Validators.required],
            mandatenumber2: ['', Validators.required],
            loanadvancenumber: ['', Validators.required],
            authoritynote: [''],
            tinNumber: [''],
            idcard: [''],
            employeetypeid: ['', Validators.required],
            affordability: [''],
            paymentBranchAlt: [''],
            paymentNumberAlt: [''],
            paymentMethodAlt: [''],
            bankAccountNumberAlt: [''],
            PaymentName: [''],
            paymobileNumberAlt: [''],
            comments: [''],
            createdBy: [this.userInfo[6].Value],
            selfieToken: ['', Validators.required],
        });
    }

    getPaymentMethods() {
        this.postLoanService.getPaymentMethods().subscribe(
            response => {
                this.paymentMethods = response;
            },
            err => {
                console.log(err);
            }
        );
    }
    getBranches() {
        this.postLoanService.getBranches().subscribe(
            response => {
                this.branches = response;
            },
            err => {
                console.log(err);
            }
        );
    }

    postLoan(form: FormGroup) {
        this.postLoanService.requestLoan(form.value).subscribe(response => {
            const responseData = JSON.parse(response.Data);
            sessionStorage.setItem('loanRequestResponse', response.Data);
            console.log(response, 'loan posting response');
            // this.postLoanService.presentLoadingWithOptions('Posting Loan');
            this.postLoanService.present();
            if (this.replacementLoanArray.length > 0) {
                this.compileLoan(this.replacementLoanArray, responseData.id);
            }
            this.imageUploadService.startImageUpload.emit(responseData.Id);
        });
        // this.imageUploadService.startImageUpload.emit('718');
    }

    checkForReplacementBalance() {
        const replacementLoansFromNav: Array<IActiveLoans> = this
            .replacementLoanArray;
        if (replacementLoansFromNav.length > 0) {
            this.replacementBalance = replacementLoansFromNav
                .map(loans => loans.ReplacementAmountDue)
                .reduce((prev, current) => prev + current, 0);
        } else {
            this.replacementBalance = 0;
        }
        console.log(this.replacementBalance);
    }

    getLoan(loan: IActiveLoans, e) {
        const loantoReplace = loan;
        const index = this.replacementLoanArray.indexOf(loantoReplace);
        if (!e.target.checked) {
            this.replacementLoanArray.push(loantoReplace);
        } else {
            this.replacementLoanArray.splice(index, 1);
        }
        this.checkForReplacementBalance();
        console.log(this.replacementLoanArray);
    }

    compileLoan(loan: Array<IActiveLoans>, id: number) {
        const replacementLoansChosen = [] as Array<IReplacement>;
        const loantoReplace = {} as IReplacement;
        loan.forEach(element => {
            loantoReplace.Id = id;
            loantoReplace.NavLoanId = element.Loan_No;
            loantoReplace.NetAmount = element.ReplacementAmountDue;
            replacementLoansChosen.push(loantoReplace);
        });

        this.postLoanService
            .configureNetAmount(replacementLoansChosen)
            .subscribe(response => {
                console.log(response);
            });
    }

    // get team members
    getTeamMembers() {
        this.postLoanService.getTeamMembers().subscribe(response => {
            this.teamMembers = response;
            // console.log(this.teamMembers, 'team members');
        });
    }

    ngOnDestroy() {
        this.imageUploadService.allRequiredImagesUploaded.unsubscribe();
    }

    ionViewWillLeave() {
        this.imageUploadService.allRequiredImagesUploaded.unsubscribe();
    }

    ionViewDidEnter() {
        this.getTeamMembers();
    }

    subscribeToImageEvent() {
        // subscribe to form is required mages upload event
        this.imageUploadService.allRequiredImagesUploaded.subscribe(
            (isValid: boolean) => {
                this.isValid = isValid;
                // console.log(
                //     this.isValid,
                //     'this is what the image service emits'
                // ); not needed
            }
        );
    }
}
