<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model"/>  
<nav class="navbar navbar-default" role="navigation">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Brand</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu" role="menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li class="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li class="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-left" role="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search"></input>
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu" role="menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
  <div component="$UI/system/components/bootstrap/carousel/carousel" class="x-carousel carousel"
    xid="carousel1"> 
    <ol class="carousel-indicators" xid="default1"> 
    </ol>  
    <div class="x-contents carousel-inner" role="listbox" component="$UI/system/components/justep/contents/contents"
      active="0" slidable="true" wrap="true" swipe="true" xid="contents1" style="height:300px;"> 
      <div class="x-contents-content" xid="content1">
      	<img src="./images/p1.jpg" class="image-wall"/>
      </div>
      <div class="x-contents-content" xid="content2">
      	<img src="./images/p2.jpg" class="image-wall"/>
      </div>
      <div class="x-contents-content" xid="content3">
      	<img src="./images/p3.jpg" class="image-wall"/>
      </div>
      <div class="x-contents-content" xid="content4">
      	<img src="./images/p4.jpg" class="image-wall"/>
      </div>
    </div>  
    <a class="left carousel-control" href="javascript:void(0)" role="button" xid="a1"> 
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true" xid="span1"/>  
      <span class="sr-only" xid="span2">Previous</span>
    </a>  
    <a class="right carousel-control" href="javascript:void(0)" role="button" xid="a2"> 
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true" xid="span3"/>  
      <span class="sr-only" xid="span4">Next</span>
    </a> 
  </div>
<a component="$UI/system/components/justep/button/button" class="btn btn-default" label="next" xid="button1" onClick='{"operation":"carousel1.next"}'>
   <i xid="i1"></i>
   <span xid="span5">next</span></a></div>
