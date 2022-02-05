var jsonUrl = './src/json/vaxsites.json';
var badgeWrapper = '#badge-wrapper';
var noResult = '#no-result';
var bodyHere = '.list';
var allData = [];
var jsonData = [];

$.ajax({
	url: jsonUrl,
	beforeSend: function() {
		$(badgeWrapper).hide();
		$(noResult).hide();
		$(bodyHere).text('読み込み中です');
	}
})
.then(
	function(data) {
		$(badgeWrapper).show();
		allData = data;
		jsonData = allData.vaxsite;
		display();
		loadListjs();
	},
	function() {
		$(bodyHere).text('読み込みに失敗しました');
	}
);

// JSONの内容を表示
function display() {
	$(bodyHere).empty();
	var html = '';
	for (var i = 0; i < jsonData.length; i++) {
		var vaxSiteThird = jsonData[i].third;
		var vaxSiteBookingString = jsonData[i].booking;
		var vaxSitePharma = jsonData[i].pharma;
		
		var vaxSiteStatus = jsonData[i].status;
		var vaxSiteWeb = jsonData[i].web;
		var vaxSiteName = jsonData[i].name;
		var vaxSiteAddress = jsonData[i].address;
		var vaxSiteMap = jsonData[i].map;
		var vaxSiteAge = jsonData[i].age;
		if (window.innerWidth < 480) {
			var vaxSiteAgeMobile = vaxSiteAge.replace(/以上/g, '+');
		}	
		var vaxSiteGeneral = jsonData[i].general;
		var vaxSiteNote = jsonData[i].note;
		var vaxSiteBooking = vaxSiteBookingString.replace(/LINE/g, '<a href="https://list.botlogy.com/" target="_blank">LINE</a>').replace(/ライン/g, 'LINE');
		
		html +=
		'<div class="frame" data-accept="' + jsonData[i].accept +
		'" data-ward="' + jsonData[i].ward +
		'" data-pharma="' + vaxSitePharma + '">' +
			'<div class="basic">' +
				'<div class="status ';
				if (vaxSiteStatus.match(/^(受付|◇|○|△)$/)) {
					html += 'status-green">' + vaxSiteStatus + '</div>';
				} else if (vaxSiteStatus.match(/^(準備中|検討中|満員|休止)$/)) {
					html += 'status-orange">' + vaxSiteStatus + '</div>';
				} else if (vaxSiteStatus.match(/^(終了|未実施)$/)) {
					html += 'status-red">' + vaxSiteStatus + '</div>';
				} else {
					html += 'status-others">不明</div>';
				}
				if (vaxSiteWeb !== '') {
					html += '<h3><a href="' + vaxSiteWeb + '" target="_blank"><span class="name">' + vaxSiteName + '</span></a></h3>';
				} else {
					html += '<h3 class="name">' + vaxSiteName + '</h3>';
				}
				html +=
				'<div class="address-wrapper">' +
					'<span class="address">' + vaxSiteAddress + '</span> ';
					if (window.innerWidth < 480) {
						if (vaxSiteMap === '') {
							html += '<a href="https://www.google.co.jp/maps?q=' + vaxSiteName + '+' + vaxSiteAddress + '" target="_blank">(地図)</a>';
						} else {
							html += '<a href="' + vaxSiteMap + '" target="_blank">(地図)</a>';
						}
					} else {
						if (vaxSiteMap === '') {
							html += '<a href="https://www.google.co.jp/maps?q=' + vaxSiteName + '+' + vaxSiteAddress + '" target="_blank">(地図を見る)</a>';
						} else {
							html += '<a href="' + vaxSiteMap + '" target="_blank">(地図を見る)</a>';
						}
					}
				html +=
				'</div>' +
			'</div>' +
			'<div class="vaxsite-info">';
				if (vaxSitePharma === 'pfe') {
					html +='<div class="pharma"><span class="pharma-icon pfe"></span>ファイザー</div>';
				} else if (vaxSitePharma === 'pfemrna') {
					html +=
					'<div class="pharma pharma2">' +
						'<div><span class="pharma-icon pfe"></span>ファイザー</div>' +
						'<div><span class="pharma-icon mrna"></span>モデルナ</div>' +
					'</div>';
				} else if (vaxSitePharma === 'mrna') {
					html += '<div class="pharma"><span class="pharma-icon mrna"></span>モデルナ</div>';
				} else if (vaxSitePharma === 'az') {
					html +='<div class="pharma"><span class="pharma-icon az"></span>AZ</div>';
				}
				html +=
				'<div class="third-wrapper">3回目:<span class="third">' + vaxSiteThird + '</span></div>' +
				'<div class="age">';
				if (window.innerWidth < 480) {
					if (vaxSiteAge === 'NA') {
						html += '不明';
					} else {
						html += vaxSiteAgeMobile;
					}
				} else {
					if (vaxSiteAge === 'NA') {
						html += '年齢不明';
					} else {
						html += vaxSiteAge;
					}
				}
				html +=
				'</div>';
				if (vaxSiteGeneral === '一般不可') {
					html += '<div class="color-red">' + vaxSiteGeneral + '</div>';
				} else {
					html += '<div>' + vaxSiteGeneral + '</div>';
				}
			html +=
			'</div>';
			if (vaxSiteNote !== '') {
				html += '<p class="p">備考: ' + vaxSiteNote + '</p>';
			}
			if (vaxSiteBooking !== '') {
				html += '<p class="p">予約方法: <span class="booking">' + vaxSiteBooking + '</span></p>';
			}
			if (jsonData[i].vnavi !== null) {
				html += '<p class="p">→ <a href="https://v-sys.mhlw.go.jp/search/list.html?id=261009&keyword=' + vaxSiteName + '&vaccineMaker=&page=1" target="_blank">コロナワクチンナビで検索</a></p>';
			}
		html +=
		'</div>';
	}
	$(bodyHere).html(html);
}

