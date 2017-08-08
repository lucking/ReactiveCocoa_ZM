package com.justep.ui.system;

import java.util.List;

import com.justep.exception.BaseRuntimeException;

public class SystemComponentException extends BaseRuntimeException{
	private static final long serialVersionUID = 2470407635293275970L;
	private static final Class<?> c = UISystemMessages.class;

	
	public SystemComponentException(String error){
		super(error);
	}	
	

	public SystemComponentException(String error, Throwable t){
		super(error, t);
	}
	
	private SystemComponentException(String code, List<Object> params){
		super(c, code, params);
	}
	
	private SystemComponentException(String code, List<Object> params, Throwable t){
		super(c, code, params, t);
	}
	
	private SystemComponentException(Class<?> c, String code, List<Object> params){
		super(c, code, params);
	}
	
	private SystemComponentException(Class<?> c, String code, List<Object> params, Throwable t){
		super(c, code, params, t);
	}
	
	public static SystemComponentException create(String code, Object...params){
		return new SystemComponentException(code, toList(params));
	}
	
	public static SystemComponentException create(Throwable t, String code, Object...params){
		return new SystemComponentException(code, toList(params), t);
	}

	public static SystemComponentException create(Class<?> c, String code, Object...params){
		return new SystemComponentException(c, code, toList(params));
	}
	
	public static SystemComponentException create(Throwable t, Class<?>c, String code, Object...params){
		return new SystemComponentException(c, code, toList(params), t);
	}
}
