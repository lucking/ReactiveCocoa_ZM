<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:623px;top:263px;"/>  
  <!-- Nav tabs -->  
  <div class="bs-docs-section">
  <h1 id="labels" class="page-header">标签</h1>

  <h3>实例</h3>
  <div class="bs-example">
    <h1>Example heading <span class="label label-default">New</span></h1>
    <h2>Example heading <span class="label label-default">New</span></h2>
    <h3>Example heading <span class="label label-default">New</span></h3>
    <h4>Example heading <span class="label label-default">New</span></h4>
    <h5>Example heading <span class="label label-default">New</span></h5>
    <h6>Example heading <span class="label label-default">New</span></h6>
  </div>
<div class="zero-clipboard"></div><div class="highlight"><pre><code class="html"><span class="nt">&lt;h3&gt;</span>Example heading <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"label label-default"</span><span class="nt">&gt;</span>New<span class="nt">&lt;/span&gt;&lt;/h3&gt;</span>
</code></pre></div>

  <h3>可用的变体</h3>
  <p>用下面的任何一个类即可改变标签的外观。</p>
  <div class="bs-example">
    <span class="label label-default">Default</span>
    <span class="label label-primary">Primary</span>
    <span class="label label-success">Success</span>
    <span class="label label-info">Info</span>
    <span class="label label-warning">Warning</span>
    <span class="label label-danger">Danger</span>
  </div>
<div class="zero-clipboard"></div><div class="highlight"><pre><code class="html"><span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"label label-default"</span><span class="nt">&gt;</span>Default<span class="nt">&lt;/span&gt;</span>
<span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"label label-primary"</span><span class="nt">&gt;</span>Primary<span class="nt">&lt;/span&gt;</span>
<span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"label label-success"</span><span class="nt">&gt;</span>Success<span class="nt">&lt;/span&gt;</span>
<span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"label label-info"</span><span class="nt">&gt;</span>Info<span class="nt">&lt;/span&gt;</span>
<span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"label label-warning"</span><span class="nt">&gt;</span>Warning<span class="nt">&lt;/span&gt;</span>
<span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"label label-danger"</span><span class="nt">&gt;</span>Danger<span class="nt">&lt;/span&gt;</span>
</code></pre></div>

  <div class="bs-callout bs-callout-info">
    <h4>如果标签数量很多怎么办？</h4>
    <p>如果你有大量的设置为 <code>inline</code> 属性的标签全部放在一个较窄的容器元素内，在页面上展示这些标签就会出现问题，每个标签就会有自己的一个 <code>inline-block</code> 元素（就像图标一样）。解决的办法是为每个标签都设置为 <code>display: inline-block;</code> 属性。关于这个问题以及实例，请参考 <a href="https://github.com/twbs/bootstrap/issues/13219">#13219</a> 。</p>
  </div>
</div>
</div>
