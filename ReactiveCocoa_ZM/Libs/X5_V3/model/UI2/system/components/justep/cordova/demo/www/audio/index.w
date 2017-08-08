<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window">
  <div class="panel panel-primary cordova-testunit">
    <div class="panel-heading cordova-testunit">
      <div class="panel-title text-center">
        <span style="position: absolute;left: 5px;" data-bind="click:backHome">
          <i xid="i1" class="glyphicon glyphicon-chevron-left"/>
        </span>
        <span>Audio</span>
      </div>
    </div>
    <div class="panel-content"/>
  </div>  
  <div id="info"> 
    <table class="table" width="100%"> 
      <tr>
        <td>
          <b>Status:</b>
        </td>
        <td id="audio_status"></td>
      </tr>  
      <tr>
        <td>
          <b>Duration:</b>
        </td>
        <td id="audio_duration"/>
      </tr>  
      <tr>
        <td>
          <b>Position:</b>
        </td>
        <td id="audio_position"/>
      </tr> 
    </table> 
  </div>  
  <h2>Action</h2>  
  <table class="table" style="width:80%;"> 
    <tr> 
      <th colspan="3">Play Sample Audio</th> 
    </tr>  
    <tr> 
      <td>
        <div class="btn btn-default wide playAudio">Play</div>
      </td>  
      <td>
        <div class="btn btn-default wide pauseAudio">Pause</div>
      </td> 
    </tr>  
    <tr> 
      <td>
        <div class="btn btn-default wide stopAudio">Stop</div>
      </td>  
      <td>
        <div class="btn btn-default wide releaseAudio">Release</div>
      </td> 
    </tr> 
  </table>  
  <table class="table" style="width:80%;"> 
    <tr> 
      <td>
        <div class="btn btn-default wide seekAudioBy">Seek By</div>
      </td>  
      <td>
        <div class="btn btn-default wide seekAudioTo">Seek To</div>
      </td>  
      <td> 
        <div> 
          <input class="input numeric" type="number" id="seekinput" value="in seconds"/> 
        </div> 
      </td> 
    </tr> 
  </table>  
  <table class="table" style="width:80%;"> 
    <tr> 
      <th colspan="3">
        <br/>
        <br/>Record Audio
      </th> 
    </tr>  
    <tr> 
      <td colspan="3">
        <div class="btn btn-default wide recordAudio">Record Audio for 10 sec</div>
      </td> 
    </tr>  
    <tr> 
      <td>
        <div class="btn btn-default wide playRecording">Play</div>
      </td>  
      <td>
        <div class="btn btn-default wide pauseAudio">Pause</div>
      </td>  
      <td>
        <div class="btn btn-default wide stopAudio">Stop</div>
      </td> 
    </tr> 
  </table>  
  <h2></h2> 
</div>
