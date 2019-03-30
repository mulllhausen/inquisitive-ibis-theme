var latestCache = '2019-03-30_11:03:58';
var mandatoryAssets = [
    // common assets for all pages
    'https://analysis.null.place/theme/css/thematrix.css?hash=4uNcYG',
    'https://analysis.null.place/theme/img/icons.svg?hash=DlWPXe',
    'https://analysis.null.place/theme/img/shattered-glass-2b.png?hash=xZglIf',
    'https://analysis.null.place/theme/img/shattered-glass-black.png?hash=DsMJmV',
    'https://analysis.null.place/theme/img/shattered-glass-matrix-192x192.png?hash=HbWgBI',
    'https://analysis.null.place/theme/img/shattered-glass-matrix-512x512.png?hash=9R0TcV',
    'https://analysis.null.place/theme/img/favicon.ico?hash=jRJksA',
    'https://analysis.null.place/theme/img/apple-touch-icon.png?hash=FAvW32',
    'https://analysis.null.place/theme/img/apple-touch-icon-72x72.png?hash=vTsYhJ',
    'https://analysis.null.place/theme/img/apple-touch-icon-114x114.png?hash=AxyPrA',
    'https://analysis.null.place/theme/js/base.js?hash=BGC2-m',
    'https://analysis.null.place/theme/js/console-greeter.js?hash=j6dUQ7',
    'https://analysis.null.place/theme/js/manifest.json',

    // common assets for all article pages
    'https://analysis.null.place/theme/js/comments-section.js?hash=eby9QW',

    // home page
    'https://analysis.null.place/',
    'https://analysis.null.place/index.html',

    // archives page
    'https://analysis.null.place/archives/',
    'https://analysis.null.place/archives/index.html',

    // tags pages
    'https://analysis.null.place/tags/',
    'https://analysis.null.place/tags/index.html',
    'https://analysis.null.place/tag/mining/',
    'https://analysis.null.place/tag/mining/index.html',
    'https://analysis.null.place/tag/movie/',
    'https://analysis.null.place/tag/movie/index.html',
    'https://analysis.null.place/tag/bitcoin/',
    'https://analysis.null.place/tag/bitcoin/index.html',
    'https://analysis.null.place/tag/reviews/',
    'https://analysis.null.place/tag/reviews/index.html',
    'https://analysis.null.place/tag/book/',
    'https://analysis.null.place/tag/book/index.html',
    'https://analysis.null.place/tag/tv-series/',
    'https://analysis.null.place/tag/tv-series/index.html',
    'https://analysis.null.place/tag/proof-of-work/',
    'https://analysis.null.place/tag/proof-of-work/index.html',

    // categories
    'https://analysis.null.place/cryptocurrencies/',
    'https://analysis.null.place/cryptocurrencies/index.html',
    'https://analysis.null.place/reviews/',
    'https://analysis.null.place/reviews/index.html',

    // assets for the "book reviews" article
    'https://analysis.null.place/book-reviews/',
    'https://analysis.null.place/book-reviews/index.html',
    'https://analysis.null.place/js/media-reviews.js?hash=4MkNZb',
    'https://analysis.null.place/css/media-reviews.css?hash=2579An',
    'https://analysis.null.place/img/book-thumbnail-theodoreschickandlewisvaughnhowtothinkaboutweirdthings2011.jpg?hash=PWQvuI',
    'https://analysis.null.place/img/book-thumbnail-robertharrisimperium2006.jpg?hash=XfX1Yk',
    'https://analysis.null.place/json/books-init-list.json?hash=lMQ_z0',
    'https://analysis.null.place/json/books-list.json?hash=lMQ_z0',
    'https://analysis.null.place/json/books-search-index.json?hash=PVSQVS',
    'https://analysis.null.place/json/book-review-theodoreschickandlewisvaughnhowtothinkaboutweirdthings2011.json?hash=poY45m',
    'https://analysis.null.place/json/book-review-robertharrisimperium2006.json?hash=tPAeC6',

    // assets for the "tv-series reviews" article
    'https://analysis.null.place/tv-series-reviews/',
    'https://analysis.null.place/tv-series-reviews/index.html',
    'https://analysis.null.place/img/tv-series-thumbnail-thewalkingdead12010.jpg?hash=OfCIwI',
    'https://analysis.null.place/img/tv-series-thumbnail-blackmirror12011.jpg?hash=PVbx5g',
    'https://analysis.null.place/json/tv-series-init-list.json?hash=1KO0FD',
    'https://analysis.null.place/json/tv-series-list.json?hash=SOtz4N',
    'https://analysis.null.place/json/tv-series-search-index.json?hash=PG2YWM',
    'https://analysis.null.place/json/tv-series-review-thewalkingdead12010.json?hash=poY45m',
    'https://analysis.null.place/json/tv-series-review-blackmirror12011.json?hash=poY45m',

    // assets for the "movie reviews" article
    'https://analysis.null.place/movie-reviews/',
    'https://analysis.null.place/movie-reviews/index.html',
    'https://analysis.null.place/img/movie-thumbnail-district92009.jpg?hash=6rrbUd',
    'https://analysis.null.place/img/movie-thumbnail-minorityreport2002.jpg?hash=qjW0Q9',
    'https://analysis.null.place/img/movie-thumbnail-darkcity1998.jpg?hash=ZAyjUz',
    'https://analysis.null.place/img/movie-thumbnail-thematrix1999.jpg?hash=UD52bp',
    'https://analysis.null.place/img/movie-thumbnail-fightclub1999.jpg?hash=oU8QOQ',
    'https://analysis.null.place/img/movie-thumbnail-eternalsunshineofthespotlessmind2004.jpg?hash=1D7kd4',
    'https://analysis.null.place/img/movie-thumbnail-rebelwithoutacause1955.jpg?hash=30TR7f',
    'https://analysis.null.place/img/movie-thumbnail-themartian2015.jpg?hash=Kx47Ss',
    'https://analysis.null.place/img/movie-thumbnail-thedressmaker2015.jpg?hash=BfJiFN',
    'https://analysis.null.place/img/movie-thumbnail-requiemforadream2000.jpg?hash=N5Bii3',
    'https://analysis.null.place/img/movie-thumbnail-themask1994.jpg?hash=jjAPLA',
    'https://analysis.null.place/img/movie-thumbnail-thebeach2000.jpg?hash=EIlGbw',
    'https://analysis.null.place/img/movie-thumbnail-thematinghabitsoftheearthboundhuman1999.jpg?hash=5KTmpx',
    'https://analysis.null.place/img/movie-thumbnail-themazerunner2014.jpg?hash=5s-xWb',
    'https://analysis.null.place/img/movie-thumbnail-thebutterflyeffect2004.jpg?hash=OI7RBB',
    'https://analysis.null.place/img/movie-thumbnail-transcendence2014.jpg?hash=lL1dto',
    'https://analysis.null.place/img/movie-thumbnail-aclockworkorange1971.jpg?hash=yD4AzA',
    'https://analysis.null.place/img/movie-thumbnail-montypythonandtheholygrail1975.jpg?hash=vsRsxF',
    'https://analysis.null.place/img/movie-thumbnail-bladerunner1982.jpg?hash=Mczjkd',
    'https://analysis.null.place/img/movie-thumbnail-freddygotfingered2001.jpg?hash=Sr6ciu',
    'https://analysis.null.place/img/movie-thumbnail-lockstockandtwosmokingbarrels1998.jpg?hash=dzDBus',
    'https://analysis.null.place/img/movie-thumbnail-inglouriousbasterds2009.jpg?hash=pJZgxG',
    'https://analysis.null.place/img/movie-thumbnail-upgrade2018.jpg?hash=3bhoSx',
    'https://analysis.null.place/json/movies-init-list.json?hash=d57TCW',
    'https://analysis.null.place/json/movies-list.json?hash=jBIj7G',
    'https://analysis.null.place/json/movies-search-index.json?hash=PnxZ1w',
    'https://analysis.null.place/json/movie-review-district92009.json?hash=nHVYBt',
    'https://analysis.null.place/json/movie-review-minorityreport2002.json?hash=S3GRds',
    'https://analysis.null.place/json/movie-review-darkcity1998.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-thematrix1999.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-fightclub1999.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-eternalsunshineofthespotlessmind2004.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-rebelwithoutacause1955.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-themartian2015.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-thedressmaker2015.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-requiemforadream2000.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-themask1994.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-thebeach2000.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-thematinghabitsoftheearthboundhuman1999.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-themazerunner2014.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-thebutterflyeffect2004.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-transcendence2014.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-aclockworkorange1971.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-montypythonandtheholygrail1975.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-bladerunner1982.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-freddygotfingered2001.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-lockstockandtwosmokingbarrels1998.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-inglouriousbasterds2009.json?hash=poY45m',
    'https://analysis.null.place/json/movie-review-upgrade2018.json?hash=atWiE-',

    // assets for the "how do the bitcoin mining algorithms work?" article
    'https://analysis.null.place/how-do-the-bitcoin-mining-algorithms-work/',
    'https://analysis.null.place/how-do-the-bitcoin-mining-algorithms-work/index.html',
    'https://analysis.null.place/js/sjcl.min.js?hash=0JqGiP',
    'https://analysis.null.place/js/btc-mining.js?hash=D15PC7',
    'https://analysis.null.place/css/btc.css?hash=93IOhm',
    'https://analysis.null.place/img/hashing-flowchart.svg?hash=NX7qzY',
    'https://analysis.null.place/img/bitcoin-blockchain.svg?hash=70Cxdl',
    'https://analysis.null.place/json/btc_txs_per_block_0-999.json?hash=i24DRR',
    'https://analysis.null.place/json/hex-trial-attempts.json?hash=sjiIF4',
    'https://analysis.null.place/json/unittest-bits.json?hash=m8SQwF',

    // cookie warning notice
    'https://analysis.null.place/cookie-notice/',
    'https://analysis.null.place/cookie-notice/index.html'
];
self.addEventListener('install', function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(latestCache).then(function (cache) {
            return cache.addAll(mandatoryAssets);
        })
    );
});

self.addEventListener('activate', function (event) {
    // delete all caches except latestCache (saves disk space)
    caches.keys().then(function (names) {
        for (let name of names) {
            if (name == latestCache) continue;
            caches.delete(name);
        }
    });
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (swResponse) {
            return (swResponse || fetch(event.request));
        })
    );
});