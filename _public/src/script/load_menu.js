// Header内のリンクを表示
$(function() {
	var menuHere = '#menu-wrapper';
	var headerHtml =
	'<label for="menu-button-input" id="hamburger-menu">' +
		'<input type="checkbox" id="menu-button-input">' +
		'<div class="icon-hamburger" id="menu-icon"></div>' +
	'</label>' +
	'<nav id="menu-links">' +
		'<div class="menu-link"><a href="https://kyoto-vaccine-site.com/covid_testing.html">京都府コロナ無料検査会場一覧</a></div>' +
		'<div class="menu-link"><a href="https://kyoto-vaccine-site.com/contents/read_me.html">必ずお読みください</a></div>' +
		'<div class="menu-link"><a href="https://kyoto-vaccine-site.com/contents/technical_info.html">使い方・技術情報</a></div>' +
		'<div class="menu-link"><a href="https://form.run/@raivcfrrwg" target="_blank">お問い合わせ</a></div>' +
		'<div class="menu-link"><a href="https://github.com/FoddvosvvD/KyotoVaccineSite" target="_blank">GitHub</a></div>' +
		'<div id="menu-twitter">' +
			'<a href="https://www.twitter.com/PollPalace1" target="_blank"><span class="icon-twitter"></span></a>' +
		'</div>' +
	'</nav>';
	$(menuHere).html(headerHtml);
});

// Footerを表示
$(function() {
	var footerHere = '#footer';
	var footerHtml =
	'&#xA9; 京都市コロナワクチン情報他' +
	'<nav id="footer-links">' +
		'<div class="footer-link"><a href="https://kyoto-vaccine-site.com/contents/links.html">リンク集</a></div>' +
		'<div class="footer-link"><a href="https://kyoto-vaccine-site.com/contents/about.html">このサイトについて</a></div>' +
		'<div class="footer-link"><a href="https://kyoto-vaccine-site.com/contents/privacy_policy.html">プライバシーポリシー</a></div>' +
		'<div class="footer-link"><a href="https://form.run/@raivcfrrwg" target="_blank">お問い合わせ</a></div>' +
	'</nav>';
	$(footerHere).html(footerHtml);
});

// ハンバーガーメニューを操作
var hamburgerMenu = '#menu-button-input';
$(document).on('click', hamburgerMenu, function () {
	var menuIcon = '#menu-icon';
	var iconHamburger = 'icon-hamburger';
	var iconClose = 'icon-close';
	var menu = '#menu-links';
	if ($(menuIcon).hasClass(iconHamburger)) {
		$(menuIcon).removeClass(iconHamburger).addClass(iconClose);
		$(menu).show();
	} else {
		$(menuIcon).removeClass(iconClose).addClass(iconHamburger);
		$(menu).hide();
	}
});
