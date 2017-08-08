<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:641px;top:209px;"/>  
  <!-- Nav tabs -->  
  
  <div class="bs-docs-section">
  <h1 id="badges" class="page-header">徽章</h1>

  <p class="lead">给链接、导航等元素嵌套 <code>&lt;span class="badge"&gt;</code> 元素，可以很醒目的展示新的或未读的信息条目。</p>

  <div class="bs-example">
    <a href="#">Inbox <span class="badge">42</span></a>
    <br><br>
    <button class="btn btn-primary" type="button">
      Messages <span class="badge">4</span>
    </button>
  </br></br>
  </div>
<div class="zero-clipboard"></div><div class="highlight"><pre><code class="html"><span class="nt">&lt;a</span> <span class="na">href=</span><span class="s">"#"</span><span class="nt">&gt;</span>Inbox <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"badge"</span><span class="nt">&gt;</span>42<span class="nt">&lt;/span&gt;&lt;/a&gt;</span>

<span class="nt">&lt;button</span> <span class="na">class=</span><span class="s">"btn btn-primary"</span> <span class="na">type=</span><span class="s">"button"</span><span class="nt">&gt;</span>
  Messages <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"badge"</span><span class="nt">&gt;</span>4<span class="nt">&lt;/span&gt;</span>
<span class="nt">&lt;/button&gt;</span>
</code></pre></div>

  <h4>Self collapsing</h4>
  <p>如果没有新的或未读的信息条目，也就是说不包含任何内容，徽章组件能够自动隐藏（通过CSS的 <code>:empty</code> 选择符实现) 。</p>

  <div class="bs-callout bs-callout-danger">
    <h4>跨浏览器兼容性</h4>
    <p>徽章组件在 Internet Explorer 8 浏览器中不会自动消失，因为 IE8 不支持 <code>:empty</code> 选择符。</p>
  </div>

  <h4>Adapts to active nav states</h4>
  <p>Built-in styles are included for placing badges in active states in pill navigations.</p>
  <div class="bs-example">
    <ul class="nav nav-pills" role="tablist">
      <li role="presentation" class="active"><a href="#">Home <span class="badge">42</span></a></li>
      <li role="presentation"><a href="#">Profile</a></li>
      <li role="presentation">
  <a href="#">Messages <span class="badge">3</span></a></li>
    </ul>
  </div>
<div class="zero-clipboard"><span class="btn-clipboard">Copy</span></div><div class="highlight"><pre><code class="html"><span class="nt">&lt;ul</span> <span class="na">class=</span><span class="s">"nav nav-pills"</span> <span class="na">role=</span><span class="s">"tablist"</span><span class="nt">&gt;</span>
  <span class="nt">&lt;li</span> <span class="na">role=</span><span class="s">"presentation"</span> <span class="na">class=</span><span class="s">"active"</span><span class="nt">&gt;&lt;a</span> <span class="na">href=</span><span class="s">"#"</span><span class="nt">&gt;</span>Home <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"badge"</span><span class="nt">&gt;</span>42<span class="nt">&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;</span>
  <span class="nt">&lt;li</span> <span class="na">role=</span><span class="s">"presentation"</span><span class="nt">&gt;&lt;a</span> <span class="na">href=</span><span class="s">"#"</span><span class="nt">&gt;</span>Profile<span class="nt">&lt;/a&gt;&lt;/li&gt;</span>
  <span class="nt">&lt;li</span> <span class="na">role=</span><span class="s">"presentation"</span><span class="nt">&gt;&lt;a</span> <span class="na">href=</span><span class="s">"#"</span><span class="nt">&gt;</span>Messages <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"badge"</span><span class="nt">&gt;</span>3<span class="nt">&lt;/span&gt;&lt;/a&gt;&lt;/li&gt;</span>
<span class="nt">&lt;/ul&gt;</span>
</code></pre></div>
</div>
  </div>
