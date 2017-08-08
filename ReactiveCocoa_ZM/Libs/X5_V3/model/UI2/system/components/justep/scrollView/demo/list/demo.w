<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" class="window" component="$UI/system/components/justep/window/window"
  style="width: 100%; height: 100%;">  
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowDialog"
    src="$UI/system/components/justep/common/demo/dialog.w"/>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="scrollView组件"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="backBtn"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div3">scrollView组件</div>  
        <div class="x-titlebar-right reverse" xid="div5"/> 
      </div> 
    </div>  
    <div class="x-panel-content x-scroll-view" xid="content1"> 
      <h3>scrollView 
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="源码" xid="button3" onClick="showScrollSource" bind-visible="isVisible"> 
          <i xid="i2"/>  
          <span xid="span2">源码</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-link"
          label="js" xid="button4" onClick="showJsSource"> 
          <i xid="i3"/>  
          <span xid="span3">js</span> 
        </a> 
      </h3>  
      <div style="font-weight:bold;font-size:14px;color:#000000">scrollView</div>  
      <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
        supportPullDown="false" supportPullUp="false" hScroll="false" vScroll="true"
        hScrollbar="false" vScrollbar="true" bounce="true" noMoreLoadLabel="已经到111111最后..." xid="demoScrollView"> 
        <div class="x-scroll-content"> 
          <div component="$UI/system/components/justep/model/model" xid="model"
            style="top:5px;height:auto;left:401px;"> 
            <div component="$UI/system/components/justep/data/bizData" xid="bizData"
              autoLoad="true" concept="DEMO_TABLE1" columns="fString,fInteger,fFloat,fDecimal,fDate,fDateTime,fTime,fText,version"
              limit="5"> 
              <reader action="/demo/components/logic/action/queryDEMO_TABLE1Action"/>  
              <writer action="/demo/components/logic/action/saveDEMO_TABLE1Action"/>  
              <creator action="/demo/components/logic/action/createDEMO_TABLE1Action"/> 
            </div> 
          </div>  
          <a component="$UI/system/components/justep/button/button" class="btn btn-info"
            label="更多..." xid="button2" onClick="loadMore"> 
            <i/>  
            <span>更多...</span> 
          </a>  
          <div> 
            <div style="margin: 10px;">List 普通：</div>  
            <div xid="list1" class="x-list" component="$UI/system/components/justep/list/list"
              data="bizData" limit="2"> 
              <div class="x-list-head"> 
                <div style="margin: 5px;">这是普通的一个list</div> 
              </div>  
              <div class="x-list-content x-scroll-view"> 
                <div component="$UI/system/components/justep/scrollView/scrollView"
                  xid="refresh1" supportPullDown="true" supportPullUp="true" hScroll="false"
                  vScroll="true" hScrollbar="false" vScrollbar="true" bounce="true"
                  onScrollMove="refresh1ScrollMove" onScrollEnd="refresh1ScrollEnd"
                  onPullUp="refresh1InfiniteLoad" class="x-scroll"> 
                  <div class="x-content-center x-pull-down container"> 
                    <i class="x-pull-down-img glyphicon x-icon-pull-down"/>  
                    <span class="x-pull-down-label">下拉刷新...</span> 
                  </div>  
                  <div class="x-scroll-content" xid="div2"> 
                    <ul class="x-list-template"> 
                      <li bind-css="{ curRow: $model.bizData.currentRow.get() == $object }"> 
                        <div component="$UI/system/components/justep/labelEdit/labelEdit"
                          class="x-label-edit"> 
                          <label class="x-label x-center" bind-text="label('fString')"/>  
                          <input component="$UI/system/components/justep/input/input"
                            placeHolder="请输入字符串" xid="input1-1" class="form-control x-edit"
                            data="bizData" bind-ref="ref('fString')"/> 
                        </div> 
                      </li> 
                    </ul> 
                  </div>  
                  <div class="x-content-center x-pull-up" xid="div4"> 
                    <span class="x-pull-up-label">滚动...</span> 
                  </div> 
                </div> 
              </div> 
            </div>  
            <div style="margin: 10px;">list 菜单：</div>  
            <div xid="list2" class="x-list" component="$UI/system/components/justep/list/list"
              data="bizData" limit="2" _filter="js:100&lt;val('fInteger')"> 
              <div class="x-list-head"> 
                <div class="head"/> 
              </div>  
              <div class="x-list-content x-scroll-view"> 
                <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
                  xid="refresh2" supportPullUp="true" supportDown="true" hScroll="false"
                  vScroll="true" hScrollbar="false" vScrollbar="true" bounce="true"
                  pullUpLabel="滚动可以看到更多美食哦..." pullUpMoveLabel="释放获得美食..." pullUpLoadingLabel="一大波美食接近中..."> 
                  <div class="x-content-center x-pull-down container"> 
                    <i class="x-pull-down-img glyphicon x-icon-pull-down"/>  
                    <span class="x-pull-down-label">下拉刷新...</span> 
                  </div>  
                  <div class="x-scroll-content" xid="div2"> 
                    <ul class="x-list-template"> 
                      <li> 
                        <div class="km-group-title"> 
                          <h2 data-bind="text:ref('fString')"/> 
                        </div>  
                        <div class="km-listview"> 
                          <img class="item-photo" src="img/california-rolls.jpg"/>  
                          <h3 class="item-title" data-bind="text:$model.bizData.label('fString')"/>  
                          <p class="item-info" data-bind="text:ref('fText')"/>  
                          <a component="$UI/system/components/justep/button/button"
                            label="点菜" class="xui-button details-link"/> 
                        </div> 
                      </li> 
                    </ul> 
                  </div>  
                  <div class="x-content-center x-pull-up" xid="div4"> 
                    <span class="x-pull-up-label">滚动可以看到更多美食哦...</span> 
                  </div> 
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"/> 
  </div> 
</div>
