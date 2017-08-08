<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">
	<div class="panel panel-primary cordova-testunit">
		<div class="panel-heading cordova-testunit">
			<div class="panel-title text-center">
				<span style="position: absolute;left: 5px;" data-bind="click:backHome">
					<i xid="i1" class="glyphicon glyphicon-chevron-left"></i>
				</span>
				<span>Capture</span>
			</div>
		</div>
		<div class="panel-content"></div>
	</div>

	<div id="info" style="white-space: pre-wrap">
		<b>Status:</b>
		<div id="camera_status"></div>
		img:
		<img width="100" id="camera_image" />
		video:
		<div id="video_container"></div>
	</div>

	<h2>Cordova Capture API</h2>
	<div id="image-options"></div>

	<h2>Actions</h2>
	<div class="btn btn-default btn-default getAudio">Capture 10 secs of audio and play</div>
	<div class="btn btn-default btn-default getImage">Capture 1 image</div>
	<div class="btn btn-default btn-default getVideo">Capture 10 secs of video</div>
	<div class="btn btn-default btn-default resolveVideo">Capture 5 secs of video and resolve</div>
	<h2>
	</h2>
</div>
