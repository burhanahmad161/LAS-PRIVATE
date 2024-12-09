import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './client/home/home.component';
import { AuctionsComponent } from './client/auctions/auctions.component';
import { AboutComponent } from './client/about/about.component';
import { ContactComponent } from './client/contact/contact.component';
import { FaqComponent } from './client/faq/faq.component';
import { FeedbackComponent } from './client/feedback/feedback.component';
import { LoginComponent } from './client/login/login.component';
import { BiddingComponent } from './client/bidding/bidding.component';
import { AddUsersComponent } from './admin/add-users/add-users.component';
import { CompletedAuctions } from './admin/completed-auctions/completed-auctions.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { ViewUsersComponent } from './admin/view-users/view-users.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { MainLoginComponent } from './client/main-login/main-login.component';
import { AddAuctionComponent } from './admin/add-auction/add-auction.component';
import { DeleteAuctionComponent } from './admin/delete-auction/delete-auction.component';
import { SellItemComponent } from './client/sell-item/sell-item.component';
import { AuctionRequestsComponent } from './admin/auction-requests/auction-requests.component';
import { AuctionsListComponent } from './admin/auctions-list/auctions-list.component';
import { TestToastsComponent } from './client/test-toasts/test-toasts.component';
// import { AdminGuard } from './auth/admin.guard';
// import { ViewUsersComponent } from './view-users/view-users.component';
// import { HomeComponent } from './client/home/home.component';
// import { GetStartedComponent } from './client/get-started/get-started.component';
// import { DashboardComponent } from './admin/dashboard/dashboard.component';
// import { UsersComponent } from './admin/users/users.component';
// import { AuctionsComponent } from './admin/auctions/auctions.component';
// import { AddItemComponent } from './admin/add-item/add-item.component';
// import { SettingsComponent } from './admin/settings/settings.component';
// import { report } from 'process';
// import { ReportsComponent } from './admin/reports/reports.component';
// import { BidNowComponent } from './client/bid-now/bid-now.component';
// import { LoginComponent } from './client/login/login.component';
// import { BidsComponent } from './client/bids/bids.component';
// import { AboutComponent } from './client/about/about.component';
// import { ServicesComponent } from './client/services/services.component';
// import { HelpPageComponent } from './client/help-page/help-page.component';
// import { ContactComponent } from './client/contact/contact.component';
// import { PrivacyComponent } from './client/privacy/privacy.component';
// import { BecomeSellerComponent } from './client/become-seller/become-seller.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auctions', component: AuctionsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bidding', component: BiddingComponent },
  { path: 'bidding/:id', component: BiddingComponent },
  { path: 'login-signup', component: MainLoginComponent},
  { path: 'sell-item', component: SellItemComponent},
  { path: 'test', component: TestToastsComponent},
  
  
  //  ADMIN PANEL ROUTES
  {
    path: 'admin-dashboard',
    component: DashboardComponent,
    canActivate: [],
  },
  { path: 'admin', component: AdminLoginComponent},
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'add-auction', component: AddAuctionComponent },
  { path: 'delete-auction', component: DeleteAuctionComponent },
  { path: 'users', component: AddUsersComponent },
  { path: 'view-users', component: ViewUsersComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'requests', component: AuctionRequestsComponent},
  { path: 'all-auctions', component: AuctionsListComponent},
  { path: 'completed-auctions', component: CompletedAuctions},

  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'users', component: UsersComponent },
  // { path: 'auctions', component: AuctionsComponent },
  // { path: 'add-item', component: AddItemComponent },
  // { path: 'settings', component: SettingsComponent },
  // { path: 'reports', component: ReportsComponent },
  // // { path: 'about', component: AboutComponent },
  // // { path: 'contact', component: ContactComponent },
  // // { path: 'bids', component: BidsComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'bids', component: BidsComponent },
  // { path: 'get-started', component: GetStartedComponent },
  // { path: 'bid-now', component: BidNowComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'sell', component: BecomeSellerComponent },
  // { path: 'services', component: ServicesComponent },
  // { path: 'help', component: HelpPageComponent },
  // { path: 'contact', component: ContactComponent },
  // { path: 'privacy', component: PrivacyComponent },
  // { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
