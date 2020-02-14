import { Component, OnInit } from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {LoanInterface} from '../loan-history/loanHistory.interface';

@Component({
  selector: 'app-view-loan',
  templateUrl: './view-loan.page.html',
  styleUrls: ['./view-loan.page.scss'],
})
export class ViewLoanPage implements OnInit {
  data: LoanInterface;
  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
  }

    ionViewDidEnter() {
      this.data = this.sharedService.getItem('loanDetails');
      // console.log(this.data);
  }

}
