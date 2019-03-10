// var $ = require('./jquery.min.js');
// ==UserScript==
// @name        IMDB Watchlist on Netflix
// @namespace   https://matheushf.github.io/portfolio
// @description See which of your IMDB Watchlist movies are available on Netflix
// @include     http://*.imdb.com/user/*/watchlist*
// @version     0.1
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

// Not always accurate :(

(function () {
    $('.lister-item-content').each(function () {
        //used for span id, as it cannot contain spaces
        const title_ref_re = /\/title\/(.*?)\//;

        const header = $('.lister-item-header', this);
        const title = $('a', header).text();
        const title_ref = title_ref_re.exec($('a', this).attr('href'))[1];
        const year = $(this).find('.lister-item-year')[0].textContent;

        console.log('header ', header)
        console.log('title ', title)
        console.log('title_ref ', title_ref)
        console.log('year ', year)

        const spanTitle = "netflix-checker-" + title_ref;

        const url = `https://unogs.com/nf.cgi?u=5unogs&q=${escape(title)}-!${year},${year}-!0,5-!0,10-!0,10-!Any-!Any-!Any-!Any-!I%20Don&t=ns&cl=21,23,26,29,33,307,45,39,327,331,334,337,336,269,267,357,65,67,392,400,402,408,412,348,270,73,34,425,46,78&st=adv&ob=Relevance&p=1&l=100&inc=&ao=and`;
        const headers = {
            
        }

        $(header).append('<span id=\'' + spanTitle + '\' style=\'font-size: 10px; color: White; font-weight: bold; padding:4px;\'></span>');

        $.ajax({ url, headers })
            .done(function (data) {
                console.log('done ', data);
                const nID = data['show_id'];

                $('#' + spanTitle).html('<a href="http://netflix.com/watch/' + nID + '" target="_new" style="color: #fff;text-decoration: underline;">On Netflix</a>');
                $('#' + spanTitle).css('background-color', 'green');
            }).fail(function (err) {
                console.log('error ', err);
                $('#' + spanTitle).text('Not on Netflix');
                $('#' + spanTitle).css('margin-left', '10px');
                $('#' + spanTitle).css('background-color', 'red');
            });
        console.log(title + "|" + year);
    });
})();
