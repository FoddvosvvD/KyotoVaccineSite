var jsonUrl = './src/json/covid_testing.json';
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
		jsonData = allData;
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
		var testingType = jsonData[i].type;
		var testingName = jsonData[i].name;
		var testingAddress = jsonData[i].address;
		var testingNoteString = jsonData[i].note;
		var testingNote = testingNoteString.replace(/https\:\/\/www\.welcia\-yakkyoku\.co\.jp\//g, '<a href="https://www.welcia-yakkyoku.co.jp/" target="_blank">https://www.welcia-yakkyoku.co.jp/</a>');
		
		html +=
		'<div class="frame testing" data-ward="' + jsonData[i].ward + '">' +
			'<h3 class="name">' + testingName + '</h3>' +
			'<div class="address-wrapper">' +
				'<span class="address">' + testingAddress + '</span>' +
				' <a href="https://www.google.co.jp/maps?q=' + testingName + '+' + testingAddress + '" target="_blank">(地図を見る)</a>' +
			'</div>' +
			'<div class="testing-info">' +
				'<p class="item"><span class="title">検査の種類:　</span><span class="type">' + testingType + '</span></p>' +
				'<p class="item"><span class="title">スマートフォン:　</span>' + jsonData[i].smartphone + '</p>' +
				'<p class="item"><span class="title">実施している日:　</span>' + jsonData[i].days + '</p>' +
				'<p class="item"><span class="title">実施時間:　</span>' + jsonData[i].hours + '</p>' +
			'</div>';
			if (testingNote !== '') {
				html +=
				'<p class="p"><span class="title">備考:　</span>' + testingNote + '</p>';
			}
		html +=
		'</div>';
	}
	$(bodyHere).html(html);
}

// List.js Plugin
function loadListjs() {
	var options = {
		valueNames: [{ data: ["ward"] }, "type", "name", "address"],
		searchDelay: 350,
		searchColumns: ["name", "address"],
		page: 25,
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
		var wardValue = $('input[name=ward]:checked')
			.map(function() {
				return $(this).val();
			})
			.get();
		var typeValue = $('#filter-type').val();

		listObj.filter(function(item) {
			var boolean_ward = false;
			var boolean_type = false;

			if (wardValue.length == 0) {
				boolean_ward = true;
			} else {
				boolean_ward = wardValue.find(function (element) {
					return element === item.values().ward;
				});
			}
			if (typeValue === 'all') {
				boolean_type = true;
			} else if (typeValue) {
				boolean_type = item.values().type.includes(typeValue);
			}
			return boolean_ward && boolean_type;
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
