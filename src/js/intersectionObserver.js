let tabs = document.querySelectorAll('.tab'),
    workSection = document.getElementById('ourWork'),
    nav = document.querySelector('nav'),
    navWatch = document.getElementById('navWatch'),
    bottomBorders = document.querySelectorAll('.bottom-border'),
    articleMainImg = document.querySelectorAll('article .main');

export const InterObserver = {
    init: function () {
        InterObserver.createObserver();
    },
    createObserver: function () {
        var observer;

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: this.buildThresholdList()
        };

        observer = new IntersectionObserver(InterObserver.handleIntersect, options);
        for (var i = 0; i < bottomBorders.length; i++) {
            var border = bottomBorders[i];
            observer.observe(border);
        }
        for (var i = 0; i < articleMainImg.length; i++) {
            var mainImg = articleMainImg[i];
            observer.observe(mainImg);
        }
        observer.observe(workSection);
        observer.observe(navWatch)

    },
    buildThresholdList: function () {
        var thresholds = [];
        var numSteps = 20;

        for (var i = 1.0; i <= numSteps; i++) {
            var ratio = i / numSteps;
            thresholds.push(ratio);
        }

        thresholds.push(0);
        return thresholds;
    },
    handleIntersect: function (entries, observer) {
        entries.forEach(function (entry) {
            // console.log(entry.intersectionRatio, "ratio")
            //console.log(entry.isIntersecting, "inter", entry.target)

            if (entry.intersectionRatio < .6 && entry.target.classList.contains('main')) {

                entry.target.classList.add('init')


            } else if (entry.intersectionRatio > .6 && entry.target.classList.contains('main')) {
                entry.target.classList.remove('init')
            }

            if (entry.intersectionRatio < .6 && entry.target.id == "navWatch") {

                nav.classList.add('fixed-nav')


            } else if (entry.intersectionRatio > .6 && entry.target.id == "navWatch") {
                nav.classList.remove('fixed-nav')
            }

            if (entry.intersectionRatio < .2 && entry.target.classList.contains('bottom-border')) {

                entry.target.classList.remove('anim-border')


            } else if (entry.intersectionRatio > .9 && entry.target.classList.contains('bottom-border')) {
                entry.target.classList.add('anim-border')
            }


            if (entry.intersectionRatio > .3 && entry.target.id == "ourWork") {
                console.log(entry.isIntersecting, "inter", entry.target)
                // entry.target.classList.add('returnPos')
                for (var i = 0; i < tabs.length; i++) {
                    var tab = tabs[i]
                    tab.classList.add('returnPos')
                }

                //entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
            } else if (entry.intersectionRatio < .3 && entry.target.id == "ourWork") {
                console.log(entry.isIntersecting, "inter", entry.target)
                // entry.target.classList.remove('returnPos')
                for (var i = 0; i < tabs.length; i++) {
                    var tab = tabs[i]
                    tab.classList.remove('returnPos')
                }
            }

            // prevRatio = entry.intersectionRatio;
        });
    }

}

