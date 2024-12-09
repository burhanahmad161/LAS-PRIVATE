import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './client/header/header.component';
import { HomeComponent } from './client/home/home.component';
import { FooterComponent } from './client/footer/footer.component';
import { AuctionsComponent } from './client/auctions/auctions.component';
import { AboutComponent } from './client/about/about.component';
import { ContactComponent } from './client/contact/contact.component';
import { FaqComponent } from './client/faq/faq.component';
import { FeedbackComponent } from './client/feedback/feedback.component';
import { LoginComponent } from './client/login/login.component';
import { BiddingComponent } from './client/bidding/bidding.component';
import { AddUsersComponent } from './admin/add-users/add-users.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewUsersComponent } from './admin/view-users/view-users.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { CompletedAuctions } from './admin/completed-auctions/completed-auctions.component';
import { MainLoginComponent } from './client/main-login/main-login.component';
import { AddAuctionComponent } from './admin/add-auction/add-auction.component';
import { DeleteAuctionComponent } from './admin/delete-auction/delete-auction.component';
import { SellItemComponent } from './client/sell-item/sell-item.component';
import { AuctionRequestsComponent } from './admin/auction-requests/auction-requests.component';
import { AuctionsListComponent } from './admin/auctions-list/auctions-list.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule
import { TestToastsComponent } from './client/test-toasts/test-toasts.component';  // Required for toastr

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AuctionsComponent,
    AboutComponent,
    ContactComponent,
    FaqComponent,
    FeedbackComponent,
    LoginComponent,
    BiddingComponent,
    AddUsersComponent,
    ViewUsersComponent,
    DashboardComponent,
    SidebarComponent,
    AdminLoginComponent,
    MainLoginComponent,
    AddAuctionComponent,
    CompletedAuctions,
    DeleteAuctionComponent,
    SellItemComponent,
    AuctionRequestsComponent,
    AuctionsListComponent,
    TestToastsComponent
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  // Import BrowserAnimationsModule for animations
    ToastrModule.forRoot()  // Required for toastr
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
