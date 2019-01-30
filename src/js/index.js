import { MetroApp } from './shell'
import { ServiceWorker } from './serviceWorker';
import { InterObserver } from './intersectionObserver'

MetroApp.init();
ServiceWorker.init();
InterObserver.init();

