<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:328px;top:502px;"/>  
  <!-- Nav tabs -->  
  <div class="progress" component="$UI/system/components/bootstrap/progress/progress"> 
    <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20"
      aria-valuemin="0" aria-valuemax="100" style="width: 20%"> 
      <span class="sr-only">20%</span> 
    </div> 
  </div>  
  <div class="progress" component="$UI/system/components/bootstrap/progress/progress"> 
    <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60"
      aria-valuemin="0" aria-valuemax="100" style="width: 60%"> 
      <span class="sr-only">60%</span> 
    </div> 
  </div>  
  <div class="progress" component="$UI/system/components/bootstrap/progress/progress"> 
    <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80"
      aria-valuemin="0" aria-valuemax="100" style="width: 80%"> 
      <span>80%</span> 
    </div> 
  </div>  
  <div class="progress" component="$UI/system/components/bootstrap/progress/progress"
    xid="progress1" style="width:562px;" valuenow="50" onRender="progress1Render"> 
    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40"
      aria-valuemin="0" aria-valuemax="100" style="width: 40%" xid="div2"> 
      <span class="sr-only" xid="span1">40%</span>
    </div> 
  </div> 
</div>
