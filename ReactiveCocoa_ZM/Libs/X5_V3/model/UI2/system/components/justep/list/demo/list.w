<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:472px;top:72px;"> 
    <div component="$UI/system/components/justep/data/bizData" xid="orgData"
      concept="SA_OPPerson" limit="12" autoLoad="false"> 
      <reader xid="default4" action="/SA/OPM/logic/action/queryOPPersonAction"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" xid="newsData"
      idColumn="fID" autoLoad="true"> 
      <column label="ID" name="fID" type="String" xid="default1"/>  
      <column label="图片" name="fImage" type="String" xid="default2"/>  
      <column label="标题" name="fTitle" type="String" xid="default3"/>  
      <column label="内容" name="fContent" type="String" xid="default5"/>  
      <data xid="default10">[{"fID":"1","fImage":"./img/0.jpg","fTitle":"台媒猜测大陆测试歼20引擎","fContent":"两型新引擎高原测试，台媒猜测含歼20的国产动力涡扇15。"},{"fID":"2","fImage":"./img/1.jpg","fTitle":"普京称俄军2天击垮东欧5国","fContent":"普京称俄军有能力两天占领东欧五国首度，引起东欧国家紧张。"},{"fID":"3","fImage":"./img/2.jpg","fTitle":"俄出动十万军队在远东演习","fContent":"俄军开始东方2014演习，1500辆坦克70艘军舰参演。"},{"fID":"4","fImage":"./img/3.jpg","fTitle":"埃及狂购35亿美元俄制武器","fContent":"俄媒称订单中含战斗机、潜艇、中远程防空导弹等多种武器。"},{"fID":"5","fImage":"./img/4.jpg","fTitle":"日本拟动用自卫队保护核电站","fContent":"有分析称核电站面临安全威胁只是安倍突破自卫队限制的借口。"},{"fID":"6","fImage":"./img/5.jpg","fTitle":"美中校向华裔女友泄密获刑7年","fContent":"泄漏的文件包括文件包括美军事防御计划大纲，美军亚太部署。"},{"fID":"7","fImage":"./img/6.jpg","fTitle":"中俄联盟？俄军演先知会中国","fContent":"北京获悉俄远东军演消息早于俄官兵，俄媒称此确认中俄结盟。"},{"fID":"8","fImage":"./img/7.jpg","fTitle":"俄称4年造出世界最大无人机","fContent":"俄罗斯表示计划2018年试飞重达20吨的无人作战飞机。"},{"fID":"9","fImage":"./img/8.jpg","fTitle":"海军练远程空战余油险不够回","fContent":"东海舰队三代机部队千余公里外空战，落地时油表接近归零。"},{"fID":"10","fImage":"./img/9.jpg","fTitle":"美称中国装备新款反航母导弹","fContent":"美专家称中国东风25飞得更快更难拦截，可能曾推销给沙特。"},{"fID":"11","fImage":"./img/10.jpg","fTitle":"中国城市战型火箭筒亮相南非","fContent":"简氏称DZJ08特意减小杀伤半径，防止在巷战中伤及..."},{"fID":"12","fImage":"./img/11.jpg","fTitle":"基地组织错将巴军舰当美航母","fContent":"基地组织日前袭击巴军港，原想袭美航母，却不知其早已..."},{"fID":"13","fImage":"./img/12.jpg","fTitle":"美媒称翼龙无人机中东销路好","fContent":"外媒称翼龙比CH4性能好，解放军无人机团或配多达1..."},{"fID":"14","fImage":"./img/13.jpg","fTitle":"大校：光靠嘴炮挡不住美潜艇","fContent":"陈虎表示靠嘴批美潜艇抵近中国毫无意义，须能发现其踪..."}]</data>
    </div> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar"
        xid="titleBar1" title="list"> 
        <div class="x-titlebar-left" xid="div1"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link"
            xid="button1" icon="icon-chevron-left" onClick="closeWin"> 
            <i xid="i1" class="icon-chevron-left"/>  
            <span xid="span1"/> 
          </a> 
        </div>  
        <div class="x-titlebar-title" xid="div2">list</div>  
        <div class="x-titlebar-right reverse" xid="div3"> 
          <a component="$UI/system/components/justep/button/button" class="btn btn-link btn-only-icon"
            xid="button3" icon="icon-android-note" onClick="showListSource" bind-visible="isVisible"> 
            <i xid="i3" class="icon-android-note"/>  
            <span xid="span5"/> 
          </a> 
        </div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
        active="0" xid="contents"> 
        <div class="x-contents-content x-flex x-flex-column" xid="newsContent"> 
          <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
            xid="demoList"> 
            <div class="x-content-center x-pull-down container" xid="div4"> 
              <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i7"/>  
              <span class="x-pull-down-label" xid="span6">下拉刷新...</span> 
            </div>  
            <div class="x-scroll-content" xid="div7"> 
              <div xid="newsList" class="x-list" component="$UI/system/components/justep/list/list"
                data="newsData" limit="8"> 
                <ul class="x-list-template" style="padding-top:6px;"> 
                  <li class="media" style="padding-left:6px; padding-right:6px;"> 
                    <div class="x-blob x-blob-radius pull-left media-object x-news-image"> 
                      <img class="x-blob-img x-autofill" bind-attr-src="$model.getImageUrl($object)"/> 
                    </div>  
                    <div class="media-body"> 
                      <h4 class="media-heading" bind-text="ref('fTitle')"/>  
                      <div bind-text="ref('fContent')"/> 
                    </div> 
                  </li> 
                </ul> 
              </div> 
            </div>  
            <div class="x-content-center x-pull-up" xid="div8"> 
              <span class="x-pull-up-label" xid="span7">加载更多...</span> 
            </div> 
          </div> 
        </div>  
        <div class="x-contents-content x-flex x-flex-column" xid="orgImgContent"> 
          <div xid="orgList" class="x-list x-inner-scroll x-flex1" component="$UI/system/components/justep/list/list"
            data="orgData" disablePullToRefresh="true" disableInfiniteLoad="true"> 
            <ul class="x-list-template" xid="listTemplateUl1"> 
              <li xid="li1"> 
                <div align="center" style="float: left;margin: 6px;" xid="div5"> 
                  <div class="x-blob" component="$UI/system/components/justep/blob/blobImage"
                    bind-ref="ref('sPhoto')" blobConcept="SA_OPPerson" blobRelation="sPhoto"
                    blobLastModifiedRelation="sPhotoLastModified" limitSize="1m" style="height:128px;width:128px;"
                    xid="blobImage1"> 
                    <div class="x-blob-bar" xid="div6"> 
                      <i class="x-blob-edit icon-compose" xid="i2"/>  
                      <i class="x-blob-del icon-close-round" xid="i6"/> 
                    </div>  
                    <img class="x-blob-img x-autofill img-thumbnail" xid="image1"/> 
                  </div>  
                  <span bind-text="ref('sName')" xid="span2"/> 
                </div> 
              </li> 
            </ul> 
          </div> 
        </div> 
      </div> 
    </div>  
    <span component="$UI/system/components/justep/windowDialog/windowDialog"
      xid="windowDialog" src="$UI/system/components/justep/common/demo/dialog.w" style="left:375px;top:287px;"/>  
    <div class="x-panel-bottom" xid="bottom1"> 
      <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group btn-group-justified"
        tabbed="true" xid="buttonGroup1" style="height:48px;"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="新闻列表" xid="button4" target="newsContent"> 
          <i xid="i4"/>  
          <span xid="span3">新闻列表</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default"
          label="照片墙" xid="button5" target="orgImgContent"> 
          <i xid="i5"/>  
          <span xid="span4">照片墙</span> 
        </a> 
      </div> 
    </div> 
  </div> 
</div>
