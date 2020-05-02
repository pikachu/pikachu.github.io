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

$(window).on('load', function() {
    $('.name-text').hide().show().addClass('fadeInUp');
    setTimeout(() => {
        $('.recent-updates').hide().show().addClass('fadeInUp');
    }, 1000);
    setTimeout(() => {
        $('.nav-block').hide().show().addClass('fadeInUp');
    }, 3000)
    let i = 0;
    const time_on_screen = 6000;
    const time_in_between = 400;
    const shuffled_updates = shuffle(recent_updates);
    setTimeout(() => {
        $('#recent-update-content').text(shuffled_updates[i]['update']);
        $('#recent-update-date').text(shuffled_updates[i]['date']);
        $('#recent-update-text').hide().show().addClass('fadeInRight');
        i += 1;
        setInterval(() => {
            $('#recent-update-text').removeClass('fadeInRight');
            $('#recent-update-text').addClass('fadeOutRight');
            setTimeout(() => {
                $('#recent-update-content').text(shuffled_updates[i]['update']);
                $('#recent-update-date').text(shuffled_updates[i]['date']);
                $('#recent-update-text').hide().show().addClass('fadeInRight');
                i += 1;
                i = i % 4;
            }, time_in_between);
        }, time_on_screen + time_in_between);
    }, 0);
});

let is_one_visible = false;
let the_visible_one;
let current = 0;

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


    var $target = $('.projects');
    inView.offset(window.innerHeight * 0.6 / 2);
    inView('#hacks-section').on('enter', function(el) {
        if (current != 0) {
            $target.css('background-color', '#ffc386');
            $('.projects>div>div>div>div>a').css('color', '#8786ff');
            current = 0;
        }
    });
    inView('#others-section').on('enter', function(el) {
        if (current != 1) {
            $('.projects>div>div>div>div>a').css('color', '#86ffff');
            $target.css('background-color', '#ff86c3');
            current = 1;
        }
    });
    inView('#teaching-section').on('enter', function(el) {
        if (current != 2) {
            $('.projects>div>div>div>div>a').css('color', '#86ffff');
            $target.css('background-color', '#ff8686');
            current = 2
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
    },
    {
        'update': 'began work on the uk expansion team at robinhood markets',
        'date': 'september 2019'
    },
    {
        'update': 'experienced true sichuan cuisine for the first time',
        'date': 'november 2019',
    },
    {
        'update': 'absolutely shattered my iphone screen',
        'date': 'january 2020',
    },
];