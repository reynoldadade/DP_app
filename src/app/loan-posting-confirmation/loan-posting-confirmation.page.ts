import { Component, OnInit } from '@angular/core';
import { ILoanModel } from './loan.model';
import { IuploadImageForm } from '../components/image-upload/imageUploadForm.model';

@Component({
  selector: 'app-loan-posting-confirmation',
  templateUrl: './loan-posting-confirmation.page.html',
  styleUrls: ['./loan-posting-confirmation.page.scss'],
})
export class LoanPostingConfirmationPage implements OnInit {
  loanRequestResponse: ILoanModel;
  imageResponse: IuploadImageForm;
  constructor() { }

  ngOnInit() {
    this.loanRequestResponse = JSON.parse(sessionStorage.getItem('loanRequestResponse'));
    this.imageResponse = JSON.parse(sessionStorage.getItem('imageResponse'));
  }

}
