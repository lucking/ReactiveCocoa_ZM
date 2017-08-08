define(function(require){
	var v = require("$UI/system/lib/base/message");
	/**
	 * JUSTEP234000 hcr (从0000开始到0999)
	 */
	v.JUSTEP230000='{"code":"JUSTEP230000", "message":"流程组件配置出错, old-version=\\\"true\\\"时,不支持data-type=\\\"xml\\\""}';
	v.JUSTEP230001='{"code":"JUSTEP230001", "message":"流程组件配置出错, data属性\\\"{0}\\\"所指向的元素必须是data组件"}';
	v.JUSTEP230002='{"code":"JUSTEP230002", "message":"流程组件配置出错, {0}=\\\"true\\\"时, 必须设置data属性"}';
	v.JUSTEP230003='{"code":"JUSTEP230003", "message":"流转"}';
	v.JUSTEP230004='{"code":"JUSTEP230004", "message":"流转成功"}';
	v.JUSTEP230005='{"code":"JUSTEP230005", "message":"转发"}';
	v.JUSTEP230006='{"code":"JUSTEP230006", "message":"转发成功"}';
	v.JUSTEP230007='{"code":"JUSTEP230007", "message":"特送"}';
	v.JUSTEP230008='{"code":"JUSTEP230008", "message":"特送成功"}';
	v.JUSTEP230009='{"code":"JUSTEP230009", "message":"回退"}';
	v.JUSTEP230010='{"code":"JUSTEP230010", "message":"回退成功"}';
	v.JUSTEP230011='{"code":"JUSTEP230011", "message":"暂停"}';
	v.JUSTEP230012='{"code":"JUSTEP230012", "message":"暂停成功"}';
	v.JUSTEP230013='{"code":"JUSTEP230013", "message":"终止"}';
	v.JUSTEP230014='{"code":"JUSTEP230014", "message":"终止成功"}';
	v.JUSTEP230015='{"code":"JUSTEP230015", "message":"流程记录"}';
	v.JUSTEP230016='{"code":"JUSTEP230016", "message":"流程定制"}';
	v.JUSTEP230017='{"code":"JUSTEP230017", "message":"流程图"}';
	v.JUSTEP230018='{"code":"JUSTEP230018", "message":"不是自己的任务或已经处理完的任务，不允许修改执行者"}';
	v.JUSTEP230019='{"code":"JUSTEP230019", "message":"修改执行者成功"}';
	v.JUSTEP230020='{"code":"JUSTEP230020", "message":"执行者选择结果不能为空"}';
	v.JUSTEP230021='{"code":"JUSTEP230021", "message":"没有指定需要回收的任务"}';
	v.JUSTEP230022='{"code":"JUSTEP230022", "message":"确实要回收当前选中的任务吗"}';
	v.JUSTEP230023='{"code":"JUSTEP230023", "message":"任务回收成功"}';
	v.JUSTEP230024='{"code":"JUSTEP230024", "message":"启动流程出错, 参数sData1不允许为空"}';
	v.JUSTEP230025='{"code":"JUSTEP230025", "message":"流程启动中的启动事务失败"}';
	v.JUSTEP230026='{"code":"JUSTEP230026", "message":"通过流程模板启动流程时, 流程模板标识不允许为空"}';
	v.JUSTEP230027='{"code":"JUSTEP230027", "message":"启动流程"}';
	v.JUSTEP230028='{"code":"JUSTEP230028", "message":"流转查询"}';
	v.JUSTEP230029='{"code":"JUSTEP230029", "message":"回退查询"}';
	v.JUSTEP230030='{"code":"JUSTEP230030", "message":"终止查询"}';
	v.JUSTEP230031='{"code":"JUSTEP230031", "message":"暂停查询"}';
	v.JUSTEP230032='{"code":"JUSTEP230032", "message":"转发查询"}';
	v.JUSTEP230033='{"code":"JUSTEP230033", "message":"执行{0}出错, 任务标识不允许为空"}';
	v.JUSTEP230034='{"code":"JUSTEP230034", "message":"执行{0}出错, 启动事务失败"}';
	v.JUSTEP230035='{"code":"JUSTEP230035", "message":"流转确认"}';
	v.JUSTEP230036='{"code":"JUSTEP230036", "message":"回退确认"}';
	v.JUSTEP230037='{"code":"JUSTEP230037", "message":"终止确认"}';
	v.JUSTEP230038='{"code":"JUSTEP230038", "message":"暂停确认"}';
	v.JUSTEP230039='{"code":"JUSTEP230039", "message":"转发确认"}';
	v.JUSTEP230040='{"code":"JUSTEP230040", "message":"特送确认"}';
	v.JUSTEP230041='{"code":"JUSTEP230041", "message":"{0}没有相应的确认对话框"}';
	v.JUSTEP230042='{"code":"JUSTEP230042", "message":"{0}没有定义相应的回调函数"}';
	v.JUSTEP230043='{"code":"JUSTEP230043", "message":"流程组件没有定义函数\\\"_{0}Impl\\\""}';
	v.JUSTEP230044='{"code":"JUSTEP230044", "message":"定制流程"}';
	v.JUSTEP230045='{"code":"JUSTEP230045", "message":"没有权限定制流程"}';
	v.JUSTEP230046='{"code":"JUSTEP230046", "message":"流程记录"}';
	v.JUSTEP230047='{"code":"JUSTEP230047", "message":"当前的ProcessControl的数据格式是JSON格式，不支持返回XML"}';
	v.JUSTEP230048='{"code":"JUSTEP230048", "message":"当前的ProcessControl的数据格式是XML格式，不支持返回JSON"}';
	v.JUSTEP230049='{"code":"JUSTEP230049", "message":"当前的ProcessControl的数据格式是JSON格式，不支持函数{0}"}';
	v.JUSTEP230050='{"code":"JUSTEP230050", "message":"标题"}';
	v.JUSTEP230051='{"code":"JUSTEP230051", "message":"状态"}';
	v.JUSTEP230052='{"code":"JUSTEP230052", "message":"执行者"}';
	v.JUSTEP230053='{"code":"JUSTEP230053", "message":"开始时间"}';
	v.JUSTEP230054='{"code":"JUSTEP230054", "message":"结束时间"}';
	v.JUSTEP230055='{"code":"JUSTEP230055", "message":"选择执行者"}';
	v.JUSTEP230056='{"code":"JUSTEP230056", "message":"选择模板"}';
	v.JUSTEP230057='{"code":"JUSTEP230057", "message":"查询流程模板失败, 参数准备出错"}';
	v.JUSTEP230058='{"code":"JUSTEP230058", "message":"必须有输入参数task"}';
	v.JUSTEP230059='{"code":"JUSTEP230059", "message":"获取显示名称失败, 当前显示列为\\\"{0}\\\""}';
	v.JUSTEP230060='{"code":"JUSTEP230060", "message":"读取功能菜单失败"}';
	
	v.JUSTEP230061='{"code":"JUSTEP230061", "message":"添加节点时，父节点不允许为空"}';
	v.JUSTEP230062='{"code":"JUSTEP230062", "message":"组件\\\"{0}\\\"必须设置ref属性"}';
	v.JUSTEP230063='{"code":"JUSTEP230063", "message":"元素xid=\\\"{0}\\\"绑定组件\\\"{1}\\\"时，必须设置ref属性"}';
	v.JUSTEP230064='{"code":"JUSTEP230064", "message":"组件事件{0}绑定的方法{1}没有定义"}';
	v.JUSTEP230065='{"code":"JUSTEP230065", "message":"组件事件{0}格式非法"}';
	v.JUSTEP230066='{"code":"JUSTEP230066", "message":"组件\\\"{0}\\\"未定义"}';
	v.JUSTEP230067='{"code":"JUSTEP230067", "message":"表达式{0}格式非法, 数字{1}格式不对"}';
	v.JUSTEP230068='{"code":"JUSTEP230068", "message":"表达式{0}格式非法, 字符串{1}格式不对"}';
	v.JUSTEP230069='{"code":"JUSTEP230069", "message":"表达式{0}格式非法, 不支持符号{1}, 序号{2}"}';
	
	v.JUSTEP230070='{"code":"JUSTEP230070", "message":"表达式{0}格式非法, 只支持js表达式"}';
	v.JUSTEP230071='{"code":"JUSTEP230071", "message":"表达式执行出错, 表达式的类型必须是Express"}';
	v.JUSTEP230072='{"code":"JUSTEP230072", "message":"表达式{0}执行出错, 原因：{1}"}';
	v.JUSTEP230073='{"code":"JUSTEP230073", "message":"组件{0}不支持js动态创建"}';
	v.JUSTEP230074='{"code":"JUSTEP230074", "message":"组件事件{0}解除绑定方法{1}没有定义"}';
	v.JUSTEP230075='{"code":"JUSTEP230075", "message":"操作{1}不存"}';
	v.JUSTEP230076='{"code":"JUSTEP230076", "message":"组件事件{0}执行不存在的操作{1}"}';
	v.JUSTEP230077='{"code":"JUSTEP230077", "message":"序号{0}对应的Tab页签不存在"}';
	v.JUSTEP230078='{"code":"JUSTEP230078", "message":"xid={0}对应的Tab页签不存在"}';
	v.JUSTEP230079='{"code":"JUSTEP230079", "message":"xid={0}关联的Tab内容节点不存在"}';
	v.JUSTEP230080='{"code":"JUSTEP230080", "message":"回收任务出错"}';
	v.JUSTEP230081='{"code":"JUSTEP230081", "message":"组件{0}不存在"}';
	v.JUSTEP230082='{"code":"JUSTEP230082", "message":"组件{0}, {1}未初始化完成"}';
	v.JUSTEP230083='{"code":"JUSTEP230083", "message":"不支持图形方式定制流程片段"}';
	v.JUSTEP230084='{"code":"JUSTEP230084", "message":"不支持表格方式定制流程片段"}';
	v.JUSTEP230085='{"code":"JUSTEP230085", "message":"请选择环节"}';
	v.JUSTEP230086='{"code":"JUSTEP230086", "message":"提示信息"}';
	v.JUSTEP230087='{"code":"JUSTEP230087", "message":"\\\"{0}\\\"必须指定办理人"}';
	v.JUSTEP230088='{"code":"JUSTEP230088", "message":"回收任务"}';
	v.JUSTEP230089='{"code":"JUSTEP230089", "message":"修改执行者"}';
	v.JUSTEP230090='{"code":"JUSTEP230090", "message":"显示轨迹图说明"}';
	
	v.JUSTEP230091='{"code":"JUSTEP230091", "message":"错误消息："}';
	v.JUSTEP230092='{"code":"JUSTEP230092", "message":"错误编码："}';
	v.JUSTEP230093='{"code":"JUSTEP230093", "message":"错误原因："}';
	v.JUSTEP230094='{"code":"JUSTEP230094", "message":"显示详细"}';
	v.JUSTEP230095='{"code":"JUSTEP230095", "message":"隐藏详细"}';
	v.JUSTEP230096='{"code":"JUSTEP230096", "message":"关闭"}';
	v.JUSTEP230097='{"code":"JUSTEP230097", "message":"当前不允许修改关注"}';
	v.JUSTEP230098='{"code":"JUSTEP230098", "message":"Focus组件{0}必须设置data属性"}';
	v.JUSTEP230099='{"code":"JUSTEP230099", "message":"Focus组件{0}必须设置bind-nameRef属性"}';
	v.JUSTEP230100='{"code":"JUSTEP230100", "message":"RelativeOrg组件{0}必须设置bind-nameRef属性"}';
	v.JUSTEP230101='{"code":"JUSTEP230101", "message":"提示"}';
	v.JUSTEP230102='{"code":"JUSTEP230102", "message":"路径{0}找不到匹配的window文件"}';
	v.JUSTEP230103='{"code":"JUSTEP230103", "message":"加载{0}出错"}';
	
	/**
	 * JUSTEP231000 lzg (从1000开始到1999)
	 * 
	 */
	v.JUSTEP231000='{"code":"JUSTEP231000", "message":"是否确定删除数据？"}';
	v.JUSTEP231001='{"code":"JUSTEP231001", "message":"数据已经修改，刷新将丢失修改数据，是否确定刷新数据？"}';
	v.JUSTEP231002='{"code":"JUSTEP231002", "message":"data[{0}]不存在！"}';
	v.JUSTEP231003='{"code":"JUSTEP231003", "message":"保存"}';
	v.JUSTEP231004='{"code":"JUSTEP231004", "message":"保存成功"}';
	v.JUSTEP231005='{"code":"JUSTEP231005", "message":"删除"}';
	v.JUSTEP231006='{"code":"JUSTEP231006", "message":"新增"}';
	v.JUSTEP231007='{"code":"JUSTEP231007", "message":"刷新"}';
	v.JUSTEP231008='{"code":"JUSTEP231008", "message":"新建子"}';
	v.JUSTEP231009='{"code":"JUSTEP231009", "message":"新建兄弟"}';
	v.JUSTEP231010='{"code":"JUSTEP231010", "message":"上一条"}';
	v.JUSTEP231011='{"code":"JUSTEP231011", "message":"下一条"}';
	v.JUSTEP231012='{"code":"JUSTEP231012", "message":"下页"}';
	v.JUSTEP231013='{"code":"JUSTEP231013", "message":"全部"}';
	v.JUSTEP231014='{"code":"JUSTEP231014", "message":"下页"}';
	v.JUSTEP231015='{"code":"JUSTEP231015", "message":"上页"}';
	v.JUSTEP231016='{"code":"JUSTEP231016", "message":"data[{0}]的instance是不支持的类型！"}';
	v.JUSTEP231017='{"code":"JUSTEP231017", "message":"data[{0}]的instance不存在！"}';
	v.JUSTEP231018='{"code":"JUSTEP231018", "message":"data[{0}]new操作失败，没有返回数据的ID！"}';
	v.JUSTEP231019='{"code":"JUSTEP231019", "message":"data保存，启动事务失败！"}';
	v.JUSTEP231020='{"code":"JUSTEP231020", "message":"data保存失败!!,{0}"}';
	v.JUSTEP231021='{"code":"JUSTEP231021", "message":"data[{0}]不能新增数据，Creator Action不存在！"}';
	v.JUSTEP231022='{"code":"JUSTEP231022", "message":"新增数据失败！"}';
	v.JUSTEP231023='{"code":"JUSTEP231023", "message":"删除数据失败！"}';
	v.JUSTEP231024='{"code":"JUSTEP231024", "message":"data[{0}]不能保存数据，Writer Action不存在！"}';
	v.JUSTEP231025='{"code":"JUSTEP231025", "message":"保存数据失败！"}';
	v.JUSTEP231026='{"code":"JUSTEP231026", "message":"data[{0}]没有定义树加载的parent relation！"}';
	v.JUSTEP231027='{"code":"JUSTEP231027", "message":"data[{0}]没有定义树加载的parent relation[{1}]！"}';
	v.JUSTEP231028='{"code":"JUSTEP231028", "message":"data[{0}]不能刷新数据，Reader Action不存在！"}';
	v.JUSTEP231029='{"code":"JUSTEP231029", "message":"刷新数据失败！"}';
	v.JUSTEP231030='{"code":"JUSTEP231030", "message":"data[{0}]不支持setColumns操作！"}';
	v.JUSTEP231031='{"code":"JUSTEP231031", "message":"动作权限组件中未定义的Action: {0}"}';
	v.JUSTEP231032='{"code":"JUSTEP231032", "message":"无效的Control ID: {0}"}';
	v.JUSTEP231033='{"code":"JUSTEP231033", "message":"操作失败！{0}"}';
	v.JUSTEP231034='{"code":"JUSTEP231034", "message":"查询"}';
	v.JUSTEP231035='{"code":"JUSTEP231035", "message":"自定义"}';
	v.JUSTEP231036='{"code":"JUSTEP231036", "message":"所有数据"}';
	v.JUSTEP231037='{"code":"JUSTEP231037", "message":"管理查询方案..."}';
	v.JUSTEP231038='{"code":"JUSTEP231038", "message":"修改"}';
	v.JUSTEP231039='{"code":"JUSTEP231039", "message":"清除"}';
	v.JUSTEP231040='{"code":"JUSTEP231040", "message":"清除后将不能还原，确定清除？"}';
	v.JUSTEP231041='{"code":"JUSTEP231041", "message":"对不起，只能上传以下格式的文件:{0}\n请重新选择符合条件的文件" + "再上传。"}';
	v.JUSTEP231042='{"code":"JUSTEP231042", "message":"编号生成失败"}';
	v.JUSTEP231043='{"code":"JUSTEP231043", "message":"无效的values"}';
	v.JUSTEP231044='{"code":"JUSTEP231044", "message":"无效的column"}';
	v.JUSTEP231045='{"code":"JUSTEP231045", "message":"日期不能为空"}';
	v.JUSTEP231046='{"code":"JUSTEP231046", "message":"开始日期不能大于结束日期"}';
	v.JUSTEP231047='{"code":"JUSTEP231047", "message":"justep.Dialog的{0}({1})不合法！"}';
	v.JUSTEP231048='{"code":"JUSTEP231048", "message":"导出参数设置"}';
	v.JUSTEP231049='{"code":"JUSTEP231049", "message":"excel导出只支持justep.XBizData！"}';
	v.JUSTEP231050='{"code":"JUSTEP231050", "message":"导出excel失败！"}';
	v.JUSTEP231051='{"code":"JUSTEP231051", "message":"请选择导入的excel文件"}';
	v.JUSTEP231052='{"code":"JUSTEP231052", "message":"缺少mapping-src或者data的定义信息"}';
	v.JUSTEP231053='{"code":"JUSTEP231053", "message":"关联data不存在！"}';
	v.JUSTEP231054='{"code":"JUSTEP231054", "message":"excel导入只支持justep.XBizData！"}';
	v.JUSTEP231055='{"code":"JUSTEP231055", "message":"excel导入上载文件操作失败！没有返回有效数据"}';
	v.JUSTEP231056='{"code":"JUSTEP231056", "message":"没有返回有效数据"}';
	v.JUSTEP231057='{"code":"JUSTEP231057", "message":"导入excel失败！"}';
	v.JUSTEP231058='{"code":"JUSTEP231058", "message":"excel导入上载文件操作失败！"}';
	v.JUSTEP231059='{"code":"JUSTEP231059", "message":"不能同时定义rootFiler和manageCodes！"}';
	v.JUSTEP231060='{"code":"JUSTEP231060", "message":"组织机构"}';
	v.JUSTEP231061='{"code":"JUSTEP231061", "message":"页"}';
	v.JUSTEP231062='{"code":"JUSTEP231062", "message":"请输入“1～{0}”之间的整数！"}';
	v.JUSTEP231063='{"code":"JUSTEP231063", "message":"当前数据已经修改，加载数据将导致修改数据丢失，确定加载？"}';
	v.JUSTEP231064='{"code":"JUSTEP231064", "message":"第一页"}';
	v.JUSTEP231065='{"code":"JUSTEP231065", "message":"最后页"}';
	v.JUSTEP231066='{"code":"JUSTEP231066", "message":"页签[{0}]不可见"}';
	v.JUSTEP231067='{"code":"JUSTEP231067", "message":"{0}返回必须给出数据"}';
	v.JUSTEP231068='{"code":"JUSTEP231068", "message":"返回值获取失败，当前rowid为:{0}，返回列为:{1}"}';
	v.JUSTEP231069='{"code":"JUSTEP231069", "message":"流程轨迹"}';
	v.JUSTEP231070='{"code":"JUSTEP231070", "message":"波特图"}';
	v.JUSTEP231071='{"code":"JUSTEP231071", "message":"轨迹图"}';
	v.JUSTEP231072='{"code":"JUSTEP231072", "message":"没有指定target-id[{0}]"}';
	v.JUSTEP231073='{"code":"JUSTEP231073", "message":"FormPrint打印时iframe文档为空"}';
	v.JUSTEP231074='{"code":"JUSTEP231074", "message":"全部,今天,昨天,本周,上周,本月,上月,今年,去年,自定义..."}';
	v.JUSTEP231075='{"code":"JUSTEP231075", "message":"日期不能为空"}';
	v.JUSTEP231076='{"code":"JUSTEP231076", "message":"开始日期不能大于结束日期"}';
	v.JUSTEP231077='{"code":"JUSTEP231077", "message":"本人"}';
	v.JUSTEP231078='{"code":"JUSTEP231078", "message":"data[xid={0}]初始化失败，{1}"}';
	v.JUSTEP231079='{"code":"JUSTEP231079", "message":"确定"}';
	v.JUSTEP231080='{"code":"JUSTEP231080", "message":"取消"}';
	v.JUSTEP231081='{"code":"JUSTEP231081", "message":"是"}';
	v.JUSTEP231082='{"code":"JUSTEP231082", "message":"否"}';
	v.JUSTEP231083='{"code":"JUSTEP231083", "message":"删除的行"}';
	v.JUSTEP231084='{"code":"JUSTEP231084", "message":"新增默认值"}';
	v.JUSTEP231085='{"code":"JUSTEP231085", "message":"根"}';
	v.JUSTEP231086='{"code":"JUSTEP231086", "message":"第一条"}';
	v.JUSTEP231087='{"code":"JUSTEP231087", "message":"最后条"}';
	v.JUSTEP231088='{"code":"JUSTEP231088", "message":"组织机构"}';
	v.JUSTEP231089='{"code":"JUSTEP231089", "message":"选择组织机构"}';
	v.JUSTEP231090='{"code":"JUSTEP231090", "message":"计算结果非Date类型"}';
	v.JUSTEP231091='{"code":"JUSTEP231091", "message":"更新BLOB出错，没有关联的记录或者没有指定概念"}';
	v.JUSTEP231092='{"code":"JUSTEP231092", "message":"BLOB更新数据出错，上传数据超出限制{0}"}';
	v.JUSTEP231093='{"code":"JUSTEP231093", "message":"BLOB更新数据出错，不支持的尺寸{0}"}';
	v.JUSTEP231094='{"code":"JUSTEP231094", "message":"选择的文件类型不支持，支持的类型:{0}"}';
	v.JUSTEP231095='{"code":"JUSTEP231095", "message":"Grid({0})对应的Data不是树形数据"}';
	v.JUSTEP231096='{"code":"JUSTEP231096", "message":"新增索引"}';
	v.JUSTEP231097='{"code":"JUSTEP231097", "message":"加载页"}';
	
	//input时间选择1500---1599
	v.JUSTEP231500='{"code":"JUSTEP231500", "message":"确定"}';
	v.JUSTEP231501='{"code":"JUSTEP231501", "message":"取消"}';
	v.JUSTEP231502='{"code":"JUSTEP231502", "message":"月"}';
	v.JUSTEP231503='{"code":"JUSTEP231503", "message":"日"}';
	v.JUSTEP231504='{"code":"JUSTEP231504", "message":"年"}';
	v.JUSTEP231505='{"code":"JUSTEP231505", "message":"时"}';
	v.JUSTEP231506='{"code":"JUSTEP231506", "message":"分"}';
	v.JUSTEP231507='{"code":"JUSTEP231507", "message":"秒"}';
	v.JUSTEP231508='{"code":"JUSTEP231508", "message":"清除"}';
	v.JUSTEP231509='{"code":"JUSTEP231509", "message":"日"}';
	v.JUSTEP231510='{"code":"JUSTEP231510", "message":"一"}';
	v.JUSTEP231511='{"code":"JUSTEP231511", "message":"二"}';
	v.JUSTEP231512='{"code":"JUSTEP231512", "message":"三"}';
	v.JUSTEP231513='{"code":"JUSTEP231513", "message":"四"}';
	v.JUSTEP231514='{"code":"JUSTEP231514", "message":"五"}';
	v.JUSTEP231515='{"code":"JUSTEP231515", "message":"六"}';
	
	//规则1600---1899
	v.JUSTEP231600='{"code":"JUSTEP231600", "message":"{0}不满足表达式：{1}"}';
	v.JUSTEP231601='{"code":"JUSTEP231601", "message":"{0}必须有值"}';
	v.JUSTEP231602='{"code":"JUSTEP231602", "message":"{0}必须符合{1}"}';
	v.JUSTEP231603='{"code":"JUSTEP231603", "message":"{0}请填写有效的E-mail地址"}';
	v.JUSTEP231604='{"code":"JUSTEP231604", "message":"{0}请填写有效的日期时间"}';
	v.JUSTEP231605='{"code":"JUSTEP231605", "message":"{0}请填写有效的日期"}';
	v.JUSTEP231606='{"code":"JUSTEP231606", "message":"{0}请填写有效的时间"}';
	v.JUSTEP231607='{"code":"JUSTEP231607", "message":"{0}请填写有效数字"}';
	v.JUSTEP231608='{"code":"JUSTEP231608", "message":"{0}请填写有效整数"}';
	
	/**
	 * JUSTEP232000 slm (从2000开始到2999)
	 * JUSTEP232000 - 232499 提示信息 异常
	 * JUSTEP232500 - 232999 字符资源化
	 * 
	 */
	v.JUSTEP232002='{"code":"JUSTEP232002", "message":"当前环境不支持OfficeViewer"}';
	v.JUSTEP232003='{"code":"JUSTEP232003", "message":"Assert:{0}"}';
	v.JUSTEP232004='{"code":"JUSTEP232004", "message":"您没有相应操作的权限"}';
	v.JUSTEP232005='{"code":"JUSTEP232005", "message":"justep.Doc2.getDocServerByDocPath Error : 文档信息全路径不正确"}';
	v.JUSTEP232006='{"code":"JUSTEP232006", "message":"上传的附件不允许大于 {0}"}';
	v.JUSTEP232007='{"code":"JUSTEP232007", "message":"justep.Doc2.getUploader.uploader.fileSelect：获取文档服务器host失败！"}';
	v.JUSTEP232008='{"code":"JUSTEP232008", "message":"justep.Doc2.getUploader.uploader.fileSelect：上传文件超时！"}';
	v.JUSTEP232009='{"code":"JUSTEP232009", "message":"文档服务器上传文件失败，错误信息:{0}"}';
	v.JUSTEP232010='{"code":"JUSTEP232010", "message":"非法的文件格式!"}';
	v.JUSTEP232011='{"code":"JUSTEP232011", "message":"文档不能浏览，数据未提交！"}';
	v.JUSTEP232012='{"code":"JUSTEP232012", "message":"浏览器不支持在线浏览此格式的文件"}';
	v.JUSTEP232013='{"code":"JUSTEP232013", "message":"getAccessRecord Error :查询操作记录失败！"}';
	v.JUSTEP232014='{"code":"JUSTEP232014", "message":"openNeoOfficeDialog"}';
	v.JUSTEP232015='{"code":"JUSTEP232015", "message":"当前环境不支持此功能"}';
	v.JUSTEP232016='{"code":"JUSTEP232016", "message":"文档保存失败:{0}"}';
	v.JUSTEP232017='{"code":"JUSTEP232017", "message":"office控件上传当前打开的office文件出错！，服务器端收到文件大小为0"}';
	v.JUSTEP232018='{"code":"JUSTEP232018", "message":"justep.Doc2.getdocServerAction失败,请确认文档服务配置是否正确！"}';
	v.JUSTEP232019='{"code":"JUSTEP232019", "message":"justep.Doc2.getdocServerAction失败,请确认文档服务配置是否正确！！"}';
	v.JUSTEP232020='{"code":"JUSTEP232020", "message":"justep.Doc2.getAuthList失败！"}';
	v.JUSTEP232021='{"code":"JUSTEP232021", "message":"justep.Doc2.queryNameSpaces失败！"}';
	v.JUSTEP232022='{"code":"JUSTEP232022", "message":"justep.Doc2.queryDefine失败！"}';
	v.JUSTEP232023='{"code":"JUSTEP232023", "message":"justep.Doc2.queryLinkedDir失败！"}';
	v.JUSTEP232024='{"code":"JUSTEP232024", "message":"justep.Doc2.queryLinkedDoc失败！"}';
	v.JUSTEP232025='{"code":"JUSTEP232025", "message":"justep.Doc2.queryDoc失败！"}';
	v.JUSTEP232026='{"code":"JUSTEP232026", "message":"上传失败!|{0}"}';
	v.JUSTEP232027='{"code":"JUSTEP232027", "message":"justep.Doc2.addAccessRecord失败！"}';
	v.JUSTEP232028='{"code":"JUSTEP232028", "message":"justep.Doc2.createVersion失败！"}';
	v.JUSTEP232029='{"code":"JUSTEP232029", "message":"justep.Doc2.deleteVersion失败！"}';
	v.JUSTEP232030='{"code":"JUSTEP232030", "message":"justep.Doc2.createVersionFromJsonStr失败！"}';
	v.JUSTEP232031='{"code":"JUSTEP232031", "message":"justep.Doc2.lockDoc失败！"}';
	v.JUSTEP232032='{"code":"JUSTEP232032", "message":"justep.Doc2.unLockDoc失败！"}';
	v.JUSTEP232033='{"code":"JUSTEP232033", "message":"justep.Doc2.browseFileComment失败,查询修订内容失败！"}';
	v.JUSTEP232034='{"code":"JUSTEP232034", "message":"文档服务器不存在名称为{0}的office文件！"}';
	v.JUSTEP232035='{"code":"JUSTEP232035", "message":"justep.Doc2.queryDocCache失败！"}';
	v.JUSTEP232036='{"code":"JUSTEP232036", "message":"justep.Doc2.queryDocInfoById失败！"}';
	v.JUSTEP232037='{"code":"JUSTEP232037", "message":"此文件不存在，可能文档服务配置存在问题，请联系系统管理员！"}';
	v.JUSTEP232038='{"code":"JUSTEP232038", "message":"justep.Doc2.syncCustomFileds失败！"}';
	v.JUSTEP232039='{"code":"JUSTEP232039", "message":"commitError: 数据保存失败！"}';
	v.JUSTEP232040='{"code":"JUSTEP232040", "message":"commitError: commitDocFlag失败！"}';
	v.JUSTEP232041='{"code":"JUSTEP232041", "message":"commitError: 数据提交失败！"}';
	v.JUSTEP232042='{"code":"JUSTEP232042", "message":"saveDocError: 数据保存失败！"}';
	v.JUSTEP232043='{"code":"JUSTEP232043", "message":"getDocAuthListError: 获取文档权限列表失败！"}';
	v.JUSTEP232054='{"code":"JUSTEP232054", "message":"上传附件后更新附件组件失败"}';
	v.JUSTEP232055='{"code":"JUSTEP232055", "message":"该文件正在被别人编辑,您不能编辑，只能浏览最新版本"}';
	v.JUSTEP232056='{"code":"JUSTEP232056", "message":"不支持非Office文件编辑"}';
	v.JUSTEP232057='{"code":"JUSTEP232057", "message":"请正确设置模板！"}';
	v.JUSTEP232058='{"code":"JUSTEP232058", "message":"不支持非Office文件成文"}';
	v.JUSTEP232059='{"code":"JUSTEP232059", "message":"请新增数据，再上传！"}';
	v.JUSTEP232060='{"code":"JUSTEP232060", "message":"获取docDisplayPath失败"}';
	v.JUSTEP232061='{"code":"JUSTEP232061", "message":"展现和数据不匹配"}';
	v.JUSTEP232092='{"code":"JUSTEP232092", "message":"office文件打开异常 错误编码[{0}]"}';
	v.JUSTEP232093='{"code":"JUSTEP232093", "message":"错误:{0}"}';
	v.JUSTEP232104='{"code":"JUSTEP232104", "message":"justep.Doc.getDocServerByDocPath Error : 文档信息全路径不正确"}';
	v.JUSTEP232105='{"code":"JUSTEP232105", "message":"上传的附件不允许大于 {0}"}';
	v.JUSTEP232106='{"code":"JUSTEP232106", "message":"justep.Doc.getUploader.uploader.fileSelect：获取文档服务器host失败！"}';
	v.JUSTEP232107='{"code":"JUSTEP232107", "message":"justep.Doc.getUploader.uploader.fileSelect：上传文件超时！"}';
	v.JUSTEP232108='{"code":"JUSTEP232108", "message":"文档服务器上传文件失败，错误信息：{0}"}';
	v.JUSTEP232109='{"code":"JUSTEP232109", "message":"juestp.Doc.getdocServerAction失败,请确认文档服务配置是否正确！"}';
	v.JUSTEP232110='{"code":"JUSTEP232110", "message":"juestp.Doc.getdocServerAction失败,请确认文档服务配置是否正确！！"}';
	v.JUSTEP232111='{"code":"JUSTEP232111", "message":"juestp.Doc.getAuthList失败！"}';
	v.JUSTEP232112='{"code":"JUSTEP232112", "message":"juestp.Doc.queryNameSpaces失败！"}';
	v.JUSTEP232113='{"code":"JUSTEP232113", "message":"juestp.Doc.queryDefine失败！"}';
	v.JUSTEP232114='{"code":"JUSTEP232114", "message":"juestp.Doc.queryLinkedDir失败！"}';
	v.JUSTEP232115='{"code":"JUSTEP232115", "message":"juestp.Doc.queryLinkedDoc失败！"}';
	v.JUSTEP232116='{"code":"JUSTEP232116", "message":"juestp.Doc.queryDoc失败！"}';
	v.JUSTEP232117='{"code":"JUSTEP232117", "message":"juestp.Doc.addAccessRecord失败！"}';
	v.JUSTEP232118='{"code":"JUSTEP232118", "message":"juestp.Doc.createVersion失败！"}';
	v.JUSTEP232119='{"code":"JUSTEP232119", "message":"juestp.Doc.deleteVersion失败！"}';
	v.JUSTEP232120='{"code":"JUSTEP232120", "message":"juestp.Doc.createVersionFromJsonStr失败！"}';
	v.JUSTEP232121='{"code":"JUSTEP232121", "message":"juestp.Doc.lockDoc失败！"}';
	v.JUSTEP232122='{"code":"JUSTEP232122", "message":"juestp.Doc.unLockDoc失败！"}';
	v.JUSTEP232123='{"code":"JUSTEP232123", "message":"juestp.Doc.browseFileComment失败,查询修订内容失败！"}';
	v.JUSTEP232124='{"code":"JUSTEP232124", "message":"juestp.Doc.queryDocCache失败！"}';
	v.JUSTEP232125='{"code":"JUSTEP232125", "message":"juestp.Doc.queryDocInfoById失败！"}';
	v.JUSTEP232126='{"code":"JUSTEP232126", "message":"juestp.Doc.syncCustomFileds失败！"}';
	v.JUSTEP232147='{"code":"JUSTEP232147", "message":"请正确配置display-style属性"}';
	v.JUSTEP232148='{"code":"JUSTEP232148", "message":"获取文档服务器host失败！"}';
	v.JUSTEP232169='{"code":"JUSTEP232169", "message":"移动环境暂不支持打印"}';
	v.JUSTEP232170='{"code":"JUSTEP232170", "message":"非IE环境暂不支持打印"}';
	v.JUSTEP232171='{"code":"JUSTEP232171", "message":"移动环境暂不支持导出为word"}';
	v.JUSTEP232172='{"code":"JUSTEP232172", "message":"图表组件的xid属性不能为空"}';
	v.JUSTEP232173='{"code":"JUSTEP232173", "message":"没有发现报表组件引用的data对象:{0}"}';
	v.JUSTEP232184='{"code":"JUSTEP232184", "message":"报表组件的id属性不能为空"}';
	v.JUSTEP232185='{"code":"JUSTEP232185", "message":"没有发现报表组件:{0}"}';
	v.JUSTEP232186='{"code":"JUSTEP232186", "message":"获取图表定义失败"}';
	v.JUSTEP232187='{"code":"JUSTEP232187", "message":"获取报表定义失败"}';
	v.JUSTEP232188='{"code":"JUSTEP232188", "message":"不支持new操作创建Chart组件"}';
	
	
	v.JUSTEP232500='{"code":"JUSTEP232500", "message":"从模版新建"}';
	v.JUSTEP232501='{"code":"JUSTEP232501", "message":"上传文件"}';
	v.JUSTEP232502='{"code":"JUSTEP232502", "message":"下载"}';
	v.JUSTEP232503='{"code":"JUSTEP232503", "message":"删除"}';
	v.JUSTEP232504='{"code":"JUSTEP232504", "message":"编辑"}';
	v.JUSTEP232505='{"code":"JUSTEP232505", "message":"历史"}';
	v.JUSTEP232506='{"code":"JUSTEP232506", "message":"确实要删除 [{0}]吗？"}';
	
	
	v.JUSTEP232507='{"code":"JUSTEP232507", "message":"图片浏览"}';
	v.JUSTEP232508='{"code":"JUSTEP232508", "message":"修改"}';
	v.JUSTEP232509='{"code":"JUSTEP232509", "message":"清除"}';
	v.JUSTEP232510='{"code":"JUSTEP232510", "message":"确定清除上传的图片吗？"}';
	
	v.JUSTEP232511='{"code":"JUSTEP232511", "message":"页面设置"}';
	v.JUSTEP232512='{"code":"JUSTEP232512", "message":"打印"}';
	v.JUSTEP232513='{"code":"JUSTEP232513", "message":"预览"}';
	v.JUSTEP232514='{"code":"JUSTEP232514", "message":"导出pdf"}';
	v.JUSTEP232515='{"code":"JUSTEP232515", "message":"导出word"}';
	v.JUSTEP232516='{"code":"JUSTEP232516", "message":"导出excel"}';
	v.JUSTEP232517='{"code":"JUSTEP232517", "message":"图表载入中......"}';
	v.JUSTEP232518='{"code":"JUSTEP232518", "message":"打印预览"}';
	v.JUSTEP232519='{"code":"JUSTEP232519", "message":"图表导出"}';
	v.JUSTEP232520='{"code":"JUSTEP232520", "message":"报表载入中......"}';
	v.JUSTEP232521='{"code":"JUSTEP232521", "message":"报表导出"}';
	
	/**
	 * JUSTEP233000 MaD (从3000开始到3999)
	 */
	v.JUSTEP233000='{"code":"JUSTEP233000", "message":"{0}保存失败"}';
	v.JUSTEP233001='{"code":"JUSTEP233001", "message":"获取人员成员信息失败"}';
	v.JUSTEP233002='{"code":"JUSTEP233002", "message":"恢复门户设置失败"}';

	//原来base.res.js中的280000 -- 289999
	v.JUSTEP280000='{"code":"JUSTEP280000", "message":"获取系统参数出错, 不支持参数\\\"{0}\\\""}';
	v.JUSTEP280001='{"code":"JUSTEP280001", "message":"xid=\\\"{0}\\\"的组件不存在"}';
	v.JUSTEP280002='{"code":"JUSTEP280002", "message":"组件关联的节点必须有xid属性"}';
	
	v.JUSTEP281001='{"code":"JUSTEP281001", "message":"biz action 请求参数准备失败，actionName参数是必须的"}';
	v.JUSTEP281002='{"code":"JUSTEP281002", "message":"biz action 请求参数准备失败，options参数是必须的"}';
	v.JUSTEP281003='{"code":"JUSTEP281003", "message":"biz action 请求参数准备失败，action参数是必须的"}';
	v.JUSTEP281004='{"code":"JUSTEP281004", "message":"biz action 请求错误，不存在请求参数"}';
	v.JUSTEP281005='{"code":"JUSTEP281005", "message":"请求错误编码："}';
	v.JUSTEP281006='{"code":"JUSTEP281006", "message":"无"}';

	/**
	 * JUSTEP234000 WJ (从4000开始到4999)
	 */
	v.JUSTEP234000='{"code": "JUSTEP234000", "message": "smartFilter组件的filterData不能为空且必须是bizData"}';
	
	v.JUSTEP234010='{"code": "JUSTEP234010", "message": "查询"}';
	v.JUSTEP234011='{"code": "JUSTEP234011", "message": "bizFilter组件的filterData不能为空且必须是bizData"}';
	v.JUSTEP234012='{"code": "JUSTEP234012", "message": "模板查询"}';
});





