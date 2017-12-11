import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http'
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//Pages
import { ConfirmationPage } from '../pages/confirmation/confirmation';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { OrdersPage } from '../pages/orders/orders';
import { PaymentPage } from '../pages/payment/payment';
import { ProductModalPage } from '../pages/product-modal/product-modal';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';


//Services
import { MenuService } from '../services/menu.service';
import { OrdersService } from '../services/orders.service';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    ConfirmationPage,
    HomePage,
    MenuPage,
    MyApp,
    OrdersPage,
    PaymentPage,
    ProductModalPage,
    SettingsPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConfirmationPage,
    HomePage,
    MenuPage,
    MyApp,
    OrdersPage,
    PaymentPage,
    ProductModalPage,
    SettingsPage,
    TabsPage,
  ],
  providers: [
    MenuService,
    OrdersService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