// List.js Plugin
function loadListjs() {
	var options = {
		valueNames: [{ data: ["accept"] }, "third", "booking", { data: ["ward"] }, { data: ["pharma"] }, "name", "address"],
		searchDelay: 350,
		searchColumns: ["name", "address"],
		page: 50,
		pagination: {
			innerWindow: 3,
			outerWindow: 1
		}
	};
	
	var listObj = new List("main", options);
	
	// Copyright (c) 2016 by Whitney Gainer (https://codepen.io/wmg481/pen/RRRKdm)
	// Released under the MIT license
	// https://opensource.org/licenses/mit-license.php
	
	// 絞り込む
	$('#form-wrapper input, #form-wrapper select').change(function() {
		var acceptValue = $('input[name=accept]:checked').val();
		var thirdValue = $('input[name=third]:checked').val();
		var bookingValue = $('input[name=booking]:checked').val();
		var wardValue = $('input[name=ward]:checked')
			.map(function() {
				return $(this).val();
			})
			.get();
		var pharmaValue = $('#filter-type').val();

		listObj.filter(function(item) {
			var boolean_accept = false;
			var boolean_third = false;
			var boolean_booking = false;
			var boolean_ward = false;
			var boolean_pharma = false;

			if (acceptValue == null) {
				boolean_accept = true;
			} else {
				boolean_accept = item.values().accept.includes(acceptValue);
			}
			if (thirdValue == null) {
				boolean_third = true;
			} else {
				boolean_third = item.values().third.includes(thirdValue);
			}
			if (bookingValue == null) {
				boolean_booking = true;
			} else {
				boolean_booking = item.values().booking.includes(bookingValue);
			}
			if (wardValue.length == 0) {
				boolean_ward = true;
			} else {
				boolean_ward = wardValue.find(function (element) {
					return element === item.values().ward;
				});
			}
			if (pharmaValue === 'all') {
				boolean_pharma = true;
			} else if (pharmaValue) {
				boolean_pharma = item.values().pharma.includes(pharmaValue);
			}
			return boolean_accept && boolean_third && boolean_booking && boolean_ward && boolean_pharma;
		});
	});
	
	// 件数が1件以上の場合、件数を表示して「結果がありません」を隠す
	listObj.on('updated', function (list) {
		if (list.matchingItems.length > 0) {
			$(badgeWrapper).show();
			$(noResult).hide();
		} else {
			$(badgeWrapper).hide();
			$(noResult).show();
		}
	});
	
	// Copyright (c) 2018 by Matthew Elsom (https://codepen.io/matthewelsom/pen/RYrqmb)
	// Released under the MIT license
	// https://opensource.org/licenses/mit-license.php
	
	// 件数を表示する
	var itemNumber = ('#item-number');
	$(itemNumber).text(listObj.size());
	listObj.on('updated', function(){
		$(itemNumber).text(listObj.matchingItems.length);
	});
}

// Copyright (c) 2019 by AgoPeanuts (https://codepen.io/AgoPeanuts/pen/zbpRzJ)
// Released under the MIT license
// https://opensource.org/licenses/mit-license.php

// チェックボックスを全て選択または解除する
$(function() {
	var selectAll = $('#select-all');
	var wardInput = $('#filter-ward input');
	$(selectAll).on('click', function() {
		$(wardInput).prop('checked', this.checked);
	});
	$(wardInput).on('click', function() {
		if ($('#filter-ward :checked').length == $(wardInput).length) {
			$(selectAll).prop('checked', true);
		} else {
			$(selectAll).prop('checked', false);
		}
	});
});
