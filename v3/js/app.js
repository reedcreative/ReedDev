// JavaScript Document
var soundVolume = 0.2;
var mutemode = false;
var lightMode = false;
var externalStorage = "http://jc.reeedcreative.info";

var $htmlbody = $('html, body'),
	$html = $('html'),
	$body = $('body');

var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
var isMobileCSS = false;
var UseCanLocalstorage = (typeof (Storage) !== "undefined") ? true : false;
var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || false;

window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
window.requestAnimFrame = (function (callback) {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();
var analyser;
var source = new Array,
	startedAt = new Array,
	pausedAt = new Array;

var starsTotal = (isMobile) ? 50 : 200,
	timer,
	iosheight = $(window).height(),
	req = []; //一组动画帧
var sectionAnimate = new Array;
var wave_speed = 0,
	wave_height = (isMobile) ? 10 : 10,
	wid = 0,
	globCount = 0.1,
	myAarray = new Array,
	myAarray2 = new Array,
	myAarray3 = new Array,
	fbc_array = new Array,
	wave_front_fbc = wave_ship_fbc = wave_back_fbc = hotballoon_fbc = hand_fbc = fish_fbc = fire_fbc = smoke_fbc = 0;

var deviceBeta = 90,
	xGamma = 0,
	xBeta = 0,
	deviceGamma = 90,
	gammaAble = false;


var scrollPos = 0; //获取滚动值
var currentSection = 0; //当前查看滚动值
var motionDuration = 0.2,
	maxinstaNum = 6;

var fadeInMotionTargetOffset = [];

var musicBuffer = new Array,
	context = new Array,
	totalAudio = 1,
	loadedAudio = 0,
	soundPlayed = new Array;

var canvas_wave, ctx_wave,
	canvas_wave_back, ctx_wave_back,
	canvas_flame, ctx_flame,
	canvas_flame2, ctx_flame2,
	canvas_cloud_front, ctx_cloud_front, ctx_cloud_back,
	canvas_cloud_front2, ctx_cloud_front2, ctx_cloud_back2,
	tCtx, tempCanvas,
	tCtx2, tempCanvas2,
	nodes = [],
	svgs = [];
var nextOffSet,
	scollToOffset;

var supportPageOffset = window.pageXOffset !== undefined,
	isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

var portfolioData = [];

/*------------------------ 参考元素 ------------------------*/

var $moon2Wrap = $('.moon-2Wrap'),
	$section1 = $('.section1 '),
	$section2 = $('.section2'),
	$forCloud = $('.forCloud'),
	$section4 = $('.section4'),
	$section5 = $('.section5'),
	$section6 = $('.section6'),
	$section7 = $('.section7');

var $section2fix = $('.section2 .forfixed');


var $app = $('#app'),
	$flyme = $('.flyme'),
	$mainnav = $('#mainnav'),
	$mainnavBtn = $mainnav.find('.btn.menuopen'),
	$mainnavBgm = $mainnav.find('.btn.bgmopen'),
	$mainnavBtnNav = $mainnav.find('.nav'),
	$flymen = $('#flyme_men'),
	$svgfrontleft = $('#svgfrontleft'),
	$instagramWrap = $('.instagramWrap'),
	$portfolioUl = $('#portfolioUl'),
	$fademotiontarget = $('.fademotiontarget'),
	$fastmode = $('#fastmode'),
	$doorIllust = $('#doorIllust'),
	$detailContent = $('#detailContent'),
	$detailpage_close_btn = $('#detailpage_close_btn'),
	$skillslevel = $('.skillslevel'),
	$greetings = $('#greetings');

var moveElement1 = (isMobile) ? ['depth-7', 'title', 'depth-9'] : ['depth-7', 'title', 'depth-9'],
	_section1 = document.querySelector('.section1'),
	_section2 = document.querySelector('.section2'),
	_section4 = document.querySelector('.section4'),
	_section5 = document.querySelector('.section5'),
	_section6 = document.querySelector('.section6'),
	_section7 = document.querySelector('.section7'),
	_forCloud = document.querySelector('.forCloud'),
	_intro = document.getElementById('intro'),
	_project = document.getElementById('project'),
	_about = document.getElementById('about'),
	_skills = document.getElementById('skills'),
	_contact = document.getElementById('contact'),
	_svg2 = document.querySelector('.svg2'),
	_flyme_svgWrap = document.querySelector('#flyme_svgWrap'),
	_hillhouse_next = document.getElementById('hillhouse_next'),
	_hillhouse = document.getElementById('hillhouse'),
	_monster = document.querySelector('.monster'),
	_flymen = document.getElementById('flyme_men'),
	_hillhouse_next_bg = document.getElementById('hillhouse_next_bg'),
	_bg_x5F_snow2 = document.getElementById('bg_x5F_snow2'),
	_bg_x5F_snow1 = document.getElementById('bg_x5F_snow1'),
	_sky = document.getElementById('sky'),
	_moon2Or = document.getElementById('moon-2Or'),
	_moon1 = document.querySelector('.moon-1'),
	_smoke = document.getElementById('smoke'),
	_men = document.querySelector('.men'),
	_fire = document.querySelector('.fire'),
	_moon7 = document.querySelector('.moon-7'),
	_instagramWrap = document.querySelector('.instagramWrap'),
	_contentWrap = document.querySelector('.contentWrap'),
	_moveNavBg = document.getElementById('moveNavBg'),
	_doorillustSvg = document.getElementById('doorIllust').querySelector('svg'),
	_detailpage_close_btn = document.getElementById('detailpage_close_btn');


var _svgfrontleft = document.getElementById('svgfrontleft'),
	_svgfrontright = document.getElementById('svgfrontright'),
	_moon7Wrap = document.getElementById('moon-7Wrap'),
	_moonHit = document.getElementsByClassName('moon-hit')[0];
var autoMoveNum = -1,
	autoplay = false;

/* ---------------------------------------------------------------------------------*/
/* 00. 项目运行
/* ---------------------------------------------------------------------------------*/
firstrun();


/*------------------------ 调整 ------------------------*/
var passLength;

function resizeFunction() {
	if ($app.width() < 960) {
		isMobileCSS = true;
	} else {
		isMobileCSS = false;
	}
	// console.log('resize')
	// contentWrapWd = $('.contentWrap').width();
	passLength = $('.contentWrap').width() - $section2.width() * 0.5;
	iosheight = $(window).height();
	$section1.height(iosheight);
	$section2.height(passLength + $('.middlebox.eq0').height() + iosheight + $section2.width() * 1);
	$section2fix.height(iosheight);
	$('.hillWrap .hillhouse').height(iosheight);
	$('.hillhouse_next').css('bottom', $('.hillWrap').height() - iosheight);
	$forCloud.css({
		'margin-top': -iosheight + 'px',
		'height': $forCloud.find('.textzh').height() + iosheight * 2
	});
	nextOffSet = [
		_section2.offsetTop,
		_forCloud.offsetTop,
		_section4.offsetTop,
		_section5.offsetTop,
		_section6.offsetTop,
		_section7.offsetTop
	];
	// console.dir(nextOffSet);
	scollToOffset = [
		_intro.offsetTop,
		_skills.offsetTop,
		_forCloud.offsetTop + _about.offsetTop,
		_project.offsetTop,
		_contact.offsetTop
	];
	canvas_wave.width = canvas_wave_back.width = isMobile ? $app.width() * 2 : $app.width();
	canvas_wave.height = canvas_wave_back.height = isMobile ? 800 : 400;
	canvas_wave.style.width = canvas_wave_back.style.width = $app.width() + 'px';
	canvas_wave.style.height = canvas_wave_back.style.height = '400px';

	canvas_flame.height = canvas_flame.width = $moon2Wrap.width() * 0.08;

	canvas_cloud_front.width = canvas_cloud_front2.width = isMobile ? $app.width() * 2 : $app.width();
	canvas_cloud_front.height = canvas_cloud_front2.height = isMobile ? 89 * 2 : 89;
	canvas_cloud_front.style.width = canvas_cloud_front2.style.width = '100%';
	canvas_cloud_front.style.height = canvas_cloud_front2.style.height = '89px';

	canvas_smoke.width = canvas_smoke.height = isMobile ? $('.smoke').width() * 2 : $('.smoke').width() * 1;
	canvas_smoke.style.width = canvas_smoke.style.height = $('.smoke').width() + 'px';

	loadedOnce = [false, false, false, false, false];
	FadeInMotionSet();
	$skillslevel.each(function (index) {
		var $this = $(this),
			$point = $this.find('.point'),
			getLevel = $this.data('level');
		if ($this.hasClass('on')) {
			/*$point.find('.numbers').css({
			    '-webkit-transform' : 'translate3d(0px, ' + (getLevel*-$point.height()) + 'px, 0px)',
				'-moz-transform' : 'translate3d(0px, ' + (getLevel*-$point.height()) + 'px, 0px)',
				'-o-transform' : 'translate3d(0px, ' + (getLevel*-$point.height()) + 'px, 0px)',
				'transform' : 'translate3d(0px, ' + (getLevel*-$point.height()) + 'px, 0px)'
			});*/
		}
	});
	//each - skill
}

var resizeTimer;
$(window).bind('resize', function () {
	window.clearTimeout(resizeTimer);
	resizeTimer = window.setTimeout(resizeFunction, 500);
});

/* ---------------------------------------------------------------------------------*/
/* App init
/* ---------------------------------------------------------------------------------*/
function init() {
	$(document).ready(function () {
		setCanvas();
		//setCanvas
		for (var i = 0; i < 2; i++) {
			var target = document.getElementsByClassName("stars")[i];
			svgs[i] = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
			svgs[i].appendChild(defs);
			svgs[i].setAttribute('width', '100%');
			svgs[i].setAttribute('height', '100%');
			svgs[i].setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
			target.appendChild(svgs[i]);
		}
		//for

		function makeNode(wiggle, classnumber) {
			var circ = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			var setX = Math.round(makeRandomAr(0, 100));
			var setY = Math.round(makeRandomAr(0, 100));
			var starSizem = 1;
			var starSizep = makeRandom(1, 2);
			circ.setAttribute("class", "star particle-" + classnumber);
			circ.setAttribute("x", setX + "%");
			circ.setAttribute("y", setY + "%");
			circ.setAttribute("width", (isMobile) ? starSizem + "px" : starSizep + "px");
			circ.setAttribute("height", (isMobile) ? starSizem + "px" : starSizep + "px");
			circ.setAttribute("style", "-webkit-transform-origin: " + setX + "% " + setY + "%; -moz-transform-origin: " + setX + "% " + setY + "%; -o-transform-origin: " + setX + "% " + setY + "%; transform-origin: " + setX + "% " + setY + "%;")
			circ.setAttribute('fill', 'url(#linear' + classnumber + ')');
			circ.setAttribute('pointer-events', 'inherit');
			var linearGradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");
			var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
			var stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
			var stop3 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
			linearGradient.setAttribute('id', 'linear' + classnumber);
			stop1.setAttribute('offset', '90%');
			stop1.setAttribute('stop-color', 'rgba(255,255,255,1)');
			stop3.setAttribute('offset', '100%');
			stop3.setAttribute('stop-color', 'rgba(255,255,255,0)');
			linearGradient.appendChild(stop1);
			linearGradient.appendChild(stop3);
			if (wiggle)return [circ, linearGradient];
		}
		//fn. makeNode

		for (var i = 0; i < starsTotal; i++) {
			var node = makeNode(true, i);
			svgs[i % 2].appendChild(node[0]);
			svgs[i % 2].getElementsByTagName('defs')[0].appendChild(node[1]);
		}
		//for

		makeMeteor();
		loadPatternImages();
		getInstagram();

		resizeFunction();
		setTranslate($app.width() * 0.5 - $flymen.width() * 0.5, 0, _flyme_svgWrap);
		
		$mainnavBtn.on('click', function (e) {
			var $this = $(this);
			if ($mainnav.hasClass('detailpageOpen')) {
				unactiveDetailView();
			} else if ($mainnav.hasClass('bgmopen')) {
				unactiveBGM();
			} else {
				if ($mainnav.hasClass('on')) {
					$mainnav.removeClass('on');
				} else {
					$mainnav.addClass('on');
				}
			}
			eventClick(e);
		});
		//单击菜单按钮

		_detailpage_close_btn.addEventListener("click", function (e) {
			var $this = $(this);
			if ($mainnav.hasClass('detailpageOpen')) {
				unactiveDetailView();
				setEmpty();
			}
		});

		$mainnavBgm.on('click', function (e) {
			var $this = $(this);
			if ($mainnav.hasClass('bgmopen')) {
				$mainnav.removeClass('bgmopen');
				// $app.removeClass('bgmopen');
			} else {
				$mainnav.addClass('bgmopen');
				// $app.addClass('bgmopen');
			}
			eventClick(e);
		});
		//单击背音乐按钮

		$('#mutebtn').on('click', function (e) {
			if (!mutemode) {
				soundVolume = 0;
				mutemode = true;
				$mainnav.addClass('mute');
			} else {
				soundVolume = 0.1;
				mutemode = false;
				$mainnav.removeClass('mute');
			}
			gainNode.gain.value = soundVolume;
			eventClick(e);
		})
		//静音

		$mainnavBtnNav.each(function (index) {
			var $this = $(this);
			$this.on('click', function (e) {
				$mainnav.removeClass('on');
				$html.scrollTop(scollToOffset[index]);
				$body.scrollTop(scollToOffset[index]);
				eventClick(e);
			});
		});
		//单击菜单中的每个按钮

		$mainnav.find('.auto').on('click', function (e) {
			if (!autoplay) {
				$(this).addClass('on');
				autoplay = true;
				autoMoveNum = scrollPos;
			} else {
				$(this).removeClass('on');
				autoplay = false;
			}
			eventClick(e);
		})
		//自动播放 - 目前尚未启用

		$fastmode.on('click', function (e) {
			lightMode = true;
			$htmlbody.removeClass('lock');
			$html.scrollTop(0);
			$body.scrollTop(0);
			$('#startlayer').fadeOut();
		});
		//轻量模式
	});

}

/* ---------------------------------------------------------------------------------*/
/* 滚动 
/* ---------------------------------------------------------------------------------*/
var beforeOpenScrollPos = 0;
function unactiveDetailView() {
	_detailpage_close_btn.style.transform = 'translate3d(0px, 0px, 0px)';
	_detailpage_close_btn.style['-o-transform'] = 'translate3d(0px, 0px, 0px)';
	_detailpage_close_btn.style['-webkit-transform'] = 'translate3d(0px, 0px, 0px)';
	_detailpage_close_btn.style['-moz-transform'] = 'translate3d(0px, 0px, 0px)';
	$('.contentWrap').find('li.active').removeClass('active');
	$detailContent.removeClass('detailpageOpen');
	$mainnav.removeClass('detailpageOpen');
	$section2.removeClass('detailpageOpen');
	$app.removeClass('detailpageOpen');
}
function unactiveBGM() {
	$mainnav.removeClass('bgmopen');
}

/* ---------------------------------------------------------------------------------*/
/* 基础功能
/* ---------------------------------------------------------------------------------*/

function firstrun() {
	context[98] = new AudioContext();
	if (context[98].state !== 'running' && !isMobile) {
		//PC端，第一次访问
		$('#startlayer').show();
	} else if (context[98].state !== 'running' && isMobile) {
		//移动端，第一次访问
		$('#startlayer').show();
	} else {
		$htmlbody.removeClass('lock');
	}

	init(); // initApp
	
	window.addEventListener("DOMContentLoaded", function () {scrollAction();}, false);
	var tempUrl = '/v3/audio/';
	loadSoundFile(tempUrl + 'fromm_64_none.mp3', 98, true, true);
	if (!isMobile) {
		loadSoundFile(tempUrl + 'effect_wave2_3.mp3', 0, false, true);
		loadSoundFile(tempUrl + 'effect_wind2.mp3', 1, false, true);
		loadSoundFile(tempUrl + 'effect_fire_1.mp3', 3, false, true)
	} else {
		$fastmode.css('display', 'block');
	}
	//if

	$.ajax({
		url: '/works/data/portfolio_data.json?v=' + (new Date).getTime(),
		dataType: "json",
		// async : false,
		success: function (data) {
			console.dir(data)
			portfolioData = data.data;
			setPortfolio();
		},
		error: function () {
			console.log('案例数据加载错误：-(')
		}
	});
	//ajax
}
//fn. firstrun 应用初始化

function eventClick(event) {
	if (event.preventDefault) {
		event.preventDefault(); //FF
	} else {
		event.returnValue = false; //IE
	}
}
//fn. eventClick

/* ---------------------------------------------------------------------------------*/
/* 制造流星
/* ---------------------------------------------------------------------------------*/
function makeRandom(min, max) {
	var RandVal = Math.floor(Math.random() * (max - min + 1)) + min;
	return RandVal;
}

function makeRandomAr(min, max) {
	return Math.random() * (max - min) + min;
}

function makeMeteor() {
	window.clearTimeout(timer);
	var nums = Math.floor(makeRandom(1, starsTotal - 1) * 0.5);
	$('.stars.fix').find('.star').removeClass('meteor prev next');
	$.each([nums - 1, nums, nums + 1], function (index, v) {
		var settime = setTimeout(function () {
			var addClass = 'meteor';
			if (index == 0) addClass += ' prev';
			else if (index == 2) addClass += ' next';
			// $stars_fix_star.eq(Number(v)).stop().addClass(addClass);
			$('.stars.fix').find('.star').eq(Number(v)).stop().addClass(addClass);
			// console.dir($stars_fix_star.eq(Number(v)))
		}, makeRandom(10, 30) * 100);

		//随机流星在1秒到5秒之间开始（3开始尝试不同）

	});
	timer = window.setTimeout(function () {
		makeMeteor();
	}, makeRandom(5, 10) * 1000);

	//拍摄10至15秒。
}
//fn. makeMeteor

function meteorParty() {
	window.clearTimeout(timer);
	var setclassname = ['meteor', 'meteor prev', 'meteor next'];
	$stars_fix_star.each(function (index) {
		var $this = $(this);
		if (!$this.hasClass('meteor') && index < 20) {
			var settime = setTimeout(function () {
				$this.removeClass('meteor prev next').addClass(setclassname[index % 3]);
			}, makeRandom(1, 5) * 100);
		}
	})
	timer = window.setTimeout(function () {
		makeMeteor();
	}, 8000);
};
//fn. meteorParty

function elementMove(num) {
	if (num == 0 && !$section1.find('.stars').length > 0) {
		$('.stars').appendTo($section1);
	} else if (num == 2 && !$('.section4 .stickyBg').find('.stars').length > 0) {
		$('.stars').appendTo($('.section4 .stickyBg'));
	} else if ((num == 3 || num == 4) && !$section6.find('.stars').length > 0) {
		$('.stars.fix').appendTo($('.section5  .starsWrap'));
		$('.stars.dual').appendTo($('.section6  .starsWrap'));
	}
}
//instaGram stars

function loadAudio(getAudio, index, playaction) {
	var requestB = new XMLHttpRequest();
	requestB.open('GET', getAudio, true);
	requestB.responseType = 'arraybuffer';
	requestB.onload = function (e) {
		if (this.status == 200) {
			context[index].decodeAudioData(this.response, function (buffer) {
					// console.log(getAudio + ' / 数 ' + index)
					loadedAudio++;
					musicBuffer[index] = buffer;
					source[index] = context[index].createBufferSource();
					if (loadedAudio >= 3 && !soundPlayed[currentSection] && !isMobile && currentSection !== 2 && playaction && musicBuffer[currentSection]) playSound3(musicBuffer[currentSection], currentSection);
					if (index == 98) {
						// bgmloaded = true;
						// $('#startBtn').addClass('loaded').text('Enter');
						// console.log(playaction)
						if (!isMobile && playaction) {
							// $('#bgmText').text('BGM loaded').stop().delay(1000).fadeOut();
							$('#status').hide();
							$('#waittitle').html('Welcome, Run!');
							$('#startBtn').addClass('run').text('RUN').on('click', function (e) {
								moveEventOnce();
								$htmlbody.removeClass('lock');
								$html.scrollTop(0);
								$body.scrollTop(0);
								$('#startlayer').fadeOut();
								orientStart();
							});
							playSound3(buffer, 98);
						} else if (isMobile) {
							// $('#bgmText').text('2_ BGM loaded, Touch and play');
							playSound3(buffer, 98);
						} else {
							$('#bgmText').text('3_ BGM loaded but Auto play off').stop().delay(1000).fadeOut();
						}
					}
				},
				function (e) {
					console.log("Error with decoding audio data" + e.err);
				});
		};
	}
	requestB.send();
}
//fn. loadAudio

function useAbleSoud(url) {
	var myAudio = document.createElement('audio');
	if (myAudio.canPlayType('audio/mpeg') && url.mp3) {
		var getAudio = url.mp3;
		if (isMobile && url.mp3ios) {
			getAudio = url.mp3ios;
		}
	} else if (myAudio.canPlayType('audio/mp4') && url.m4a) {
		var getAudio = url.m4a;
	} else if (myAudio.canPlayType('audio/ogg') && url.ogg) {
		var getAudio = url.ogg;
	} else {
		var getAudio = url.mp3;
	}
	return getAudio;
}
//fn. useAbleSoud

var moveEventValue = false;
var orientStarted = false;

function orientStart() {
	if (orientStarted) return false;
	// console.log('')
	if (window.DeviceOrientationEvent && isMobile) {
		gammaAble = true;
		window.addEventListener('deviceorientation', handleOrientation, false);
	} else {
		gammaAble = false;
		// window.addEventListener("mousemove", handleOrientation, false);
		$app.mousemove(function (e) {
			handleOrientation(e);
		});
		// $detailContent.mousemove(function(e){
		// console.log(this)
		// });
		/*$(document).bind('mousemove', function (e) {
			setTranslate(event.pageX + 15, event.pageY - scrollPos + 15, _detailpage_close_btn, 0, 0);
		});*/
	}
	//if
	orientStarted = true;
}
//fn. orientStart

function moveEventOnce() {
	if (!moveEventValue) {
		var arr = [0, 1, 3, 98];
		for (var i = 0; i < arr.length; i++) {
			context[arr[i]].resume().then(() => {
				if (!moveEventValue) moveEventValue = true
				console.log('Resume');
			});
		}
	}
}
//fn. moveEventOnce

function loadSoundFile(getAudio, index, saveAudio, playaction) {
	context[index] = new AudioContext();
	if (context[index].state !== 'running' && !isMobile) {
		// location.replace('./index_dev.html');
		// return false;
	}
	soundPlayed[index] = false;
	if (UseCanLocalstorage && saveAudio) {
		// console.log('声音已保存');
		if (localStorage.getItem(String('sound' + index))) {
			console.log('声音已经保存');

			var reReadItem = JSON.parse(localStorage.getItem(String('sound' + index)));
			// loadAudioResumed(reReadItem.src, index, playaction);
			loadAudio(reReadItem.src, index, playaction);
		} else {
			console.log('声音未存储，将存储');
			var requestA = new XMLHttpRequest();
			requestA.open('GET', getAudio, true);
			requestA.responseType = 'blob';
			requestA.withCredentials = true;
			// requestAend = true;
			requestA.addEventListener('load', function (e) {

				var testBlob = requestA.response;

				function getBblob(blob) {
					var size = blob.size;
					var type = blob.type;
					var reader = new FileReader();
					reader.addEventListener("loadend", function (data) {
						var base64FileData = reader.result.toString();
						var mediaFile = {
							fileUrl: getAudio,
							size: blob.size,
							type: blob.type,
							src: base64FileData
						};
						loadAudio(getAudio, index, playaction);
						localStorage.setItem(String('sound' + index), JSON.stringify(mediaFile));
						////
					});
					reader.readAsDataURL(blob);
				}
				getBblob(testBlob);
			}, false);
			requestA.send();
		}
		//if
	} else {
		loadAudio(getAudio, index, playaction);
	};
}
//fn. loadSoundFile

var gainNode;

function playSound3(buffer, index) {
	if (index == 4 && index == 5) return false;

	if (pausedAt[index]) source[index] = context[index].createBufferSource();
	if (index >= 98) {
		gainNode = context[index].createGain();
		gainNode.gain.value = soundVolume;
		gainNode.connect(context[index].destination);
		source[index].connect(gainNode);
	} else {
		// console.log(index)
		source[index].connect(context[index].destination);
	}
	if (!source[index].buffer) source[index].buffer = buffer;
	source[index].loop = true;
	soundPlayed[index] = true;
	var startSound = function () {
			if (index >= 98) {
				analyser = context[index].createAnalyser();
				source[index].connect(analyser);
				fbc_array = new Uint8Array(analyser.frequencyBinCount);
				// console.dir(source[index])
			}
			if (pausedAt[index]) {
				startedAt[index] = Date.now() - pausedAt[index];
				source[index].start(0, pausedAt[index] / 1000);
			} else {
				if (source[index].start) {
					source[index].start(0);
				} else if (source[index].play) {
					source[index].play(0);
				} else if (source[index].noteOn) {
					source[index].noteOn(0);
				}
				startedAt[index] = Date.now();
			}
			if (isMobile && index >= 98) {
				// $('#bgmText').fadeOut();
				$('#status').hide();
				$('#waittitle').html('Welcome, Run!');
				$('#startBtn').addClass('run').text('RUN').on('click', function (e) {
					startSound();
					orientStart();
					$('#startlayer').fadeOut();
					$htmlbody.removeClass('lock');
					$html.scrollTop(0);
					$body.scrollTop(0);
				});
			}
		}
		//startSound

	if (isMobile && index >= 98) {
		$('#status').hide();
		$('#waittitle').html('Welcome, Run!');
		$('#startBtn').addClass('run').text('RUN').on('click', function (e) {
			startSound();
			orientStart();
			$('#startlayer').fadeOut();
			$htmlbody.removeClass('lock');
			$html.scrollTop(0);
			$body.scrollTop(0);
		});
	} else {
		startSound();
		orientStart();
	}

}
//fn. playSound3

function stopSound(index) {
	// console.log('暂停 ' + index)
	pausedAt[index] = Date.now() - startedAt[index];
	soundPlayed[index] = false;
	source[index].stop(0);
};
//fn. stopSound

function runsoundData() {
	var step = Math.round(fbc_array.length / 80);
	// console.log(step)
	if (analyser) {
		analyser.getByteFrequencyData(fbc_array);
		//fromm
		wave_front_fbc = wave_ship_fbc = fbc_array[5 * step];
		wave_back_fbc = fbc_array[20 * step];
		hotballoon_fbc = fbc_array[20 * step];
		smoke_fbc = fbc_array[20 * step];
		hand_fbc = fbc_array[20 * step];
		fire_fbc = fbc_array[20 * step];
	}
}
//fn. runsoundData

function setCanvas() {
	canvas_wave = document.getElementById("sea-front")
	ctx_wave = canvas_wave.getContext("2d");
	canvas_wave_back = document.getElementById("sea-back")
	ctx_wave_back = canvas_wave_back.getContext("2d");
	canvas_flame = document.getElementById("flame");
	ctx_flame = canvas_flame.getContext("2d");
	canvas_flame2 = document.getElementById("flame2");
	ctx_flame2 = canvas_flame2.getContext("2d");
	//
	canvas_cloud_front = document.getElementById("cloud-front");
	ctx_cloud_front = canvas_cloud_front.getContext("2d");
	ctx_cloud_back = canvas_cloud_front.getContext("2d");

	canvas_cloud_front2 = document.getElementById("cloud-front2");
	ctx_cloud_front2 = canvas_cloud_front2.getContext("2d");
	ctx_cloud_back2 = canvas_cloud_front2.getContext("2d");
	//
	tempCanvas = document.createElement("canvas"),
		tCtx = tempCanvas.getContext("2d");
	tempCanvas2 = document.createElement("canvas"),
		tCtx2 = tempCanvas2.getContext("2d");
	//
	canvas_smoke = document.getElementById("smoke");
	ctx_smoke = canvas_smoke.getContext("2d");
}
//fn. setCanvas

function clearLooper(arrayNum) {
	for (var i = 0; i < arrayNum.length; i++) {
		// console.log(arrayNum[i])
		if (sectionAnimate[arrayNum[i]]) {
			window.cancelAnimationFrame(req[arrayNum[i]]);
			sectionAnimate[arrayNum[i]] = false;
		}
	}
}
//fn. clearLooper

var TO_RADIANS = Math.PI / 180;

function drawRotatedImage(image, x, y, angle) {
	var scalex = ($app.width() < 960) ? 0.7 : 1;
	var scalex2 = ($app.width() < 960) ? 0.5 : 0.7;
	var setscale = isMobile ? scalex : scalex2;
	var movey = isMobile ? -canvas_wave.height * 0.6 : -canvas_wave.height * 0.5;
	ctx_wave.save();
	// var movey = ($app.width() < 960) ? -(canvas_wave.height*0.5) : -(canvas_wave.height*0.5+20);
	ctx_wave.translate(x, movey + y);
	ctx_wave.rotate(angle * TO_RADIANS);
	ctx_wave.scale(setscale, setscale);
	ctx_wave.drawImage(image, 0, -(image.height * 0.9));
	ctx_wave.restore();
}
//fn. drawRotatedImage

function FadeInMotionSet() {
	$fademotiontarget.each(function (index) {
		var $this = $(this);
		fadeInMotionTargetOffset[index] = $this.offset().top;
	});
}
//fn. FadeInMotionSet

function getInstagram() {
	var loadedInsta = 0;
	var token = '37179110.1677ed0.477517b4892f4af4bb113c6a50e6b757',
		userid = 37179110,
		num_photos = maxinstaNum;

	$.ajax({
		url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent',
		// or /users/self/media/recent for Sandbox
		dataType: 'jsonp',
		type: 'GET',
		data: {
			access_token: token,
			count: num_photos
		},
		success: function (data) {
			instagramData = data.data;
			//console.dir(data.data)
			$.each(instagramData, function (index, value) {
				var canvas = document.createElement('canvas');
				var image = new Image(100, 100);
				toDataURL(instagramData[index].images.thumbnail.url, function (dataUrl) {
					//return dataUrl;
					image.src = dataUrl;
					image.onload = drawImageActualSize;
				})

				// image.src = instagramData[index].images.low_resolution.url;
				//  image.crossOrigin="anonymous";
				//  image.crossOrigin = "Anonymous";
				//  image.setAttribute('crossOrigin', 'anonymous');

				function drawImageActualSize() {
					var canvas = document.createElement("canvas");
					var ctx = canvas.getContext('2d');
					canvas.width = this.width;
					canvas.height = this.height;
					ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
					var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
					loadedInsta = loadedInsta + 1;
					oilPaintEffect(canvas, 3, 10, ctx, index);
					// if(loadedInsta == num_photos) alert('start');
				}
			});
			//each
			$('.contents').find('h4.ment').html('&ldquo; ' + instagramData[0].caption.text + ' &rdquo;' + '<span class="from"> - From <b>Instagram</b>, ' + timeAgo(instagramData[0].created_time) + ' </span>')
		},
		error: function (data) {
			console.log(data);
		}
	});
}
//fn. getInstagram


/* ---------------------------------------------------------------------------------*/
/* 案例 
/* ---------------------------------------------------------------------------------*/
 
function setEmpty() {
	$detailContent.empty();
	/*$detailContent.find('.client').empty();
	$detailContent.find('.project').empty();
	$detailContent.find('.role').empty();
	$detailContent.find('.date').empty();
	videoReady(false);*/
}
//fn. 清空案例列表值

function fallback(video) {
	var img = video.querySelector('img');
	if (img)
		video.parentNode.replaceChild(img, video);
}
//fn. 没有视频时替换图像

function videoReady(b) {
	console.log(b)
	if (true) $('#videoload').fadeOut();
}
//videoReady


function setPortfolio() {
	for (var i = 0; i < portfolioData.length; i++) {
		$('<li id="portfolio-' + i + '"></li>').appendTo($portfolioUl)
			.html('<h4><a href="#portfolio-' + i + '" class="btn detailview" data-idx="' + i + '">' + portfolioData[i].title + ' </a></h4>')
			.find('.btn.detailview').on('click', function (event) {
			
				/* show portfolio contents */
				if (!$mainnav.hasClass('detailpageOpen')) {
					setEmpty();
					var $this = $(this),
					getIdx = $this.data('idx');
			
					$detailContent.load(portfolioData[getIdx].datalink);
					//alert(portfolioData[getIdx].datalink);
					
					/*var insertHtml = '';
					gtag('event', '点击', {
						'event_category': 'Portfolio',
						'event_label': portfolioData[getIdx].title
					});

					var getWebm = (portfolioData[getIdx].movie.mp4) ? ' <source src="' + portfolioData[getIdx].movie.webm + '" type="video/webm" />' : '';
					if (portfolioData[getIdx].movie.mp4.length > 0) {
						insertHtml += '<li><div class="loadanimate" id="videoload"><div></div><div></div><div></div><div></div></div><video autoplay loop muted playsinline oncanplaythrough="videoReady(true)" ><source src="' + portfolioData[getIdx].movie.mp4 + '" onerror="fallback(parentNode)">' + getWebm + '<img src="' + portfolioData[getIdx].keyvisual[0] + '"></video></li>';
					} else {
						for (i = 0; i < portfolioData[getIdx].keyvisual.length; i++) {
							insertHtml += '<li><img src="' + portfolioData[getIdx].keyvisual[i] + '?' + (new Date).getTime() + '" alt="' + portfolioData[getIdx].title + '"></li>';
						}
					}
					//if
					$('<ul></ul>').appendTo($detailContent.find('.captureImg')).html(insertHtml);
					$detailContent.find('.captureImg')

					if (portfolioData[getIdx].clientlogo.length > 0) {
						$detailContent.find('.client').html('<img src="' + portfolioData[getIdx].clientlogo + '" alt="' + portfolioData[getIdx].client + '" class="logo">');
					} else {
						$detailContent.find('.client').html(portfolioData[getIdx].client);
					}
					
					
					$detailContent.find('.description').html(portfolioData[getIdx].description);
					$detailContent.find('.role').html(portfolioData[getIdx].role);
					$detailContent.find('.date').html(portfolioData[getIdx].date);*/
			
					$detailContent.ready(function () {
							$mainnav.addClass('detailpageOpen');
						}
					)
				}
				/* show portfolio contents */
										
				eventClick(event);
			});
	}
	//for
}
//fn. setPortfolio

function toDataURL(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		var reader = new FileReader();
		reader.onloadend = function () {
			callback(reader.result);
		}
		reader.readAsDataURL(xhr.response);
	};
	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send();
}
//toDataURL

var instagramData = [];
var instagramRandRotate = [];
var instagramRandScale = [];

function oilPaintEffect(canvas, radius, intensity, ctx, index) {
	var width = canvas.width,
		height = canvas.height;
	var imgData = ctx.getImageData(0, 0, width, height);
	var pixData = imgData.data;
	var destCanvas = document.createElement("canvas"),
		dCtx = destCanvas.getContext("2d"),
		pixelIntensityCount = [];
	destCanvas.width = width;
	destCanvas.height = height;
	destCanvas.style.width = destCanvas.style.height = '105%';
	var moveIndex = index + 1;
	var likeNumdiv = document.createElement('div');
	likeNumdiv.classList.add("likes");
	likeNumdiv.innerHTML = instagramData[index].likes.count;


	//以下内容已添加到部分中
	instagramRandRotate[index] = Math.sin(makeRandom(2, 10)) * 30;
	instagramRandScale[index] = (makeRandom(5, 10) * 0.1);
	$('<li id="instagramSVG' + index + '"></li>').appendTo($instagramWrap).html('<div class="canvaswrap"></div>')
		.append(likeNumdiv)
		.css({
			'top': (30 + makeRandom(moveIndex * 1, moveIndex * 8)) + '%',
			'left': ((index * 10) + makeRandom(moveIndex * 1, moveIndex * 5)) + '%'
		})
		.on('click', function (e) {
			window.open(instagramData[index].link, 'instagramPopup', 'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no');

		})
		.find('.canvaswrap').html(destCanvas).css({
			'-webkit-transform': 'scale(' + (makeRandom(5, 10) * 0.1) + ') rotate(' + makeRandom(-30, 30) + 'deg)',
			'-moz-transform': 'scale(' + (makeRandom(5, 10) * 0.1) + ') rotate(' + makeRandom(-30, 30) + 'deg)',
			'transform': 'scale(' + (makeRandom(5, 10) * 0.1) + ') rotate(' + makeRandom(-30, 30) + 'deg)'
		});
	// .addClass('instaLi' + index%2)

	var destImageData = dCtx.createImageData(width, height),
		destPixData = destImageData.data,
		intensityLUT = [],
		rgbLUT = [];

	for (var y = 0; y < height; y++) {
		intensityLUT[y] = [];
		rgbLUT[y] = [];
		for (var x = 0; x < width; x++) {
			var idx = (y * width + x) * 4,
				r = pixData[idx],
				g = pixData[idx + 1],
				b = pixData[idx + 2],
				avg = (r + g + b) / 3;

			intensityLUT[y][x] = Math.round((avg * intensity) / 255);
			rgbLUT[y][x] = {
				r: r,
				g: g,
				b: b
			};
		}
	}


	for (y = 0; y < height; y++) {
		for (x = 0; x < width; x++) {
			pixelIntensityCount = [];
			for (var yy = -radius; yy <= radius; yy++) {
				for (var xx = -radius; xx <= radius; xx++) {
					if (y + yy > 0 && y + yy < height && x + xx > 0 && x + xx < width) {
						var intensityVal = intensityLUT[y + yy][x + xx];
						if (!pixelIntensityCount[intensityVal]) {
							pixelIntensityCount[intensityVal] = {
								val: 1,
								r: rgbLUT[y + yy][x + xx].r,
								g: rgbLUT[y + yy][x + xx].g,
								b: rgbLUT[y + yy][x + xx].b
							}
						} else {
							pixelIntensityCount[intensityVal].val++;
							pixelIntensityCount[intensityVal].r += rgbLUT[y + yy][x + xx].r;
							pixelIntensityCount[intensityVal].g += rgbLUT[y + yy][x + xx].g;
							pixelIntensityCount[intensityVal].b += rgbLUT[y + yy][x + xx].b;
						}
					}
				}
			}

			pixelIntensityCount.sort(function (a, b) {
				return b.val - a.val;
			});

			var curMax = pixelIntensityCount[0].val,
				dIdx = (y * width + x) * 4;

			destPixData[dIdx] = ~~(pixelIntensityCount[0].r / curMax);
			destPixData[dIdx + 1] = ~~(pixelIntensityCount[0].g / curMax);
			destPixData[dIdx + 2] = ~~(pixelIntensityCount[0].b / curMax);
			destPixData[dIdx + 3] = 255;
		}
	}
	dCtx.putImageData(destImageData, 0, 0);

	//
}
//oilPaintEffect

function timeAgo(time) {
	if (isNaN(setTimeStamp(time).day_diff) || setTimeStamp(time).day_diff < 0)
		return;
	var day_diff = setTimeStamp(time).day_diff;
	var diff = setTimeStamp(time).diff;

	return day_diff == 0 && (
			diff < 60 && "now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor(diff / 60) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor(diff / 3600) + " hours ago") ||
		day_diff == 1 && "yesterday" ||
		day_diff < 7 && day_diff + " days ago" ||
		day_diff < 31 && Math.ceil(day_diff / 7) + " week ago" ||
		day_diff < 365 && Math.ceil(day_diff / 30) + " months  ago" ||
		day_diff >= 365 && Math.ceil(day_diff / 365) - 1 + " years ago";

}

function timeAgoKR(time) {
	if (isNaN(setTimeStampKR(time).day_diff) || setTimeStampKR(time).day_diff < 0)
		return;
	var day_diff = setTimeStampKR(time).day_diff;
	var diff = setTimeStampKR(time).diff;

	return day_diff == 0 && (
			diff < 60 && "방금 전" ||
			diff < 120 && "1분 전" ||
			diff < 3600 && Math.floor(diff / 60) + "분 전" ||
			diff < 7200 && "1시간 전" ||
			diff < 86400 && Math.floor(diff / 3600) + "시간 전") ||
		day_diff == 1 && "어제" ||
		day_diff < 7 && day_diff + " 일 전" ||
		day_diff < 31 && Math.ceil(day_diff / 7) + "주 전" ||
		day_diff < 365 && Math.ceil(day_diff / 30) + "개월 전" ||
		day_diff >= 365 && Math.ceil(day_diff / 365) - 1 + "년 전";

}

function setTimeStampKR(time) {
	var newtime = new Date(time * 1000);
	var time2 = String(newtime).substr(0, 19) + '+0900';
	var date = new Date((time2 || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);
	return {
		day_diff: day_diff,
		diff: diff
	}
	// if ( isNaN(day_diff) || day_diff < 0)
	// return;
}

function setTimeStamp(time) {
	// time = time.substr(0,19)+'+0000';
	// console.log((time || "").replace(/-/g,"/").replace(/[TZ]/g," "));
	// var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
	var date = new Date(time * 1000),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);
	// console.log(date);
	return {
		day_diff: day_diff,
		diff: diff
	}
	// if ( isNaN(day_diff) || day_diff < 0)
	// return;
}

function convertDate(date) {
	var d = new Date();
	var n = d.toLocaleDateString();
	return n;
}

function setTranslate(xPos, yPos, el, rotate, zPos) {
	if (!el || el.style == null || el.style == undefined) {
		console.log('有一个错误 ' + el)
		return;
	}
	var rotateV = (rotate == undefined) ? 0 : rotate;
	var zPosV = (zPos == undefined) ? 0 : zPos;
	// TweenLite.to(el, 0, { x : xPos, y : yPos, z : zPosV, rotation : rotateV});
	el.style['transform'] = "translate3d(" + xPos + "px, " + yPos + "px, " + zPosV + "px) rotate(" + rotateV + "deg)";
	el.style['-webkit-transform'] = "translate3d(" + xPos + "px, " + yPos + "px, " + zPosV + "px) rotate(" + rotateV + "deg)";
	el.style['-moz-transform'] = "translate3d(" + xPos + "px, " + yPos + "px, " + zPosV + "px) rotate(" + rotateV + "deg)";
	el.style['-o-transform'] = "translate3d(" + xPos + "px, " + yPos + "px, " + zPosV + "px) rotate(" + rotateV + "deg)";
}
//setTranslate

/*-------- introLooper ---------------------------------------*/
var shipImage = new Image();
shipImage.src = '/v3/images/ship_3.png';
var loadShipImg = false;
shipImage.onload = function () {
	loadShipImg = true;
}
var loadedOnce = [false, false, false, false, false];

function introLooper() {
	// sectionAnimate[0] = true;
	// req[0] = window.requestAnimationFrame(introLooper);
	ctx_wave.clearRect(0, 0, canvas_wave.width, canvas_wave.height);
	ctx_wave_back.clearRect(0, 0, canvas_wave_back.width, canvas_wave_back.height);

	runsoundData();

	var withi = isMobile ? ($app.width() * 2) / 5 : ($app.width()) / 5;
	var counter = 0;
	var xMove = 0;
	var increase = Math.PI / 90 + wid;
	var rotateV = 15 + Math.cos(counter + globCount);
	var posy = isMobile ? canvas_wave.height * 0.89 : canvas_wave.height * 0.84;
	if (loadShipImg) {
		drawRotatedImage(shipImage,
			(canvas_wave.width * 1) * 0.5 + xGamma * 0.5,
			((posy) + (-wave_ship_fbc / 16) + (Math.sin(canvas_wave.width * 0.4 + globCount)) * (wave_height)),
			rotateV);
	}
	for (var i = 0; i <= withi; i++) {
		var x = i;
		var y = Math.sin(counter + globCount);
		var y2 = Math.sin(counter + globCount * 2);
		counter += increase;
		var pp = (canvas_wave.height * 0.1) + (wave_back_fbc / -10) + y * (wave_height + (wave_back_fbc / 10)); //后波浪
		var pp2 = (canvas_wave.height * 0.2) + (wave_front_fbc / -8) + y2 * (wave_height); //前波浪
		if (myAarray[i] == undefined || myAarray[i] == '') {
			myAarray[i] = ctx_wave_back;
		}
		if (myAarray2[i] == undefined || myAarray2[i] == '') {
			myAarray2[i] = ctx_wave;
		}
		myAarray[i].beginPath();
		myAarray[i].lineWidth = "20";
		myAarray[i].strokeStyle = "rgba(4, 0, 55, 1)"; //背面颜色
		myAarray[i].moveTo(Math.round(5 + xMove), Math.round(canvas_wave_back.height));
		myAarray[i].lineTo(Math.round(5 + xMove), Math.round(pp + 10) + 20);
		myAarray[i].stroke();

		myAarray2[i].beginPath();
		myAarray2[i].lineWidth = "20";
		myAarray2[i].strokeStyle = "rgba(6, 0, 78, 0.8)"; //正面颜色
		myAarray2[i].moveTo(Math.round(0 + xMove), Math.round(canvas_wave.height));
		myAarray2[i].lineTo(Math.round(0 + xMove), Math.round(pp2 + 10) + 20);
		myAarray2[i].stroke();
		xMove += 5;
	}
	//for
	globCount += 0.04 + wave_speed;

	var getSoundData = (wave_front_fbc * 0.5 > hand_fbc) ? wave_front_fbc * 0.5 : hand_fbc;
	var moveSkyOverlay = getSoundData * 0.6;
	if (moveSkyOverlay > 100) moveSkyOverlay = 100;
	moveSkyOverlay = (iosheight / 100) * moveSkyOverlay;
	setTranslate(0, (-moveSkyOverlay), document.getElementById('overlaysky'), 0, 0);
	if (loadShipImg && lightMode) loadedOnce[0] = true;
}
//fn. introLooper

/*--------  hillhouseLooper ---------------------------------------*/
function Particle2(x, y, xs, ys, lifeup) {
	this.x = x;
	this.y = y;
	this.xs = xs;
	this.ys = ys;
	this.lifeup = lifeup;
	this.life = 0;
}
var particles2 = [];
var max2 = 100;
var speed2 = 1;
var size2 = (isMobile) ? 25 : 55;

function hillhouseLooper() {
	//冒烟烟囱
	// sectionAnimate[2] = true;
	// req[2] = window.requestAnimationFrame(hillhouseLooper);
	ctx_smoke.clearRect(0, 0, canvas_smoke.width, canvas_smoke.height);

	runsoundData();

	var getSoundData = (wave_back_fbc * 0.5 > smoke_fbc) ? wave_back_fbc * 0.5 : smoke_fbc;

	for (var i = 0; i < 2; i++) {
		var p = new Particle((canvas_smoke.width * 0.05),
			Math.round(canvas_smoke.height - (canvas_smoke.width * 0.05)),
			Math.random() * 0.1 + 0.2 + (getSoundData / 8) * ((canvas_smoke.width * 0.0002)),
			Math.random() * 0.5 * speed2 - 1 * (canvas_smoke.width * 0.003),
			1);
		particles2.push(p);
	}

	for (var i = 0; i < particles2.length; i++) {
		// ctx_smoke.fillStyle = "rgba(240,239,227,"+(((max2-particles2[i].life)/max2)*1)+")";
		ctx_smoke.fillStyle = "rgba(238,241,248," + (((max2 - particles2[i].life) / max2) * 0.8) + ")";
		ctx_smoke.beginPath();
		// ctx_smoke.globalCompositeOperation="multiple";
		ctx_smoke.arc(Math.round(particles2[i].x + canvas_smoke.width * 0.005),
			Math.round(particles2[i].y),
			Math.round(canvas_smoke.width * 0.005 + particles2[i].x * 0.1 + (getSoundData / 1) * 0.05),
			0, 2 * Math.PI);
		ctx_smoke.fill();
		particles2[i].x += particles2[i].xs * 0.5;
		particles2[i].y += particles2[i].ys * 0.5 - (getSoundData * 0.002);
		particles2[i].life += particles2[i].lifeup;
		if ((particles2[i].life >= max2) && lightMode) loadedOnce[3] = true;
		if (particles2[i].life >= max2) {
			particles2.splice(i, 1);
			i--;
		}
	}
	//for


}
//fn. hillhouseLooper

/*--------section2Loop --------------------------------------------*/
function Particle(x, y, xs, ys, lifeup) {
	this.x = x;
	this.y = y;
	this.xs = xs;
	this.ys = ys;
	this.lifeup = lifeup;
	this.life = 0;
}



var fronth = 178;
var backh = 178;
var offset_x = 0;

var loadedPattern = [false, false];

function loadPatternImages() {
	var patternImage = new Image();
	var patternImage2 = new Image();
	patternImage.src = '/v3/images/cloud-front2_fafafa.png?' + (new Date().getTime());
	patternImage2.src = '/v3/images/cloud-back2.png?' + (new Date().getTime());

	patternImage.onload = function () {
		tempCanvas.width = (patternImage.width / patternImage.height) * fronth * 0.5;
		tempCanvas.height = fronth * 0.5;
		tCtx.drawImage(patternImage, 0, 0, Math.round(patternImage.width), Math.round(patternImage.height), 0, 0, Math.round((patternImage.width / patternImage.height) * fronth * 0.5), fronth * 0.5);
		loadedImage = loadedImage + 1;
		loadedPattern[0] = true;
		if (loadedImage == 2) {
			section2Loop();
			section2Loop2();
		}
	}
	patternImage2.onload = function () {
		tempCanvas2.width = (patternImage2.width / patternImage2.height) * backh * 0.5;
		tempCanvas2.height = backh * 0.5;
		tCtx2.drawImage(patternImage2, 0, 0, Math.round(patternImage2.width), Math.round(patternImage2.height), 0, 0, Math.round((patternImage2.width / patternImage2.height) * backh * 0.5), backh * 0.5);
		loadedImage = loadedImage + 1;
		loadedPattern[1] = true;
		if (loadedImage == 2) {
			section2Loop();
			section2Loop2();
		}
	}
}
//loadPatternImages

var cloudCase = 0;
var loadedImage = 0;
var particles = [];

function section2flame() {
	var max = (isMobileCSS) ? 12 : 18;
	var speed = (isMobileCSS) ? 6 : 8;
	var size = (isMobileCSS) ? 5 : 9;

	ctx_flame.clearRect(0, 0, canvas_flame.width, canvas_flame.height);
	ctx_flame.globalCompositeOperation = "screen";
	// ctx_flame.globalCompositeOperation="lighter";

	runsoundData();
	for (var i = 0; i < 2; i++) {
		var p = new Particle(canvas_flame.width * 0.4 + Math.random() * (canvas_flame.width * 0.2), canvas_flame.height - 5, (Math.random() * 2 * speed - speed) / 50, 0 - Math.random() * 0.4 * speed, 1);
		particles.push(p);
	}

	for (var i = 0; i < particles.length; i++) {
		var getColor = hotballoon_fbc * 0.5 > 80 ? 80 : hotballoon_fbc * 0.5;
		var colorR = (227 + 80) - (particles[i].life * 2) - getColor;
		var colorG = (110 + 80) - (particles[i].life * 2) - getColor;
		var colorB = (185 + 80) - (particles[i].life * 2) - getColor;
		ctx_flame.fillStyle = "rgba(" + colorR + "," + colorG + "," + colorB + "," + (((max - particles[i].life) / max) * 0.2) + ")";
		ctx_flame.beginPath();
		ctx_flame.arc(Math.round(particles[i].x),
			Math.round(particles[i].y),
			// Math.round((max-particles[i].life)/max*(size*0.1)+(hotballoon_fbc / 0.6)*0.02),
			(size * 0.3) + Math.round((max - particles[i].life) / max + (hotballoon_fbc / 0.6) * 0.02) * (size / 10),
			0,
			2 * Math.PI);
		ctx_flame.fill();

		particles[i].x += particles[i].xs - (hotballoon_fbc / 0.6) * 0.002;
		particles[i].y += particles[i].ys - (hotballoon_fbc / 0.6) * 0.001;
		particles[i].life += particles[i].lifeup;
		if (particles[i].life >= max) {
			particles.splice(i, 1);
			i--;
		}
	}
	//for


	var opacityVal = ((hotballoon_fbc / 2) * 0.005 + 0.5 >= 1) ? 1 : (hotballoon_fbc / 2) * 0.005 + 0.5;
	// console.log(opacityVal)
	_moonHit.style.opacity = opacityVal;
	_moonHit.style.filter = 'alpha(opacity=' + (opacityVal * 10) + ')'; // IE fallback

}

function section2Loop() {
	section2flame();
	// var setNum = cloudCase;
	// sectionAnimate[1] = true;
	// req[1] = window.requestAnimationFrame(section2Loop);
	// if(!loadedPattern[0] || !loadedPattern[1]) loadPatternImages();

	ctx_cloud_front.clearRect(0, 0, canvas_cloud_front.width, canvas_cloud_front.height);
	ctx_cloud_back.clearRect(0, 0, canvas_cloud_front.width, canvas_cloud_front.height);
	canvas_cloud_front.height = canvas_cloud_front2.height = isMobile ? 89 * 2 : 89;

	offset_x = (isMobile) ? offset_x - 1 : Number((-scrollPos) * 0.3);
	var transY = isMobile ? 120 - 89 : 0;

	for (var i = 0; i < 2; i++) {
		myAarray3[i] = (i == 0) ? ctx_cloud_front : ctx_cloud_back;
		myAarray3[i].fillStyle = (i == 0) ? myAarray3[i].createPattern(tempCanvas2, 'repeat') : myAarray3[i].createPattern(tempCanvas, 'repeat');
		myAarray3[i].beginPath();
		if (i == 0) {
			myAarray3[i].translate(offset_x, transY);
			myAarray3[i].rect(Math.round(-offset_x), 0, Math.round(canvas_cloud_front.width), Math.round(canvas_cloud_front.height));
		} else {
			myAarray3[i].translate(offset_x, transY);
			myAarray3[i].rect(Math.round(-offset_x * 2), 0, Math.round(canvas_cloud_front.width), Math.round(canvas_cloud_front.height));
		}
		myAarray3[i].fill();
	}
	if (lightMode) loadedOnce[1] = true;
	// console.log('section2loop1')
}
// fn section2Loop

function section2Loop2() {
	section2flame();


	ctx_cloud_front2.clearRect(0, 0, canvas_cloud_front2.width, canvas_cloud_front2.height);
	ctx_cloud_back2.clearRect(0, 0, canvas_cloud_front2.width, canvas_cloud_front2.height);

	canvas_cloud_front.height = canvas_cloud_front2.height = isMobile ? 89 * 2 : 89;

	offset_x = (isMobile) ? offset_x - 1 : Number((-scrollPos) * 0.3);
	var transY = isMobile ? 120 - 89 : 0;

	for (var i = 0; i < 2; i++) {

		myAarray3[i] = (i == 0) ? ctx_cloud_front2 : ctx_cloud_back2;
		myAarray3[i].fillStyle = (i == 0) ? myAarray3[i].createPattern(tempCanvas2, 'repeat') : myAarray3[i].createPattern(tempCanvas, 'repeat');
		myAarray3[i].beginPath();
		if (i == 0) {
			myAarray3[i].translate(offset_x, transY);
			myAarray3[i].rect(Math.round(-offset_x), 0, Math.round(canvas_cloud_front2.width), Math.round(canvas_cloud_front2.height));
		} else {
			myAarray3[i].translate(offset_x, transY);
			myAarray3[i].rect(Math.round(-offset_x * 2), 0, Math.round(canvas_cloud_front2.width), Math.round(canvas_cloud_front2.height));
		}
		myAarray3[i].fill();
	}
	if (lightMode) loadedOnce[2] = true;

}
// fn section2Loop2

/*------------ contactLoop ----------------------------------------------*/
function Particle3(x, y, xs, ys, lifeup) {
	this.x = x;
	this.y = y;
	this.xs = xs;
	this.ys = ys;
	this.lifeup = lifeup;
	this.life = 0;
}
var particles3 = [];

function contactLoop() {
	// sectionAnimate[4] = true;
	// req[4] = window.requestAnimationFrame(contactLoop);
	var speed3 = (isMobileCSS) ? 10 : 10;
	var max3 = (isMobileCSS) ? 20 : 20;
	var size3 = (isMobileCSS) ? 60 : 60;
	var getSoundData = (wave_front_fbc * 0.5 > hand_fbc) ? wave_front_fbc * 0.5 : hand_fbc;
	var rotateV = -20 + (getSoundData / 13);
	rotateV = rotateV > 15 ? 15 : rotateV;
	var rotateV2 = ((getSoundData / 13)) * 2 + 10;
	rotateV2 = rotateV2 > 60 ? 60 : rotateV2;
	runsoundData();
	// var masktween = TweenMax.to(".section6 .masktitle ", 0, {paddingBottom : fbc_array[10] / 3 + 'px'});
	// maskTitleMotion('.section6 .masktitle', $('.section6 .sectiontitle'));


	setTranslate(0, 0, document.querySelector('.hand').querySelector('img'), rotateV, 0);
	setTranslate(0, 0, document.querySelector('.hand2'), rotateV, 0);
	setTranslate(0, 0, document.querySelector('.hand2').querySelector('img'), rotateV2, 0);

	var fireheight = (isMobileCSS) ? 42 : 84;

	ctx_flame2.clearRect(0, 0, canvas_flame2.width, canvas_flame2.height);
	canvas_flame2.width = canvas_flame2.height = $app.width() < 800 ? $('.a-layer.fire').width() * 2 : $('.a-layer.fire').width();
	canvas_flame2.style.width = canvas_flame2.style.height = $('.a-layer.fire').width() + 'px';

	ctx_flame2.globalCompositeOperation = "screen";
	for (var i = 0; i < 3; i++) {
		var p = new Particle3(Math.round(canvas_flame2.width * 0.4 + Math.random() * (canvas_flame2.width * 0.2)),
			Math.round(canvas_flame2.height + 2), Math.round((Math.random() * 3 * speed3 - speed3) / 30),
			Math.round(0 - Math.random() * 0.3 * speed3), 1);
		particles3.push(p);
	}

	for (var i = 0; i < particles3.length; i++) {
		// console.log('fi')
		ctx_flame2.fillStyle = "rgba(" + (260 - (particles3[i].life * 2)) + "," + ((particles3[i].life * 2) + 50) + "," + (particles3[i].life * 2) + "," + (((max3 - particles3[i].life) / max3) * 0.5) + ")";
		ctx_flame2.beginPath();
		ctx_flame2.arc(Math.round(particles3[i].x + Math.sin(fire_fbc / 5) * 0.3),
			Math.round(particles3[i].y),
			Math.round((fireheight * 1 - particles3[i].life) / (fireheight * 1) * (size3 + (fire_fbc / 2)) * 0.09),
			0, 2 * Math.PI);
		// ctx_flame2.arc(particles3[i].x,particles3[i].y,(max2-particles3[i].life)/max2*(size2/5)+(getSoundData / 1.5)*0.03, 0 , 2*Math.PI);
		ctx_flame2.fill();

		particles3[i].x += particles3[i].xs;
		particles3[i].y += particles3[i].ys;
		particles3[i].life += particles3[i].lifeup;
		if ((particles3[i].life >= max3) && lightMode) loadedOnce[4] = true;
		if (particles3[i].life >= max3) {
			particles3.splice(i, 1);
			i--;
		}
	}
	//for

}
//contactLoop


/*---------------- 滚动事件 ----------------------------------*/

var workFixed = false;
var iamFixed = false;
var turnon = false;
var countupNumber = [];
// var orgnumber = 0;

function scrollAction() {

	requestAnimFrame(function () {
		scrollAction();
	});
	scrollPos = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
	// scrollPos = y
	// console.log('scrollPos ' + scrollPos);
	// if($('#responseCheck').offset().left == 0){
	// if($app.width() < 960){
	//       isMobileCSS = true;
	// }else{
	//       isMobileCSS = false;
	// }
	// if($section2.hasClass('detailpageOpen') && (scrollPos> beforeOpenScrollPos+  iosheight*0.2 || scrollPos< beforeOpenScrollPos-  iosheight*0.2)) unactiveDetailView();

	/*************************** 滚动事件 - 1.section1 / 简介 ********************************************/
	if (scrollPos < nextOffSet[0]) {
		// if(nextOffSet[0] - iosheight*0.5 >= $('.middlebox.eq0').height() + scrollPos){
		currentSection = 0;
		if (!soundPlayed[0] && !isMobile && musicBuffer[0]) playSound3(musicBuffer[0], 0);
		if ((sectionAnimate[0] == false || sectionAnimate[0] == undefined) && !loadedOnce[0]) introLooper();
		elementMove(currentSection);
		for (var i = 0; i < moveElement1.length; i++) {
			setTranslate(0, scrollPos * (-0.2 * (i + 1)), _section1.getElementsByClassName(moveElement1[i])[0]);
		}
		// setTranslate( 0, 0, _contentWrap, 0,0);
		// $section2.height(passLength +  $('.middlebox.eq0').height() + iosheight + $section2.width());
		// howtoMove = 0;
		//  if($section2.hasClass('detailpageOpen')){
		//        unactiveDetailView();
		// }
	} else {
		if (soundPlayed[0] == true && !isMobile) stopSound(0);
		// clearLooper([0]);
	}
	/*************************** 滚动事件 - 2.section2 / 热气球 ********************************************/
	var getMiddleboxH = $greetings.height();
	if (nextOffSet[0] - iosheight * 0.5 < getMiddleboxH + scrollPos && scrollPos <= nextOffSet[2] - iosheight && !$body.hasClass('lock')) {
		currentSection = 1;
		if (!soundPlayed[1] && !isMobile && musicBuffer[1]) playSound3(musicBuffer[1], 1);
		if ((sectionAnimate[1] == false || sectionAnimate[1] == undefined) && !loadedOnce[1] && cloudCase == 0) section2Loop();
		if ((sectionAnimate[1] == false || sectionAnimate[1] == undefined) && !loadedOnce[2] && cloudCase == 1) section2Loop2();
		var getOffsetValue = $('.middlebox.eq0').offset().top + $('.middlebox.eq0').height();
		// if(scrollEventAllow){
		setTranslate(Math.floor(Number($app.width() * 0 - (scrollPos - getOffsetValue))), 0, _contentWrap, 0, 0);

		$skillslevel.each(function (index) {
			var $this = $(this),
				$point = $this.find('.point'),
				getLevel = $this.data('level');
			if ($this.offset().left < $app.width() * 0.7) {
				if (!$this.hasClass('on')) {
					$this.addClass('on');
				};
				if (!isMobile) {
					if (countupNumber[index] < getLevel) {
						countupNumber[index] = countupNumber[index] + 3;
						$point.find('.numbers').text(countupNumber[index]);
					} else if (countupNumber[index] > getLevel) {
						countupNumber[index] = getLevel;
						$point.find('.numbers').text(countupNumber[index]);
					} else if (countupNumber[index] == undefined) {
						countupNumber[index] = 0;
					}
				}
				var setVh = (iosheight / 100) * (getLevel * -0.2);
				this.style.transform = 'translate3d(0px, ' + getLevel * -0.2 + 'vh' + ', 0px)';
				this.style['-o-transform'] = 'translate3d(0px, ' + getLevel * -0.2 + 'vh' + ', 0px)';
				this.style['-webkit-transform'] = 'translate3d(0px, ' + getLevel * -0.2 + 'vh' + ', 0px)';
				this.style['-moz-transform'] = 'translate3d(0px, ' + getLevel * -0.2 + 'vh' + ', 0px)';
			}

		});
		//each - skill
		// }
	} else {
		if (soundPlayed[1] == true && !isMobile) stopSound(1);
		// clearLooper([1]);
	}
	// 热风部分

	if (nextOffSet[0] <= scrollPos && nextOffSet[1] - iosheight * 0.5 > scrollPos - 128) {
		//128数字 .section2 里层云
		// setTranslate(0, nextOffSet[0] - scrollPos*1.2 , document.querySelector('.section2sectiontitle'), 0 );
		if (!workFixed) {
			workFixed = true;
			marginTop = (scrollPos - nextOffSet[0] > 0 && scrollPos < nextOffSet[1] - iosheight) ? scrollPos - nextOffSet[0] : 0;
			if (!$moon2Wrap.hasClass('motion')) $moon2Wrap.addClass('motion');
		}
	} else {
		workFixed = false;
	}
	//if
	//热风部分

	//---------------------------------------------------

	if (scrollPos <= nextOffSet[1] - iosheight) {
		//fix 状态云
		cloudCase = 0;
	} else {
		//fix 上升级的云彩
		cloudCase = 1;
	}
	//if cloud canvas append

	if (nextOffSet[1] < scrollPos && scrollPos <= nextOffSet[3] - 200 && !$mainnav.hasClass('on')) {
		if (!$mainnavBtn.hasClass('black')) $mainnavBtn.addClass('black');
		if (!$mainnavBgm.hasClass('black')) $mainnavBgm.addClass('black');
	} else {
		if ($mainnavBtn.hasClass('black')) $mainnavBtn.removeClass('black');
		if ($mainnavBgm.hasClass('black')) $mainnavBgm.removeClass('black');
	}

	/*************************** 滚动事件 - 3.forCloud / 白云之间 ********************************************/

	if (nextOffSet[1] - iosheight < scrollPos - 128 && scrollPos + 0 <= nextOffSet[2] && !$body.hasClass('lock')) {
		currentSection = 5;

		var increase = Math.PI / 180;
		var d = (scrollPos - nextOffSet[1]) * 0.003;
		var h = $app.width() < 1024 ? 1 : 1;
		var h2 = $app.width() < 1024 ? 0.5 : 1;
		var moveY = $app.width() < 1024 ? 1 : 1;


		var a = ((scrollPos - nextOffSet[1]) * moveY);
		setTranslate(0, Math.floor((nextOffSet[1] - scrollPos + 500) * 0.5), _svg2, 0);

		if (!$flyme.hasClass('show')) {
			$flyme.addClass('show');
		} else {
			setTranslate(
				(Math.sin((increase + d) * h) * ($app.width() * 0.2)) + ($app.width() * 0.5 - $flymen.width() * 0.5),
				((iosheight + $flymen.height() * -0) / (nextOffSet[2] - nextOffSet[1])) * (scrollPos - nextOffSet[1]),
				_flyme_svgWrap,
				Math.cos(increase + d) * ($app.width() * 0.01),
				0
			);
			//
		}
		//if
		setTranslate((scrollPos - (nextOffSet[2] - iosheight)) * 0.5, 0, _monster, 0);
		orgnumber = ((scrollPos - nextOffSet[1]) * moveY);
	} else {
		if ($flyme.hasClass('show')) $flyme.removeClass('show');
		_svg2.style.transform = 'translate3d(0px, 0px, 0px) rotate(0deg)';
		_svg2.style['-o-transform'] = 'translate3d(0px, 0px, 0px) rotate(0deg)';
		_svg2.style['-webkit-transform'] = 'translate3d(0px, 0px, 0px) rotate(0deg)';
		_svg2.style['-moz-transform'] = 'translate3d(0px, 0px, 0px) rotate(0deg)';
	}
	//白云节


	/*************************** 滚动事件 - 4 山屋部分 ********************************************/
	if (nextOffSet[2] - iosheight < scrollPos && scrollPos <= nextOffSet[3] - iosheight * 0.3 && !$body.hasClass('lock')) {
		// console.log('work ') 160 smoke bottom + height
		currentSection = 2;
		if ((sectionAnimate[2] == false || sectionAnimate[2] == undefined) && !loadedOnce[3]) hillhouseLooper();

		var getPosVal = (scrollPos - (nextOffSet[3] - iosheight * 1.5)) * -0.05;
		if (getPosVal < 1) getPosVal = 1;
		else if (getPosVal > 10) getPosVal = 10;
		var yPos = (getPosVal - 1) * 10;
		if (yPos == 0 && !turnon) {
			$('.windows').css({
				fill: "#ffb000"
			});
			turnon = true;
		} else if (yPos !== 0 && turnon) {
			$('.windows').css({
				fill: "#daedef"
			});
			turnon = false;
		}

		// _hillhouse_next.style.transform = 'perspective(500px) translate3d(0px, ' + Math.floor(yPos) + 'px, '+ Math.floor(getPosVal*100 - 100) + 'px)';
		// _hillhouse_next.style['-o-transform'] = 'perspective(500px) translate3d(0px, ' + Math.floor(yPos) + 'px, '+ Math.floor(getPosVal*100 - 100) + 'px)';
		// _hillhouse_next.style['-webkit-transform'] = 'perspective(500px) translate3d(0px, ' + Math.floor(yPos) + 'px, '+ Math.floor(getPosVal*100 - 100) + 'px)';
		// _hillhouse_next.style['-moz-transform'] = 'perspective(500px) translate3d(0px, ' + Math.floor(yPos) + 'px, '+ Math.floor(getPosVal*100 - 100) + 'px)';
		//
		// _hillhouse_next_bg.style.transform = 'perspective(500px) translate3d(0px, ' + Math.floor(yPos) + 'px, '+ Math.floor(getPosVal*100 - 100) + 'px)';
		// _hillhouse_next_bg.style['-o-transform'] = 'perspective(500px) translate3d(0px, ' + Math.floor(yPos) + 'px, '+ Math.floor(getPosVal*100 - 100) + 'px)';
		// _hillhouse_next_bg.style['-webkit-transform'] = 'perspective(500px) translate3d(0px, ' + Math.floor(yPos) + 'px, '+ Math.floor(getPosVal*100 - 100) + 'px)';
		// _hillhouse_next_bg.style['-moz-transform'] = 'perspective(500px) translate3d(0px, ' + Math.floor(yPos) + 'px, '+ Math.floor(getPosVal*100 - 100) + 'px)';
		if (scrollPos > nextOffSet[2]) {
			_hillhouse_next.style.transform = 'translate3d(0px, ' + yPos + 'px, 0px) scale(' + getPosVal + ')';
			_hillhouse_next.style['-o-transform'] = 'translate3d(0px, ' + yPos + 'px, 0px) scale(' + getPosVal + ')';
			_hillhouse_next.style['-webkit-transform'] = 'translate3d(0px, ' + yPos + 'px, 0px) scale(' + getPosVal + ')';
			_hillhouse_next.style['-moz-transform'] = 'translate3d(0px, ' + yPos + 'px, 0px) scale(' + getPosVal + ')';

			_hillhouse_next_bg.style.transform = 'translate3d(0px, ' + yPos + 'px, 0px) scale(' + getPosVal + ')';
			_hillhouse_next_bg.style['-o-transform'] = 'translate3d(0px, ' + yPos + 'px, 0px) scale(' + getPosVal + ')';
			_hillhouse_next_bg.style['-webkit-transform'] = 'translate3d(0px, ' + yPos + 'px, 0px) scale(' + getPosVal + ')';
			_hillhouse_next_bg.style['-moz-transform'] = 'translate3d(0px, ' + yPos + 'px, 0px) scale(' + getPosVal + ')';
			// setTranslate(0, yPos, _hillhouse_next_bg, 0 );
		}

		// var getPosval2 =  ($('#hillBackText').find('.eq0').offset().top - scrollPos - iosheight*0.3) * -0.8;

		elementMove(currentSection);
	} else {
		// clearLooper([2]);
	}


	/*************************** 滚动事件 - 5 加声明（Instagram）部分********************************************/
	if (nextOffSet[3] - iosheight * 0.3 < scrollPos && scrollPos <= nextOffSet[4] - iosheight * 0.3 && !$body.hasClass('lock')) {
		currentSection = 3;
		// console.log('3')
		elementMove(currentSection);

		var moveSnow = (scrollPos - $doorIllust.offset().top + iosheight * 0.5);
		if (moveSnow > 413) moveSnow = 413;
		else if (moveSnow < -394) moveSnow = -394;
		// console.log(moveSnow)
		setTranslate(0, moveSnow * 0.3, _bg_x5F_snow2, 0);
		setTranslate(0, moveSnow * 0.2, _bg_x5F_snow1, 0);


		//出现在山上的人应始终在此部分中的下面的比例和位置。
		_hillhouse_next.style.transform = 'translate3d(0px, 0px, 0px) scale(1)';
		_hillhouse_next.style['-o-transform'] = 'translate3d(0px, 0px, 0px) scale(1)';
		_hillhouse_next.style['-webkit-transform'] = 'translate3d(0px, 0px, 0px) scale(1)';
		_hillhouse_next.style['-moz-transform'] = 'translate3d(0px, 0px, 0px) scale(1)';

		//
		_hillhouse_next_bg.style.transform = 'translate3d(0px, 0px, 0px)';
		_hillhouse_next_bg.style['-o-transform'] = 'translate3d(0px, 0px, 0px)';
		_hillhouse_next_bg.style['-webkit-transform'] = 'translate3d(0px, 0px, 0px)';
		_hillhouse_next_bg.style['-moz-transform'] = 'translate3d(0px, 0px, 0px)';
	} else {

	}



	/*************************** 滚动事件 - 5 兔子和人物部分 ********************************************/
	if (nextOffSet[4] - iosheight * 0.3 < scrollPos && scrollPos <= nextOffSet[5] && !$body.hasClass('lock')) {
		// console.log('4');
		currentSection = 4;
		elementMove(currentSection);
		if (!soundPlayed[3] && !isMobile && musicBuffer[3]) playSound3(musicBuffer[3], 3);
		if (sectionAnimate[4] == false || sectionAnimate[4] == undefined && !loadedOnce[4]) contactLoop();
		var howMove = (scrollPos - (nextOffSet[4] - iosheight * 1)) * 0.1;
		var setValue = (($app.width()) / 100) * (howMove * 0.3);
		if (setValue > $svgfrontleft.width() * 0.8) setValue = $svgfrontleft.width() * 0.8;
		setTranslate(setValue, 0, _svgfrontleft, 0, 0);
		setTranslate(-setValue, 0, _svgfrontright, 0, 0);
		var moveMoon7x = Math.floor((nextOffSet[4] - iosheight * 0.35 + 200 - scrollPos) * (iosheight) / (nextOffSet[5]));
		setTranslate(moveMoon7x * -2, 0, _moon7Wrap, 0, 0);


		//出现在山上的人应始终在此部分中的下面的比例和位置。
		_hillhouse_next.style.transform = 'translate3d(0px, 0px, 0px) scale(1)';
		_hillhouse_next.style['-o-transform'] = 'translate3d(0px, 0px, 0px) scale(1)';
		_hillhouse_next.style['-webkit-transform'] = 'translate3d(0px, 0px, 0px) scale(1)';
		_hillhouse_next.style['-moz-transform'] = 'translate3d(0px, 0px, 0px) scale(1)';

		//
		_hillhouse_next_bg.style.transform = 'translate3d(0px, 0px, 0px)';
		_hillhouse_next_bg.style['-o-transform'] = 'translate3d(0px, 0px, 0px)';
		_hillhouse_next_bg.style['-webkit-transform'] = 'translate3d(0px, 0px, 0px)';
		_hillhouse_next_bg.style['-moz-transform'] = 'translate3d(0px, 0px, 0px)';


	} else {
		if (soundPlayed[3] == true && !isMobile) stopSound(3);
		// clearLooper([4]);
		_moon7Wrap.style.transform = 'translate3d(0px, 0px, 0px)';
		_moon7Wrap.style['-o-transform'] = 'translate3d(0px, 0px, 0px)';
		_moon7Wrap.style['-webkit-transform'] = 'translate3d(0px, 0px, 0px)';
		_moon7Wrap.style['-moz-transform'] = 'translate3d(0px, 0px, 0px)';
	}
	//联系部分火焰动画

	/***********************************************************************/
	$fademotiontarget.each(function (index) {
		var $this = $(this);
		// fadeInMotionTargetOffset[index] = $this.offset().top;
		if (scrollPos + iosheight * 1 > fadeInMotionTargetOffset[index] &&
			scrollPos + iosheight * 0.3 <= fadeInMotionTargetOffset[index] &&
			!$this.hasClass('active')) $this.addClass('active');
	});
	//fademotiontarget

	if (currentSection == 0 && !$mainnavBtnNav.eq(0).hasClass('active')) {
		//intro
		$mainnavBtnNav.eq(0).addClass('active').siblings().removeClass('active');

	} else if (currentSection == 1 && !$mainnavBtnNav.eq(1).hasClass('active')) {
		//skills
		$mainnavBtnNav.eq(1).addClass('active').siblings().removeClass('active');

	} else if ((currentSection == 5 || currentSection == 2) && !$mainnavBtnNav.eq(2).hasClass('active')) {
		//about
		$mainnavBtnNav.eq(2).addClass('active').siblings().removeClass('active');

		// }else if(currentSection == 2&& !$mainnavBtnNav.eq(3).hasClass('active')){
		//       //blog
		//       $mainnavBtnNav.eq(3).addClass('active').siblings().removeClass('active');
	} else if (currentSection == 3 && !$mainnavBtnNav.eq(3).hasClass('active')) {
		//project
		$mainnavBtnNav.eq(3).addClass('active').siblings().removeClass('active');
	} else if (currentSection == 4 && !$mainnavBtnNav.eq(4).hasClass('active')) {
		//contact
		$mainnavBtnNav.eq(4).addClass('active').siblings().removeClass('active');
	}

	// runsoundData();  no
}
//fn scrollAction
// var xBeta = 0;

function handleOrientation(event) {
	if (gammaAble) {
		deviceGamma = event.gamma;
		deviceGamma += 90;
		xGamma = Math.sin((Math.PI / 90) * (deviceGamma - 90)) * 50;
		// deviceBeta = event.beta;
		// deviceBeta += 90;
		// xBeta= Math.sin((Math.PI/90)*(deviceBeta-90))*50;
		xBeta = 0;
	} else {
		deviceGamma = event.pageX;
		deviceBeta = event.pageY;
		xGamma = ((deviceGamma / $app.width() * 0.5) - 0.25) * 100;
		xBeta = ((deviceBeta / iosheight * 0.5) - 0.25) * 100;
	}

	if (currentSection == 0) {
		// var tween1 = TweenLite.to('.moon-1', 0.2, {
		//       x: xGamma*-0.2});
		setTranslate(xGamma * -0.1, xBeta * 0.1, _moon1, 0, 0);
		setTranslate(xGamma * 0.4, 0, _moon2Or, 0, 0);
	} else if (currentSection == 1) {
		// var tween1 = TweenLite.to('#moon-2Or ', 0.5, {
		//       x: xGamma});
		// setTranslate( 0, 0, document.querySelector('.rotate'), 6+xGamma * -0.1, 0);
		setTranslate(xGamma * 0.4, 0, _moon2Or, 0, 0);
	} else if (currentSection == 5) {
		// var tween1 = TweenLite.to('#flyme_men', 0.6, {
		//       ease: Sine.easeOut,
		//       x: xGamma * -0.7});
		setTranslate(xGamma * -0.5, 0, _flymen, 0, 0);
	} else if (currentSection == 2) {
		// var tween1 = TweenLite.to(['#hillhouse', '#smoke'], 0.5, {
		//       x: xGamma*0.4});
		setTranslate(xGamma * 0.4, 0, _hillhouse, 0, 0);
		setTranslate(xGamma * 0.4, 0, _smoke, 0, 0);

		$('.hillbackground.eq1').css({
			'background-position': -xGamma * 0.5 + 'px 0'
		});
	} else if (currentSection == 4) {

		// var tween1 = TweenLite.to(['.men', '.fire'], 0.5, {
		//       x: xGamma*0.4
		// });
		setTranslate(xGamma * 0.4, 0, _men, 0, 0);
		setTranslate(xGamma * 0.4, 0, _fire, 0, 0);
		setTranslate(xGamma * -0.2, 0, _moon7, 0, 0);

		// var tween2 = TweenLite.to('.moon-7', 0.5, {
		//       x: xGamma* -0.2
		// });
	} else if (currentSection == 3) {
		// var tween1 = TweenLite.to('.instagramWrap', 0.5, {
		//       x: xGamma*0.4
		// });
		setTranslate(xGamma * 0.4, xBeta * 0.1, _instagramWrap, 0, 0);
		setTranslate(xGamma * -0.2, 0, _doorillustSvg, 0, 0);

		// var tween2 = TweenLite.to('#doorIllust > svg', 0.5, {
		//       x: xGamma*-0.2
		// });
	} else {
		//do something here
	}
}
