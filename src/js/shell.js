
var menu = document.getElementById('menu'),
    supportBut =document.getElementById('supportUs'),
    network = document.getElementById('network'),
    networkInner = document.getElementById('network-inner'),
    networkFooter = document.getElementById('network-footer'),
    popUp = document.getElementById('popUp'),
    collapseButtons = document.querySelectorAll('.collapse-but'),
    mapZoom = document.getElementById('net-zoom'),
    mapSec = document.getElementById('maps'),
    mapOverview = document.getElementById('mapOverview'),
    mobileNav = document.getElementById('mobile-nav'),
    siteMap = document.getElementById('siteMap'),
    closePopUp = document.getElementById('close-pop-up'),
    submitEmail = document.getElementById('submit-email');

var firstImg = network.querySelector('.one'),
    secImg = network.querySelector('.two'),
    integratedMapButton = network.querySelector('.actions').firstElementChild.nextElementSibling,
    networkMapButton = network.querySelector('.actions').firstElementChild;


export const MetroApp = {

    methods:{
        toggleMap:function(){
            secImg.classList.toggle('is-opaque')
            firstImg.classList.toggle('is-not-opaque')
            integratedMapButton.classList.toggle('full');
            networkMapButton.classList.toggle('full');
        },
        toggleSupportPopup:function (){
            popUp.classList.add('invis');
            popUp.classList.toggle('hidden');
            setTimeout(function(){
                popUp.classList.remove('invis');
                popUp.classList.add('open');
            }, 300)
        },
        toggleMenu:function(){
            menu.classList.toggle('is-active');
            mobileNav.classList.toggle('is-open');
        },
        toggleCollapseContainer:function(elem){
            var container = elem.parentElement.previousElementSibling;
            container.classList.add('invis');
            container.classList.toggle('hidden');
            setTimeout(function(){
                container.classList.remove('invis');
                container.classList.add('open');
            }, 300)
        },
        updateRangeZoom:function (){
            var value = mapZoom.value;
            var scaleVal;
            console.log('value of range', value);
            if(value == 5){scaleVal = 1}
            else {
                scaleVal = value / 10 * 2;
            }
            console.log('scale value', scaleVal)
            networkInner.firstElementChild.style.transform = "scale(" + scaleVal +")";
        },
        toggleMapOverView:function(){
            mapSec.firstElementChild.classList.toggle('full');
            mapOverview.classList.toggle('active');
            console.log(mapOverview.innerText);
            if(mapOverview.innerText == "Minimise"){
                mapOverview.innerText = "Enlarge";
            }else {
                mapOverview.innerText = "Minimise"
            }
        },
    },
    addEvents:function(){
        networkFooter.addEventListener('click', MetroApp.methods.toggleMap)
        networkInner.addEventListener('click', MetroApp.methods.toggleMap)
        menu.addEventListener('click', MetroApp.methods.toggleMenu)
        siteMap.addEventListener('click', MetroApp.methods.toggleMenu)
        mobileNav.addEventListener('click', MetroApp.methods.toggleMenu, false)

        supportBut.addEventListener('click', function(e){
            e.preventDefault()
            MetroApp.methods.toggleSupportPopup();
            this.classList.toggle('active')
        }, false)

        closePopUp.addEventListener('click', function(e){
            e.preventDefault()
            MetroApp.methods.toggleSupportPopup();
            supportBut.classList.toggle('active')
        }, false)

        for(var i = 0;i < collapseButtons.length;i++){
            var button = collapseButtons[i];
            button.addEventListener('click', function(e){
                e.preventDefault()
                MetroApp.methods.toggleCollapseContainer(this);
                this.classList.toggle('active')
                this.parentElement.classList.toggle('active-but')
                if(this.classList.contains('active')){
                    this.innerText ="Show Less";
                }else {
                    this.innerText = "Read More";
                }

            })
        }

        mapSec.addEventListener('click', MetroApp.methods.toggleMapOverView, false);
        mapOverview.addEventListener('click', function(e){
            e.preventDefault();
        })

        mapZoom.addEventListener('change', MetroApp.methods.updateRangeZoom)

        // submitEmail.addEventListener('click', function(e){
        //   e.preventDefault();
        //   var emailValue = document.getElementById('email-input').value;
        //   console.log('email', emailValue)
        //   if(emailValue.length > 3){
        //     var obj = {"email":emailValue}
        //     postEmails(obj);
        //   }
        // })

    },
    init:function(){
        console.log('init metro')
        MetroApp.addEvents();
    },
}


document.addEventListener('DOMContentLoaded', function() {

    // try {
    //     var app = firebase.app();
    //     var features = ['auth', 'database', 'messaging', 'storage'].filter(function (feature) {
    //         return typeof app[feature] === 'function';
    //     });
    //     //document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
    //     console.log('Firebase SDK loaded with ' + features.join(', '));
    // } catch (e) {
    //     console.error(e);
    //     //document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    // }
    // MetroApp.init();
    // ServiceWorker.init();
    // FirebaseSubscribe.initApp();
});
