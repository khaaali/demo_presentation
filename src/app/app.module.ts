import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'; 

import { AppComponent } from './app.component';
import { MySqlService }   from './app.service';
import { TemperatureComponent } from './graphComponents/temperature-component/temperature.component';
import { InclinationComponent } from './graphComponents/inclination-component/inclination.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { ConfigComponent } from './config/config.component';
import { DataVisualizationComponent } from './data-visualization/data-visualization.component';
import { VoltageLevelsComponent } from './graphComponents/voltage-levels/voltage-levels.component';
import { SignalStrengthComponent } from './graphComponents/signal-strength/signal-strength.component';
import { PacketLossComponent } from './graphComponents/packet-loss/packet-loss.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'settings',component: SettingsComponent },
  { path: 'configs',component: ConfigComponent },
  { path: 'dataVisualization',component: DataVisualizationComponent },
  { path: 'mac/:id',component: DataVisualizationComponent },
  { path: '**',component: HomeComponent },
];




@NgModule({
  declarations: [
    AppComponent,
    TemperatureComponent,
    InclinationComponent,
    HomeComponent,
    SettingsComponent,
    ConfigComponent,
    DataVisualizationComponent,
    VoltageLevelsComponent,
    SignalStrengthComponent,
    PacketLossComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MySqlService],
  bootstrap: [AppComponent]
})
export class AppModule { }





