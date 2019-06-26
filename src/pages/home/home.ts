import { Component, NgZone } from "@angular/core";
import { NavController } from "ionic-angular";

import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  BackgroundGeolocationEvents
} from "@ionic-native/background-geolocation";
import { BackgroundMode } from "@ionic-native/background-mode";


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  locations: any = [];
  geoloc_interval:any;
  interval_delay = 1000 * 60; // 1 minute

  config: BackgroundGeolocationConfig = {
    desiredAccuracy: 10,
    stationaryRadius: 20,
    distanceFilter: 30,
    notificationTitle: 'notificationTitle',
    notificationText: 'notificationText',
    debug: false, //  enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: true, // enable this to clear background location settings when the app terminates
    startForeground: true,
    fastestInterval: 500
  };

  constructor(
    public navCtrl: NavController,
    private backgroundMode: BackgroundMode,
    public zone: NgZone,
    private backgroundGeolocation: BackgroundGeolocation
  ) {

  }

  ionViewDidLoad() {
  }

  stopGeolocation(){
    console.log("stopGeolocation")
    this.backgroundMode.disable();
    this.backgroundGeolocation.stop();
    clearInterval(this.geoloc_interval);
    this.geoloc_interval = null;

  }
  startGeolocation() {
    this.backgroundMode.on('deactivate').subscribe(() => {
      console.log("backgroundMode deactivate");
    });

    this.backgroundMode.on('activate').subscribe(() => {
      this.backgroundMode.disableWebViewOptimizations();
      console.log('backgroundMode activated');
    });

    this.backgroundMode.setDefaults({ silent: true });
    this.backgroundMode.enable();
    this.configure();

    console.log('interval start at', new Date().toISOString());
    this.backgroundGeolocation.start();
    console.log('waiting first response ....');

    // Interval
    this.geoloc_interval = setInterval(() => {
      this.backgroundGeolocation.start();
    }, this.interval_delay);
  }

  configure() {
    this.backgroundGeolocation.configure(this.config)
      .then(() => {
        this.backgroundGeolocation.on(BackgroundGeolocationEvents.location)
          .subscribe((location: BackgroundGeolocationResponse) => {
            this.zone.run(() => {
              this.locations.push({ date: new Date().toISOString(), data: location });
              this.backgroundGeolocation.stop();
              console.log('locations', this.locations);
            });
          })
      })
  }
}
