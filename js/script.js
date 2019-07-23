const shuffle = (array) => {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


$(document).ready(function() {

    $('.name-text').hide().show().addClass('fadeInUp');
    setTimeout(() => {
        $('.recent-updates').hide().show().addClass('fadeInUp');
    }, 1000);
    setTimeout(() => {
        $('.nav-block').hide().show().addClass('fadeInUp');
    }, 3000)
    let i = 0;
    const time_on_screen = 6000;
    const time_in_between = 1000;
    const shuffled_updates = shuffle(recent_updates);
    setTimeout(() => {
        $('#recent-update-content').text(shuffled_updates[i]['update']);
        $('#recent-update-date').text(shuffled_updates[i]['date']);
        $('#recent-update-text').hide().show().addClass('fadeInRight');
        i += 1;
        i = i % 4;
        setTimeout(() => {
            $('#recent-update-text').removeClass('fadeInRight');
            $('#recent-update-text').addClass('fadeOutRight');
        }, time_on_screen);
    }, 2000);
    setTimeout(() => {
        setInterval(() => {
            $('#recent-update-content').text(shuffled_updates[i]['update']);
            $('#recent-update-date').text(shuffled_updates[i]['date']);
            $('#recent-update-text').hide().show().addClass('fadeInRight');
            i += 1;
            i = i % 4;
            setTimeout(() => {
                $('#recent-update-text').removeClass('fadeInRight');
                $('#recent-update-text').addClass('fadeOutRight');
            }, time_on_screen);
        }, time_on_screen + time_in_between);
    }, 1000);
});

let is_one_visible = false;
let the_visible_one;

$(window).scroll(() => {
    const lower = window.screen.width <= 600 ? 50 : 170;
    const higher = window.screen.width <= 600 ? 450 : 475;
    $('.community-descriptions').each((_, elem) => {
        const curr_vp_height = $(elem).offset().top - $(window).scrollTop();
        if (curr_vp_height >= lower && curr_vp_height <= higher) {
            if (!$(elem).hasClass('fadeIn')) {
                /* show for the first time */
                $(elem).removeClass('fadeOut')
                $(elem).hide().show().addClass('fadeIn');
            }
        } else {
            if ($(elem).hasClass('fadeIn')) {
                /* we need to fade it out */
                $(elem).addClass('fadeOut');
                $(elem).removeClass('fadeIn');
            }
        };
    });
    ['links-list', 'teaching-section', 'hacks-section', 'others-section'].forEach((sec_name) => {
        if ($(`#${sec_name}`).offset().top - $(window).scrollTop() <= 400) {
            $(`#${sec_name}`).addClass('fadeInUp');
        }
    });
});

$('a[href*="#"]').on('click', function(e) {
    e.preventDefault()
    const section_name = $(this).attr('href').substring(1);
    const section_top = $(`.${section_name}`).first().offset().top
    $('html, body').animate({
            scrollTop: section_top,
        },
        500,
        'swing'
    )
});

const recent_updates = [{
        'update': 'took a documentary filmmaking class at New York University’s Tisch School of Arts',
        'date': 'summer 2019'
    }, {
        'update': 'accepted a job to be a software engineer at Robinhood Markets starting September 2019',
        'date': 'november 2018'
    },
    {
        'update': 'began work on a music project🎶',
        'date': 'fall 2018'
    }, {
        'update': 'awarded the Corporate Partners Program Scholarship and the John D. Gannon Endowed Scholarship by UMD\'s CS department',
        'date': 'summer 2018'
    }
];