import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomePageModule),
    },
    {
        path: 'loan-calculator',
        loadChildren:
            './loan-calculator/loan-calculator.module#LoanCalculatorPageModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'selfie-token',
        loadChildren:
            './selfie-token/selfie-token.module#SelfieTokenPageModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'landing',
        loadChildren: './landing/landing.module#LandingPageModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'eligibility',
        loadChildren: './eligibility/eligibility.module#EligibilityPageModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'loan-history',
        loadChildren:
            './loan-history/loan-history.module#LoanHistoryPageModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'pending-requests',
        loadChildren:
            './pending-requests/pending-requests.module#PendingRequestsPageModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'view-loan',
        loadChildren: './view-loan/view-loan.module#ViewLoanPageModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'test-otp',
        loadChildren: './test-otp/test-otp.module#TestOtpPageModule',
    },
    {
        path: 'commission',
        loadChildren: './commission/commission.module#CommissionPageModule',
    },
    {
        path: 'withdraw-funds',
        loadChildren:
            './withdraw-funds/withdraw-funds.module#WithdrawFundsPageModule',
    },
    {
        path: 'active-loans',
        loadChildren:
            './active-loans/active-loans.module#ActiveLoansPageModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'go-to-swift-pwa',
        loadChildren:
            './go-to-swift-pwa/go-to-swift-pwa.module#GoToSwiftPwaPageModule',
    },
    {
        path: 'post-loan',
        loadChildren: './post-loan/post-loan.module#PostLoanPageModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'loan-posting-confirmation',
        loadChildren:
            './loan-posting-confirmation/loan-posting-confirmation.module#LoanPostingConfirmationPageModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'confirm-commission-withdrawal',
        loadChildren:
            './confirm-commission-withdrawal/confirm-commission-withdrawal.module#ConfirmCommissionWithdrawalPageModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'commission-statement',
        loadChildren:
            './commission-statement/commission-statement.module#CommissionStatementPageModule',
    },
    {
        path: 'change-password',
        loadChildren: () =>
            import('./change-password/change-password.module').then(
                (m) => m.ChangePasswordPageModule
            ),
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
