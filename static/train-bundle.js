(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const map = {
	jacks_1: [
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h13m34s147.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h13m59s433.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h14m19s070.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h14m21s810.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h14m25s727.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h15m01s226.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h15m15s492.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h15m30s015.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h15m44s208.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h15m47s340.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h19m38s550.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h19m44s982.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h19m54s486.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h20m05s170.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h20m30s336.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h20m47s282.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h30m52s586.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h31m06s160.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h31m07s668.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h31m08s764.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h31m09s917.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h31m27s872.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h31m32s500.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h31m37s424.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h31m43s376.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h31m49s625.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h31m54s980.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h31m59s995.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h32m04s319.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h32m08s677.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h41m01s287.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h41m13s158.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h41m22s552.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h41m30s528.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h41m38s204.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h41m43s517.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h42m11s419.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h42m20s095.png',
		'datasets\\jacks\\jacks-1\\vlcsnap-2022-05-05-20h42m33s118.png'
	],
	jacks_2: [
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h13m47s629.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h14m07s526.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h14m11s030.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h15m08s435.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h15m23s313.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h15m24s935.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h15m38s398.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h19m33s414.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h19m42s408.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h19m50s674.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h20m24s866.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h20m33s645.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h20m44s958.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h20m51s001.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h30m57s983.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h31m00s345.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h31m01s819.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h31m15s297.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h31m16s507.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h31m17s608.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h31m18s565.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h31m22s405.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h31m25s089.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h31m30s101.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h31m35s311.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h31m41s227.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h31m45s879.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h31m52s573.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h31m57s648.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h32m02s266.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h32m06s328.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h40m55s519.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h41m07s412.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h41m18s211.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h41m26s835.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h41m34s725.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h41m40s662.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h42m03s053.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h42m16s326.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h42m22s403.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h42m29s749.png',
		'datasets\\jacks\\jacks-2\\vlcsnap-2022-05-05-20h42m36s397.png'
	],
	lunges_1: [
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h18m56s920.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h19m27s911.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h19m53s836.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h20m46s407.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h20m48s781.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h22m24s521.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h22m26s864.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h24m56s423.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h26m22s549.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h26m29s117.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h28m08s527.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h28m10s490.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h29m55s539.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h05m32s414.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h05m40s954.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h05m47s840.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h05m53s844.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h05m59s979.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h06m06s452.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h06m17s671.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h06m24s502.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h06m30s931.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h06m38s566.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h06m44s874.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h06m51s346.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h08m53s112.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h09m19s913.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h09m31s810.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h16m06s937.png',		
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h29m58s365.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h30m11s602.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h30m24s806.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h30m50s087.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h30m52s486.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h31m07s726.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h31m23s171.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h31m31s810.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h31m41s559.png',
		'datasets\\lunges\\lunges-1\\vlcsnap-2022-05-05-21h31m56s325.png'
	],
	lunges_2: [
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h20m28s662.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h20m53s017.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h20m54s504.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h20m55s791.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h20m58s038.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h20m59s410.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h21m15s179.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h21m17s642.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h21m21s827.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h21m37s767.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h21m39s189.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h21m40s423.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h21m47s422.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h21m48s350.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h21m49s349.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h05m37s230.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h05m44s364.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h05m50s659.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h05m56s721.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h06m03s251.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h06m21s508.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h06m27s801.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h06m34s468.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h06m41s622.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h06m48s127.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h06m58s812.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h07m07s470.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h07m14s363.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h07m23s821.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h07m30s367.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h08m09s852.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h08m17s848.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h08m34s983.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h08m43s619.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h08m55s800.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h09m07s116.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h09m22s384.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h09m38s130.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h15m20s812.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h15m24s658.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h15m51s085.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h15m55s694.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h15m57s834.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h16m36s508.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h16m47s003.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h16m49s828.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h21m51s185.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h22m31s106.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h22m32s067.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h23m53s908.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h23m55s010.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h23m56s112.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h24m05s120.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h24m12s404.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h24m14s481.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h24m41s448.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h25m00s220.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h25m01s487.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h25m02s501.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h25m04s068.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h25m49s018.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h25m50s649.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h26m32s758.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h26m35s489.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h27m27s925.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h27m33s326.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h27m36s036.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h27m41s985.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h27m44s992.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h27m47s885.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h27m51s204.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h27m53s513.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h27m55s351.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h27m57s201.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h27m59s735.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h29m41s123.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h30m00s711.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h30m15s709.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h30m26s913.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h30m55s962.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h31m12s415.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h31m25s959.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h31m33s792.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h31m45s427.png',
		'datasets\\lunges\\lunges-2\\vlcsnap-2022-05-05-21h31m58s643.png'
	],
	squats_1: [
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-21h54m50s844.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-21h56m12s457.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-21h56m15s071.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-21h56m23s061.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-21h56m26s344.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-21h58m31s442.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h00m00s422.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h00m06s144.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h00m12s893.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h02m48s428.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h02m52s595.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h03m04s614.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h04m06s678.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h06m06s393.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h06m37s163.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h06m40s479.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h06m49s185.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h07m12s557.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h07m18s860.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h07m38s855.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h08m16s096.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h08m18s183.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h08m26s208.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h08m29s426.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h08m35s538.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h08m37s566.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h08m39s777.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h08m44s703.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h08m46s622.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h08m48s913.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h08m53s769.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h08m55s804.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h09m10s961.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h09m39s923.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h09m46s490.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h09m48s921.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h09m51s319.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h09m56s792.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h09m59s096.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h10m02s169.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h10m07s156.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h10m10s343.png',
		'datasets\\squats\\squats-1\\vlcsnap-2022-05-05-22h10m15s904.png'
	],
	squats_2: [
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h55m06s133.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h55m35s837.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h55m38s484.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h55m40s376.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h55m43s044.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h55m44s874.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h55m46s934.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h55m54s920.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h55m59s597.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h56m06s443.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h56m07s974.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h56m08s978.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h56m17s962.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h56m20s400.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h57m51s111.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h57m53s972.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h58m02s069.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h58m27s592.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h58m53s123.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h58m54s476.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h58m58s851.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h59m11s739.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h59m26s852.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h59m28s499.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-21h59m51s720.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h00m09s950.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h00m18s124.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h00m24s540.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h00m26s069.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h00m31s943.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h00m34s664.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h00m38s057.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h00m48s783.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h01m10s710.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h02m57s200.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h02m59s277.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h03m10s988.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h03m58s342.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h04m00s724.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h04m03s770.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h06m00s263.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h06m12s670.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h06m19s803.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h06m45s622.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h06m55s248.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h07m15s081.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h07m35s751.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h08m09s275.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h08m12s282.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h08m22s632.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h08m32s240.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h08m42s191.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h08m51s375.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h08m58s295.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h09m00s622.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h09m13s394.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h09m43s224.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h09m54s259.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h10m04s708.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h10m12s978.png',
		'datasets\\squats\\squats-2\\vlcsnap-2022-05-05-22h10m19s646.png'
	]
}

module.exports = map;
},{}],2:[function(require,module,exports){
let instance = null;

class PoseEstimator {
	constructor(options={}) {
		if (instance) {
			throw new Error('only one object can be created.');
		}
		
		this.onModelReady = this.onModelReady.bind(this);
		this.getKeypoints = this.getKeypoints.bind(this);

		this.modelReady = false;
		this.net = ml5.poseNet(options, this.onModelReady);				
	}

	onModelReady(err, model) {
		this.modelReady = true;
	}

	getKeypoints(input) {
		const inst = this;

		return new Promise(function(resolve, reject) {
			
			if (!inst.modelReady) {
				reject(new Error('Model is not ready yet !'))
			}			
			inst.net.singlePose(input, resolve)	
		})
	}

	getInstance() {
		return this;
	}
}

const posenet = new PoseEstimator({
	detectionType: 'single',
	architecture: 'ResNet50'
});

instance = posenet;

module.exports = instance;
},{}],3:[function(require,module,exports){
const posenet = require('./helpers/pose-estimator');
const directories = require('./helpers/dataset_map');

const height = 400, width = 400;
const wrapper = document.getElementById('cnv-wrapper');

const labels = Object.keys(directories);

const dataset = [];

/*****************
OUTPUT FILE FORMAT

[
	{
		inputs: [23.34, 34.23, ... 23.24] | AN ARRAY OF 34 FLOATING POINT NUMBERS
		output: {
			label: 'EXERCISELABEL_EXERCISESTAGE'
		}
	},
	...
]
****************/

let label_index = 0;
let image_index = 0;

async function handleImageLoaded(img) {
	img.resize(400, 400);

	const poses = await posenet.getKeypoints(img);	
	const inputs = getKeypointsAsArray(poses[0].pose);	
	const output = {
		label: labels[label_index]
	}
	dataset.push({
		inputs,
		output
	});
	// drawKeyPoints(poses[0], 'red');
	// drawSkeleton(poses[0], 'green');
	image_index = image_index + 1;
}

function cleanup(save) {
	console.log('cleaning up...');
	save({
		dataset
	}, `${Date.now()}.json`)
}

window.setup = function setup() {
	const cnv = createCanvas(height, width);
	cnv.parent(wrapper);
	background(0);

	frameRate(1);
}

window.draw = function draw() {
	// noLoop()
	if (posenet.modelReady) {
		// creating a file with format mentioned above		

		if (label_index >= labels.length) {
			cleanup(save);
			noLoop();
			return;
		}

		const label = labels[label_index];

		console.log('Training on', label);

		if (image_index >= directories[label].length) {
		// if (image_index >= 5) {
			label_index = label_index + 1;
			image_index = 0;
			return;
		}		
		// background(0);
		loadImage(directories[label][image_index], handleImageLoaded);
	}
}

/********************
 HELPERS
 *******************/
function drawPointWithColor(x, y, size, fillColor='red', strokeColor=255) {
	stroke(strokeColor);
	fill(fillColor);
	circle(x, y, size);
}

function drawLineWithColor(x1, y1, x2, y2, strokeColor=255) {
	stroke(strokeColor);
  line(x1, y1, x2, y2);
}

function drawKeyPoints(p, color) {
	const pose = p.pose;

	for (let i = 0; i < pose.keypoints.length; i ++) {
		const keypoint = pose.keypoints[i];
		if (keypoint.score > 0.5) {
			drawPointWithColor(keypoint.position.x, keypoint.position.y, 10, color);
		}
	}

}

function drawSkeleton(p, color) {
  let skeleton = p.skeleton;
  // For every skeleton, loop through all body connections
  for (let j = 0; j < skeleton.length; j++) {
    let partA = skeleton[j][0];
    let partB = skeleton[j][1];
 		// drawLineWithColor(partA.position.x, partA.position.y, partB.position.x, partB.position.y, color)   
  	drawLineWithColor(partA.position.x, partA.position.y, partB.position.x, partB.position.y, 'red')   
  }
}

function getKeypointsAsArray(pose) {
	const inputs = [];

	for (let i = 0; i < pose.keypoints.length; i++) {
    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;
    inputs.push(x);
    inputs.push(y);
  }

  return inputs;
}
},{"./helpers/dataset_map":1,"./helpers/pose-estimator":2}]},{},[3]);
