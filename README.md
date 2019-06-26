# Ionic-3-geolocation-background-foreground

Background & Foreground Geolocation tracking Application using Ionic 3 and cordova-plugin-background-geolocation and cordova-plugin-background-mode

## Run in Android

```
ionic cordova run android
```

## Built With

* [Ionic](https://ionicframework.com/docs/v3/) - The framework used
* [Background-Geolocation](https://github.com/mauron85/cordova-plugin-background-geolocation/) - cordova-plugin-background-geolocation
* [Background-Mode](https://github.com/tushe/cordova-plugin-background-mode/) - cordova-plugin-background-mode

## Informations

You need to add these config in config.xml :

```
<config-file mode="merge" parent="/*" target="AndroidManifest.xml">
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS" />
</config-file>
```

And use background-mode forked plugin :
```
<plugin name="cordova-plugin-background-mode" spec="https://github.com/tushe/cordova-plugin-background-mode.git" />
```
And this version of cordova-plugin-mauron85-background-geolocation => ^3.0.0-alpha.50
```
<plugin name="cordova-plugin-mauron85-background-geolocation" spec="^3.0.0-alpha.50" />
```

## Authors

* **KERMAREC Julien** - *Initial work* - [julienkermarec](https://github.com/julienkermarec/)


